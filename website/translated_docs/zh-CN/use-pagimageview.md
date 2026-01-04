---
id: use-pagimageview
title: UI 及列表场景播放优化
---
---

## 简介

从 PAG 4.2 版本开始增加了针对 UI 场景的专用播放组件 PAGImageView，可以有效绕开 PAGView GPU 实时渲染方案在 UI
场景下劣势。尤其是对 UI 列表或同一页面中同时播放多个 PAG 文件的场景,可以显著降低内存占用同时提升渲染性能。其主要原理是充分利用了磁盘缓存，在渲染当前帧的同时，也将当前帧的渲染数据缓存到本地。单个动效文件在整个生命周期中用户只会看到一次短暂基于
GPU 实时渲染的画面，后续都是直接读取高速的磁盘缓存来呈现，并且即使重启 App 后缓存也仍然有效。从而降低整个渲染过程中因为
GPU 实时渲染而引入的额外基础开销。另外由于 PAGImageView 跟 UI 框架之间并没有 GPU
桥接层，天然的能够高性能混合，也就无需处理任何额外的合并播放逻辑。

## 适用场景

PAGImageView 的实现原理是将每帧渲染的内容通过 LZ4 压缩缓存到本地磁盘，如果 PAGImageView
渲染的尺寸较大且 [<font color=blue> PAG 文件</font>](/docs/terms.html#pag-文件)
时长较长，如手机全屏这种情况，会占用较大的磁盘空间做缓存，可能一个 [<font color=blue> PAG 文件</font>](/docs/terms.html#pag-文件)
缓存下来就要几百 MB，目前磁盘缓存默认占用最大磁盘空间为 1GB，如果这样的情况较多，会不断触发清理缓存逻辑，不但不会提升性能，反而使性能变差。

PAGImageView 适用于 UI 列表 或一个页面中含有多个小尺寸 View
的场景，这种场景下渲染的尺寸较小，一个 [<font color=blue> PAG 文件</font>](/docs/terms.html#pag-文件)
缓存完占用的磁盘空间也就几十 MB，渲染使用的时候会不断命中缓存，从而提升性能。其余场景我们还是推荐使用
PAGView。

另外，对于一些类似 WebP、APNG 等图片序列使用的场景，由于文件尺寸和图片序列的帧数一般不会太大，
图片序列的内容一般全部缓存至内存，渲染的过程中直接读取内存缓存，基本上不占用 CPU。PAGImageView
提供了全内存缓存模式兼顾该场景，此时模式下内存占用较大，CPU 占用较小。

## 具体用法

### 普通 View 中使用

#### Android

MultiplePAGImageViewActivity 的这个例子演示了在 xml 中作为普通 View 的使用场景。

像普通 View 一样在 xml 中声明

```xml

<org.libpag.PAGImageView
        android:id="@+id/pagView1"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="1"/>
```

在代码中给 PAGImageView 设置相应参数

```java
void fireImageView(int id, String path) {
    // 从 xml 查找 View
    PAGImageView view = findViewById(id);
    // 设置 PAG 文件路径，和 PAGView 一样，接受来自 assets 和 sdcard 的两种路径
    view.setPath(path);
    // 设置动画的循环次数，-1 为无限循环
    view.setRepeatCount(-1);
    // 播放动画
    view.play();
}
```

#### iOS

```
PAGImageView* pagImageView = [[PAGImageView alloc] initWithFrame:CGRectMake(x, y, w, h)];
[pagImageView setPath:[[NSBundle mainBundle] pathForResource:pagPath];
[pagImageView setCacheAllFramesInMemory:NO];
[pagImageView setRepeatCount:-1];
[pagImageView play];

```

### ListView 中使用

#### Android

PAGImageViewListActivity 的这个例子演示了在 ListView/GridView 中的使用场景

在 List 的 item 中像普通 view 一样去声明

```xml

<org.libpag.PAGImageView
        android:id="@+id/pagView"
        android:layout_width="wrap_content"
        android:layout_height="match_parent"/>
```

在RecyclerView.Adapter 中初始化并播放 View

```java
@Override
public void onBindViewHolder(ViewHolder viewHolder, final int position) {
    viewHolder.getView().setPath(mDataSet[position]);
    viewHolder.getView().setRepeatCount(-1);
    viewHolder.getView().play();
}
```

#### iOS

```
#define WIDTH  100
@interface PAGCell : UITableViewCell
@property (nonatomic,strong) PAGImageView* pagImageView;
@property (nonatomic,strong) NSString* filePath;
@end

@implementation PAGCell

- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier {
  if (self = [super initWithStyle:style reuseIdentifier:reuseIdentifier]) {
  self.pagImageView = [[PAGImageView alloc] initWithFrame:CGRectMake(20, 0, WIDTH, WIDTH)];
  [self.contentView addSubview:self.pagImageView];
  }
  return self;
 }

- (void)setFilePath:(NSString *)filePath {
  if ([filePath length] > 0) {
  [self.pagImageView setPath:filePath];
  [self.pagImageView setCacheAllFramesInMemory:NO];
  [self.pagImageView setRepeatCount:-1];
  [self.pagImageView play];
  }
 }
@end
```

## 其他配置

### memoryCache

PAGImageView 默认是会开启磁盘缓存的，但是对于内存缓存考虑内存限制，默认是关闭的。

如果需要开启可以调用 API 去打开

```java
// Android
public void setCacheAllFramesInMemory(boolean enable);
// iOS
- (void)setCacheAllFramesInMemory:(BOOL)enable;
```

这个接口会显著的提高内存占用，使用时候要评估好具体场景是否适合。

### renderScale

对于低端机型可能性能有限制，不太需要绘制太高清晰度时，可以去考虑设置 renderScale，这里可以同时降低 CPU
和内存占用。

在渲染或者缓存但是时候，输出尺寸会叠加上这个比率，比如原始尺寸 100 * 100，但是设置了 0.5 的
renderScale，那尺寸就会变成 50 * 50.

```java
// Android
public void setRenderScale(float renderScale);
// iOS
- (void)setRenderScale:(float)scale;
```

### maxDisk

对于缓存到磁盘的文件，当时间久的时候，可能会慢慢增加，我们增加了一个设置 maxDisk 的接口。

```java
// Android
public static void SetMaxDiskSize(long size);

PAGDiskCache.java

// iOS
+ (void)SetMaxDiskSize:(size_t)size;

PAGDiskCache.h
```

### 资源设置

我们有两种设置资源的方式，setPath 和 setComposition。

这里如果不需要修改原始 [<font color=blue> PAG 文件</font>](/docs/terms.html#pag-文件)的时候，
**我们强烈推荐使用 setPath 来送入数据**。

通过 setPath 方式来设置资源的，我们仅仅在第一次第一遍绘制的时候需要 GPU 和 PAG
相关的资源，用完以后马上就会释放。这种情况可以带来比较显著的内存优化。

当通过 setComposition 设置资源的时候，当 PAGComposition 对象不是直接通过 PAFile.load 生成的，或者
PAGComposition 对象有任何修改的时候。 在 PAGImageView detach 的时候，我们会自动清理掉磁盘缓存。
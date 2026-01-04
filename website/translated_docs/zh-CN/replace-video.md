---
id: replace-video
title: 占位图替换视频
---
---

PAG SDK 是一个特效渲染组件，专注于特效渲染，社区版不会处理音视频相关内容。如果需要占位图替换视频的功能，可以使用 PAG 企业版。

包含 Movie 功能的 PAG 企业版（包名带有 movie 后缀）通过视频素材可以构建 PAGMovie。PAGMovie 继承自 PAGImage，可以直接替换 PAGImageLayer 的[<font color=blue>占位图</font>](/docs/terms.html#占位图)。在替换后，PAGView、PAGPlayer 和 PAGAudioPlayer 都会自动更新内部的数据，无需其他操作即可呈现。

PAGMovie 继承了 PAGImage 的完整特性，PAGImage 的详细文档参见：[Android](/docs/apis-android.html) | [iOS](/docs/apis-ios.html)。

```
PAGMovie 支持的封装格式为 mov,mp4,m4a,3gp,3g2,mj2，支持的编码格式为 h264和 h265(hevc)。
```

## 使用流程
### 1、构建 PAGMovie 实例
PAGMovie 支持通过本地视频路径构建，同时支持裁剪和变速以及音量设置。

android:
```java
// 方法 1: 通过文件路径生成 PAGMovie，默认完整区间不变速：starttime = 0 us , duration = 文件 duration us, speed = 1.0f, volume = 1.0f
PAGMovie movie = PAGMovie.MakeFromFile (MOVIE_FILE_PATH);
// 方法 2: 通过文件路径生成 PAGMovie 并设置属性，这里的参数表示选取该视频素材的完整区间，不变速，音量为 0
PAGMovie silentMovie = PAGMovie.MakeFromFile (MOVIE_FILE_PATH, -1, -1, 1, 0);
// 方法 3: 通过文件路径生成 PAGMovie 并设置属性，这里的参数表示选取该视频素材的 1~3 秒，设置为 0.5 倍速，音量为 0.5
PAGMovie cutMovie = PAGMovie.MakeFromFile (MOVIE_FILE_PATH, 1_000_000, 2_000_000, 0.5f, 0.5f);
```

iOS:
```OC
// 方法 1: 通过文件路径生成 PAGMovie，默认 starttime = 0 us , duration = 文件 duration us, speed = 1.0f, volume = 1.0f
PAGMovie *movie = [PAGMovie MakeFromFile:moviePath];
// 方法 2: 通过文件路径生成 PAGMovie 并设置属性，这里的参数表示选取该视频素材的 1~3 秒，设置为 0.5 倍速，音量为 0.5。
// 当 startTime 和 duration 都是 - 1 时，如果 PAGMovie 会自动适配成视频全时长
movie = [PAGMovie MakeFromFile:moviePath startTime:1*1000*1000 duration:2*1000*1000 speed:0.5f volume:0.5f];
```
### 2、替换[<font color=blue>占位图</font>](/docs/terms.html#占位图)
PAGMovie 是 PAGImage 的子类，替换[<font color=blue>占位图</font>](/docs/terms.html#占位图)的方式与 PAGImage 一致。

备注：当视频时长比图片图层所需时长短时，视频会定格在最后一帧。

代码示例

android:
```java
// 方式 1，直接替换图片资源
for (int i = 0; i < selectData.size() && i < pagFile.numImages(); i++) {
    PAGMovie movie = makePAGMovie(selectData.get(i));
    pagFile.replaceImage(i, movie);
}
// 方式 2，通过可编辑图层替换
int[] indices = pagFile.getEditableIndices(PAGLayer.LayerTypeImage);
for (int i = 0; i < selectData.size() && i < indices.length; i++) {
    PAGMovie movie = makePAGMovie(selectData.get(i));
    PAGLayer[] pagLayers = pagFile
            .getLayersByEditableIndex(indices[i], PAGLayer.LayerTypeImage);
    for (PAGLayer layer : pagLayers) {
        ((PAGImageLayer) layer).setImage(movie);
    }
}
```

iOS
```OC
// 方法 1:PAGFile 直接替换
for (int i = 0; i < moviePaths.count && i < pagFile.numImages; i++) {
    PAGMovie *movie = [PAGMovie MakeFromFile:moviePaths[i]];
    [pagFile replaceImage:i data:movie];
}


// 方法 2，通过 PAGImageLayer 替换
NSArray *indices = [pagFile getEditableIndices:PAGLayerTypeImage];
for (NSUInteger i = 0; i < moviePaths.count && i < indices.count; i++) {
  PAGMovie *movie = [PAGMovie MakeFromFile:moviePaths[i]];
  NSArray *imageLayers = [pagFile getLayersByEditableIndex:indices[i] layerType:PAGLayerTypeImage];
  for (PAGImageLayer *layer in imageLayer) {
      [layer setImage:movie];
  }
}
```


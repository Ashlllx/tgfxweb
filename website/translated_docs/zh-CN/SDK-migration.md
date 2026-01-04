---
id: SDK-migration
title: Lottie 迁移至 PAG
---
---

支持转换为 PAG 文件的素材格式：Lottie json 文件、gif、apng、图片序列和视频。

## 素材转换
### 转换工具 PAGConvertor

一个可以把视频、gif、apng、图片序列和 Lottie 的 json 转成 [<font color=blue> PAG 文件</font>](/docs/terms.html#pag-文件)的工具。
该工具仅支持 macOS 平台。

[<font color=blue>PAGConvertor macOS 版本下载</font>](https://pag.qq.com/file/PAGConvertor_mac_1.4.zip)


#### 使用方法：

文件解压后，通过运行 convert.sh 脚本或 PAGConvertor 可执行文件完成素材的转换。

#### convert.sh 脚本使用方法
1. 将所有需要转换的资源放入 input 文件夹内，目前支持视频/gif/apng/Lottie 的 json 文件/图片序列。注：图片序列是以文件夹为单位进行转换的，其余资源不要新建文件夹。

2. 打开终端，cd 到当前文件夹。

3. 执行下面的 shell 脚本，(如果需要转换图片序列则添加参数 ./convert.sh <帧率> etc. ./convert.sh 25)

`./convert.sh `

4. 转换完成后，在 input 文件夹内可以看到转换后的同名.pag

注意事项：如果在执行脚本过程中可能会出现permission denied， 此时在 convert.sh 所在目录下先执行

`chmod +x ./*`


#### PAGConvertor 可执行文件使用方法
1. 打开终端，cd 到资源所在文件夹。

2. 在终端执行

`./PAGConvertor <文件名/文件夹名称> [帧率]`

etc. ./PAGConvertor animation.mov 25

其中帧率为可选项，当希望转换后的帧率与原素材不一致时，可以主动设置帧率。注意：可变帧率的文件格式，最好在使用时设置输出帧率。（注*：Lottie 文件目前不支持帧率修改）

3. 转换完成后，在文件夹内可以看到转换后的同名.pag

注意事项：如果执行过程中系统提示  无法打开“PAGConvertor”，因为无法验证开发者。
请在 "系统偏好设置 - 安全性与隐私" 允许PAGConvertor的运行


## SDK 迁移
#### PAG SDK 的接入参考
- [<font color=blue>移动端接入 SDK</font>](/docs/sdk.html#移动端接入)
- [<font color=blue>Web 端接入 SDK</font>](/docs/sdk.html#web-端接入)
- [<font color=blue>微信小程序接入 SDK</font>](/docs/sdk.html#微信小程序接入)
- [<font color=blue>桌面端接入指南</font>](/docs/sdk.html#桌面端接入)


#### PAG SDK 切换使用方法
在移动端 （Android 和 iOS），如果渲染的尺寸不是太大，总帧数不是太多，且不需要编辑文本和替换占位图，推荐使用 PAGImageView。
通过 setPath 接口设置待渲染的 [<font color=blue> PAG 文件</font>](/docs/terms.html#pag-文件)的路径，然后调用 play 方法进行渲染播放，如果需要从某个进度播放，
可以通过 setCurrentFrame 接口设置初始播放进度。

##### PAGImageView
Android 范例
```
PAGImageView pagImageView = new PAGImageView(this);
String path = "assets://test.pag";
pagImageView.setPath(path);
pagImageView.setCurrentFrame(10);  // 从第 10 帧开始播放
pagImageView.play();

```

iOS 范例：
```
PAGImageView* pagImageView = [[PAGImageView alloc] init];
NSString* path = [[NSBundle mainBundle] pathForResource:@"test" ofType:@"pag"];
[pagImageView setPath:path];
[pagImageView setCurrentFrame:10];  // 从第 10 帧开始播放
[pagImageView play];
```

PAGImageView 的实现原理是将每帧渲染的内容通过 LZ4 压缩缓存到本地磁盘，如果 PAGImageView 渲染的尺寸较大且
[<font color=blue> PAG 文件</font>](/docs/terms.html#pag-文件)时长较长，如手机全屏这种情况，会占用较大的磁盘空间做缓存，可能一个 [<font color=blue> PAG 文件</font>](/docs/terms.html#pag-文件)缓存下来就要几百 MB，目前
磁盘缓存默认占用最大磁盘空间为 1GB，如果这样的情况较多，会不断触发清理缓存逻辑，不但不会提升性能，反而使性能变差。

PAGImageView 适用于 UI 列表 或一个页面中含有多个小尺寸 View 的场景，这种场景下渲染的尺寸较小，一个 [<font color=blue> PAG 文件</font>](/docs/terms.html#pag-文件)
缓存完占用的磁盘空间也就几十 MB，渲染使用的时候会不断命中缓存，从而提升性能。其余场景我们还是推荐使用 PAGView。

如果使用场景中对于 CPU 要求较高内存占用要求较低，可以通过 PAGImageView setCacheAllFramesInMemory 接口设置全内存缓存

#### PAGView
如果是全屏播放或者 [<font color=blue> PAG 文件</font>](/docs/terms.html#pag-文件)帧数较多、需要编辑文本或替换占位图，推荐使用 PAGView。

Android 范例
```
PAGView pagView = new PAGView(this);
String path = "assets://test.pag";
pagView.setPath(path);
pagView.setProgress(0.10);  // 从 10% 的进度开始播放
pagView.play();
```

iOS 范例：
```
PAGView* pagView = [[PAGView alloc] init];
NSString* path = [[NSBundle mainBundle] pathForResource:@"test" ofType:@"pag"];
[pagView setPath:path];
[pagView setProgress:0.10];  // 从 10% 的进度开始播放
[pagView play];
```

Web 范例：
```
const PAG = await window.libpag.PAGInit();
const buffer = await fetch('https://pag.qq.com/file/like.pag').then((response) => response.arrayBuffer());
const pagFile = await PAG.PAGFile.load(buffer);
const pagView = await PAG.PAGView.init(pagFile, canvas);
await pagView.play();
pagView.setProgress(0.1); // 从 10% 的进度开始播放
```

#### PAG 其它接口使用
暂停播放：pause 或 stop

设置播放次数： setRepeatCount， 默认一次，设置为 0 为无限次

播放状态获取：isPlaying

获取播放进度：getProgress 或 currentFrame

刷新渲染当前帧: flush

获取当前帧渲染数据：makeSnapshot 或 currentImage

设置填充模式： setScaleMode，具体使用参考 [<font color=blue>PAG 填充模式</font>](/docs/pag-fillmode.html)

编辑文本及替换[<font color=blue>占位图</font>](/docs/terms.html#占位图)：
编辑文本：通过 PAGComposition （PAGFile 的父类）的 replaceText 相关接口
替换[<font color=blue>占位图</font>](/docs/terms.html#占位图)：通过 PAGComposition replaceImage 的相关接口
此时需要使用 PAGView 或 PAGImageView 的 setComposition 接口，而不是 setPath

更多的 API 接口使用可以参考：

[<font color=blue>iOS API 文档</font>](https://pag.io/apis/ios/index.html)

[<font color=blue>Android API 文档</font>](https://pag.io/apis/android/index.html)

[<font color=blue>Web API 文档</font>](https://pag.io/apis/web/index.html)


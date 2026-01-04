---
id: play-audio
title: 播放有声素材
---
---

PAG SDK 是一个特效渲染组件，专注于特效渲染，社区版不会处理音视频相关内容。如果需要音频播放的功能，可以使用 PAG 企业版。

包含 Movie 功能的 PAG 企业版（包名带有 movie 后缀）集成了音频读取与播放的能力，支持播放 PAG 文件中的内置音频和[<font color=blue>占位图</font>](/docs/terms.html#占位图)填充进来的视频中的音频, 使用方可以直接使用 PAGView 播放，或者读取 PCM 音频数据自行处理。

如果导出含有音频的 PAG 文件可以参考[<font color=blue> 如何导出音频 </font>](/docs/pag-music-mark.html)

## 音频播放组件 PAGView
企业版的 PAGView 已经集成了音频播放能力，支持播放 PAG 文件内置音频和占位图填充的视频文件中的音频。

PAGView 的详细文档参见：[<font color=blue> Android </font>](/docs/apis-android.html) | [<font color=blue> iOS </font>](/docs/apis-ios.html)。


## 获取音频数据
企业版的 PAGAudioReader 类提供了读取 PAGComposition 中的音频帧数据的接口，获取到为混合后的音频数据，即包含 PAG 文件
内置音频和占位图填充的视频文件中的音频，音频数据格式为 PCMSigned16。

### 使用范例 
#### 1、构建 PAGAudioReader 实例
代码示例

android:
```Java
// 获取指定音频参数的 reader 实例
int sampleRate = 48000;
int sampleCount = 1024;
int channels = 2;
PAGAudioReader reader = PAGAudioReader.Make(sampleRate, sampleCount, channels);
```

iOS:
```objectivec
// 获取指定音频参数的 reader 实例
NSInteger sampleRate = 48000;
NSInteger sampleCount = 1024;
NSInteger channels = 2;
CGFloat volume = 1.0f; // 0 ~ 1.0f
PAGAudioReader *reader = [PAGAudioReader MakeWithSampleRate:sampleRate sampleCount:sampleCount channels:channels volume:1.0f];
```

#### 2、设置 PAGComposition 实例
代码示例

Android:

```Java
PAGAudioReader reader = PAGAudioReader.Make(sampleRate, sampleCount, channels);
PAGComposition composition = PAGFile.Load(getAssets(), selectedPAGFileName);
reader.setComposition(composition);
```

iOS:
```objectivec
PAGComposition *composition = [PAGFile Load:path];
[reader setComposition:composition];
```


#### 3、seek（可选）

Android:

```Java
// seek 到第5秒的位置
long positionUs = 5_000_000;
reader.seek(positionUs);
```

iOS:
```objectivec
NSInteger positionUs = 5*1000*1000;
[reader seek:positionUs];
```

#### 4、读取音频
通过 PAGAudioReader 的 readNextSample 接口可以读取一帧音频，同时移动到下一帧的位置；

读取一个 PAGComposition 实例中完整的音频数据，只需要循环调用 readNextSample，直到所有音频数据都读取完毕。

因为 composition 允许实时修改，当 composition 没有音频数据时，audioReader 仍然会返回音频帧，此时音频中 data 数据均为0。

代码示例：

Android:

```Java
if (reader.isEmpty()) {
    // 如果 reader.isEmpty() 返回 true，说明 composition 没有音频数据
    return;
}
// 循环读取音频数据，直到读取完毕
PAGAudioSample audioFrame;
while ((audioFrame = reader.readNextSample()) != null 
        && audioFrame.timestamp + audioFrame.duration < composition.duration()) {
    audioFrame = reader.readNextSample();
    playAudio(audioFrame);
}
```

iOS:
```objectivec
if ([reader isEmpty]) {
    // 如果 [reader isEmpty] 返回 true，说明 composition 没有音频数据
    return;
}
PAGAudioSample* audioFrame = nil;
while ((audioFrame = [reader readNextSample]) != null 
        && audioFrame.timestamp + audioFrame.duration < composition.duration) {
    audioFrame = reader.readNextSample();
    dealWithAudio(audioFrame);
}
```
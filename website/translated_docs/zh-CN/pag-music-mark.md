---
id: pag-music-mark
title: 如何导出音频
---
---
## 如何在AE中导出音频

1、将音频文件添加到目标合成中

2、在导出面板中勾选导出音频
<img
src='/img/docs/export_music.png'
style='width: 700px; margin: 32px 0 48px 0'
/>



## 查看音频是否导出成功
在 PAGViewer 中查看 PAG 文件结构：</br>
根据 getRootLayer：PreComposeLayer -> composition:VectorComposition -> audioBytes 的值，来判断 PAG 文件中音频输入是否导出成功，为 {} 时导出成功，为 null 时导出失败


#### 导出成功：
<img 
  src='/img/docs/export_music_success.png' 
  style='width: 700px; margin: 32px 0 48px 0' 
/>


#### 导出失败：
<img 
  src='/img/docs/export_music_failed.png' 
  style='width: 700px; margin: 32px 0 48px 0' 
/>


## 音频文件的格式

#### pag中音频文件编码格式为 aac，容器格式为 mpeg-4


## PAG 内置音频数据的播放
### 社区版本
由于 PAG 是动效渲染库，默认是不会处理内置音频数据的，需要业务方自己处理音频播放、音画同步的问题。

PAG 中音频数据编码格式为 aac，容器格式为 mpeg-4

### 企业版本
如果业务方觉得这部分处理麻烦，可以接入 PAG 企业版本，企业版增加了音视频的相关封装，具体差异可以查看 [<font color=blue> 企业版和社区版功能对比 </font>](https://pag.io/feature.html#comparison) 

---
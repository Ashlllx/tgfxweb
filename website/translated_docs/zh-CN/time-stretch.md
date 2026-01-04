---
id: time-stretch
title: PAG 时间伸缩
---
---

## 背景
由于 pag 文件的时长是固定的，在某些场景需要 pag 文件的时长能够动态变化，如占位图填充视频的场景，视频的长度是变化的，需要 pag 文件动态拉伸进行匹配。

当设置 PAG 的播放时长和 pag 文件时长不一致时，会应用时间伸缩。

## 时间伸缩 (TimeStretch) 设置
### 1. 打开导出面板: “文件”菜单 -> “导出” -> "PAG Panel...". 如下图：<br/>

<img 
  src='/img/docs/export_panel_entrance.jpg' 
  style='width: 620px; margin: 32px 0 48px 0' 
/>

### 2. 在导出面板中点击“设置”下的按钮，如下图：<br/>

<img 
  src='/img/docs/export_panel_setting.jpg' 
  style='width: 620px; margin: 32px 0 48px 0' 
/>

### 3. 在设置面板中点击“时间伸缩”页，即可设置时间伸缩的相关参数，如下图：<br/>

<img 
  src='/img/docs/time-stretch-3.jpg' 
  style='width: 620px; margin: 32px 0 48px 0' 
/>
   伸缩模式：<br/>
   - none：不拉伸<br/>
   - scale：线性拉伸<br/>
   - repeat:重复<br/>
   - repeatinverted：倒序重复（播放到结尾后倒序播放）<br/>

   伸缩区间：<br/>
   - 当模式为scale时有效，其它模式无效，一个pag文件仅能有一个拉伸区间<br/>
### 4. 点击“确认” 完成设置。<br/>

---
id: pag-export
title: 导出 PAG 文件
---
---
### 概述

PAG 同时支持矢量导出、BMP 预合成导出、矢量和 BMP 预合成混合导出三种方式。

+ 矢量导出：导出的方式文件极小，且性能会优于 BMP 预合成，支持常用 AE 特性。矢量预合成导出通常用于 UI 动画等对于文件大小和性能敏感以及特效内容可编辑的场景。

+ BMP 预合成导出：可以支持所有 AE 特性，但是文件体积较大，无法二次编辑。BMP 预合成通常用于无法[<font color=blue>矢量导出</font>](/docs/terms.html#矢量导出)的场景，例如用了粒子效果或者第三方插件等。

+ 矢量和 BMP 预合成混合导出： 为了保持动效的可编辑性，支持矢量和 BMP 预合成[<font color=blue>混合导出</font>](/docs/terms.html#混合导出)，BMP 预合成的设置不在根节点上，需要编辑的文本图层或图片图层采用矢量的方式导出，其余内容可以采用 BMP 预合成导出。


> 矢量导出支持的特性列表可以参考：[<font color=blue>AE 特性支持列表</font>](https://pag.io/feature.html#ae) </br>


### 准备工作

1，确保已经安装 PAGViewer。[<font color=blue>如何安装 PAGViewer</font>](/docs/install.html)<br/>
2，确保已经安装 AE 导出插件。[<font color=blue>如何安装 AE 导出插件</font>](/docs/install-PAGExporter.html)<br/>
3，打开 AE 软件，在菜单项中将会看到：“文件” -> “导出” -> “PAG File...”，则说明已经成功安装。<br/>

   PAG 文件导出提供了两种方式，如下图所示：直接导出和导出插件面板导出，后置增加了导出插件面板的显示，方便查看 AE 工程中直接导出存在的问题，以及多了一些智能化的处理，具体参考导出插件版块<br/>
<img 
  alt='PAG 文件导出' 
  src='/img/docs/pag_hotkey_0.png' 
  style='width: 600px; margin: 48px 0; border-radius: 8px' 
/>
---
### 导出全矢量的 PAG 文件

点击选中需要导出的合成(Composition)，然后点击菜单“文件” -> “导出” -> “PAG File...”，选择要保存的路径即可导出。<br/>
导出成功后双击导出的 PAG 文件可以直接预览动效。

### 导出全 BMP 预合成的 PAG 文件
点击菜单“文件” -> “导出” -> “PAG File(Panel)...”,选择需要导出的合成，点击设置按钮，在根节点勾选 BMP，导出全 BMP 预合成的 PAG 文件

<img
src='/img/docs/bmpGuide/bmp_guide_5.png'
style='width: 620px; margin: 32px 0 48px 0'
/>

### 导出矢量和 BMP 预合成混合的 PAG 文件
点击菜单“文件” -> “导出” -> “PAG File(Panel)...”,选择需要导出的合成，点击设置按钮，在子节点勾选 BMP，导出矢量和 BMP 预合成混合的 PAG 文件

**注意**：如果图层需要替换文本或[<font color=blue>占位图</font>](/docs/terms.html#占位图)，该图层不能包含在勾选的合成或预合成中

<img
src='/img/docs/bmpGuide/bmp_guide_5_1.png'
style='width: 620px; margin: 32px 0 48px 0'
/>

> 关于 BMP 预合成导出的更多详细信息，参考[<font color=blue> BMP 预合成导出</font>](/docs/ae-bmp-guide.html)
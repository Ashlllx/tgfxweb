---
id: optimization
title: PAG 素材优化指南
---
---
## 背景

在 AE 中，相同的动效特效，可以有许多不同的实现方式，导出成 PAG 文件，在终端渲染效果是一样的，但性能却千差万变。<br/>
本文旨在讨论在 AE 中设计 PAG 素材的注意事项，什么样的设计会在终端有比较好的性能表现。 

## PAGViewer

PAGViewer 不仅仅是 PAG 素材的桌面预览工具，同时还提供了性能面板用来查看 PAG 文件素材的基本信息，可以定性的评估 PAG 素材的性能。<br/>

<img 
  src='/img/docs/opt.png' 
  style='width: 600px; margin: 32px 0 48px 0' 
/>

> 关于 PAGViewer 性能面板的使用，可以参考 [<font color=blue>使用性能检测面板</font>](/docs/profiler.html)
 
## PAG 素材设计基本原则
### 1、 相比 BMP 预合成导出，尽可能的使用[<font color=blue>矢量导出</font>](/docs/terms.html#矢量导出)
 虽然 PAG 支持的 AE 特性较多，但并不是所有的特性和第三方插件特效都是支持的。针对不能直接导出特性或特效，PAG 动效方案提供了 BMP 预合成的解决方案。 其原理是在 AE 渲染的过程中对特定图层截屏，将一帧帧画面编码成视频序列帧或位图序列帧。

**BMP 预合成优点：**<br/>
* 	支持所有 AE 特性

**BMP 预合成缺点：**<br/>
* 	导出文件较大 <br/>
* 	在终端渲染的性能稍差，会使用到终端的硬件解码器资源，比较消耗资源  <br/>
* 	不支持二次编辑  <br/>

### 2、 矢量文件优化策略

* 尽可能降低图层复杂度，降低总的图层数量，可以使用预合成方式来复用相同图层而不是直接拷贝。<br/>
* 遮罩和轨道蒙板在绘制的过程中相对耗时，能用普通图形做出来的效果请避免使用遮罩和轨道蒙板，只有确定必须使用它们才能做出效果
的情况再使用。如果必须使用遮罩和轨道蒙板，请尽量用简单图形或者简单内容图层去遮罩或蒙板住一个复杂图层，避免反过来操作。<br/>
* 图层内容尽可能静止，多使用 Transform 变换位置大小旋转缩放。例如形状图层，即避免对形状内容打关键帧。

### 3、 BMP 预合成文件优化策略

* 	尽可能减少 BMP 预合成的数目，多个 BMP 预合成尽量合并成一个<br/>
* 	如果已经有了一个 BMP 预合成，与它相邻的不需要编辑的图层也可以考虑添加到 BMP 预合成中，因为已经截图了，包含再多内容都是相同的性能开销<br/>

#### BMP 预合成优化案例:<br/>

(1)  相邻多个不同 BMP 预合成可合并
<img
src='/img/docs/opt_0.png#pic_left'
style='width: 600px; margin: 32px 0 48px 0'
/>	
	
(2）不同BlendMode的BMP预合成不能合并
<img
src='/img/docs/opt_1.png#pic_left'
style='width: 600px; margin: 32px 0 48px 0'
/>
	
(3）不需要编辑的图层内容合入相近 BMP 预合成
<img
src='/img/docs/opt_2.png#pic_left'
style='width: 600px; margin: 32px 0 48px 0'
/>	

(4) 跨图层 BMP 预合成合并 <br/>
	如下图，有两个 BMP 预合成，分别处于不同的图层
<img
src='/img/docs/opt_3.png#pic_left'
style='width: 600px; margin: 32px 0 48px 0'
/>	
	BMP 预合成跨图层合并后，只有一个 BMP 预合成
<img
src='/img/docs/opt_4.png#pic_left'
style='width: 600px; margin: 32px 0 48px 0'
/>		

(5）BMP 预合成反面使用案例 <br/>
	如下图，做了两个内容和名字都相同的预合成
<img
src='/img/docs/opt_5.png#pic_left'
style='width: 600px; margin: 32px 0 48px 0'
/>
	正确做法：一个预合成被引用两次 <br/>

(6）重叠区间 BMP 预合成优化
<img
src='/img/docs/opt_6.png#pic_left'
style='width: 600px; margin: 32px 0 48px 0'
/>
	如上图，虽然是相同内容，但是有重叠时间段，不能做成一个预合成复用，否则重叠时间段内会不断 seek 解码 <br/>
	优化建议：合成一个 BMP 预合成 <br/>

### 4、 UI 图片素材优化 <br/>

*   满足最低需求原则，降低图片素材分辨率 <br/>

	<img 
	src='/img/docs/opt_7.png#pic_left' 
	style='width: 700px; margin: 32px 0 48px 0' 
	/>

	<img 
	src='/img/docs/opt_8.png#pic_left' 
	style='width: 700px; margin: 32px 0 48px 0' 
	/>

  	挑选使用分辨率比较大的图片素材，降低分辨率 <br/>


* 	对于 BMP 预合成素材一样，BMP 预合成的尺寸也不宜大于所在图层的尺寸 <br/>

	<img src='/img/docs/opt_9.png' style='width: 640px; margin: 32px 0 48px 0'/>
	
同时，降低 BMP 预合成素材的分辨率同样可以提升性能 <br/>


### 5、 性能检测面板提醒 <br/>

> 当导出 PAG 素材预览的时候有红色警告信息，可以结合提示信息对 PAG 素材进行优化，如何解读参考 [<font color=blue>使用性能检测面板</font>](/docs/profiler.html) 和 [<font color=blue>AE 导出自动检测规则</font>](/docs/pag-export-verify.html)

---



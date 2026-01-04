---
id: ae-bmp-guide
title: BMP 预合成导出
---

## 一、BMP 预合成解决的问题
BMP 预合成虽然支持所有的 AE 特性，但 BMP 预合成是一个保底方案，适用于使用了不能支持导出的 AE 特性的场景，如粒子效果、第三方插件效果等，以及复杂耗时的 AE 特效如轨道遮罩等。就性能而言，大部分情况下，纯矢量的性能要远高于含有 BMP 预合成的 pag 文件。

PAG 目前支持的 AE 特性可以参考文章：[<font color=blue> AE 特性支持列表</font>](https://pag.io/feature.html#ae) 

## 二、BMP 预合成导出使用步骤
### 步骤一：从图 3 所示入口，进入主页面
<img 
  src='/img/docs/bmpGuide/bmp_guide_3.png' 
  style='width: 620px; margin: 32px 0 10px 0' 
/>
<p style='width: 620px; text-align: center;'><font size="2">图 3 导出主面板入口</font></p>

---
### 步骤二：从图 4 所示入口，进入合成设置页
<img 
  src='/img/docs/bmpGuide/bmp_guide_4.png' 
  style='width: 620px; margin: 32px 0 10px 0' 
/>
<p style='width: 620px; text-align: center;'><font size="2">图 4 导出主面板-合成设置页入口</font></p>


### 步骤三：在合成设置页中，点击对应合成的 BMP 复选框
#### 导出全 BMP 预合成的 PAG 文件
在根节点勾选 BMP

<img
src='/img/docs/bmpGuide/bmp_guide_5.png'
style='width: 620px; margin: 32px 0 10px 0'
/>
<p style='width: 620px; text-align: center;'><font size="2"> 图 5 全 BMP 预合成导出</p></p>


#### 导出矢量和 BMP 预合成混合的 PAG 文件
在子节点根据需要需要勾选 BMP

<img
src='/img/docs/bmpGuide/bmp_guide_5_1.png'
style='width: 620px; margin: 32px 0 10px 0'
/>
<p style='width: 620px; text-align: center;'><font size="2"> 图 6 矢量和 BMP 预合成混合导出</p>

### 步骤四：如图 6 所示，勾选 BMP 复选框后，会有二次确认弹框，点击确认完成
<img 
  src='/img/docs/bmpGuide/bmp_guide_6.png' 
  style='width: 620px; margin: 32px 0 10px 0' 
/>
<p style='width: 620px; text-align: center;'><font size="2"> 图 7 BMP 确认提示框 </font></p>

#### 如图 8 所示完成勾选之后，AE 中可以看到对应的合成名称，自动带上了 BMP 后缀，导出的时候将会编码成视频序列帧或位图序列帧。

<img 
  src='/img/docs/bmpGuide/bmp_guide_7.png' 
  style='width: 620px; margin: 32px 0 10px 0' 
/>
<p style='width: 620px; text-align: center;'><font size="2"> 图 8</font></p>




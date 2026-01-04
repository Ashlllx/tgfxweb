---
id: pag-edit
title: 编辑预览效果
---
---

桌面端预览工具 PAGViewer 不仅仅支持预览 PAG 文件效果，还支持编辑文本和填充占位图，无需等到上线便可预览线上效果。

这里需要注意的是， PAG 文件更多的是一个动效模版，这里的编辑只用于预览替换后的效果，无法导出新的 PAG 文件，在终端可以通过 API 接口动态的编辑文本和替换占位图。如果仍然想修改默认的文本内容和占位图，需要在 AE 中修改重新导出。

## 编辑功能入口

1. 正常打开某 PAG 文件。

2. 点击顶部菜单视图->显示/隐藏图层编辑面板，或按快捷键" L "，即可看到图层编辑界面。

<img 
  src='/img/docs/layer_edit_text_0.jpg' 
  style='width: 700px; margin: 32px 0 48px 0' 
/>

## 编辑文本

1. 在图层编辑面板中点击希望更改的文字区域，可以直接修改图层文字。

<img 
  src='/img/docs/layer_edit_text_1.jpg' 
  style='width: 700px; margin: 32px 0 48px 0' 
/>

2. 编辑完成后，对应图层会展示更改后的文字。

<img 
  src='/img/docs/layer_edit_text_2.jpg' 
  style='width: 700px; margin: 32px 0 48px 0' 
/>

3. 文本图层编辑窗口可以修改图层的粗体、斜体、字体颜色、字体、字号、描边颜色、描边宽度以及文本属性。

4. 确认修改后，点击"确认"按钮可以应用修改。

5. 重置至初始状态

点击对应图层的"撤销"按钮，会将图层恢复至图层最初状态。
<img 
  src='/img/docs/layer_edit_text_8.jpg' 
  style='width: 700px; margin: 32px 0 48px 0' 
/>

## 替换占位图
1. 在需要替换图片图层右侧, 点击“替换”弹出图片选择面板，选择目标图片后点击“打开”即可替换该图层，或者通过直接拖拽图片或视频到对应图层同样可以达到替换效果。

2. 在对应图层点击"撤销"钮即可恢复此图层图片为初始状态。
<img 
  src='/img/docs/layer_edit_image.png' 
  style='width: 700px; margin: 32px 0 48px 0' 
/>



---
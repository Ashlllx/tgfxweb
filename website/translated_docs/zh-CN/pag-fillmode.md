---
id: pag-fillmode
title: PAG 填充模式
---
---
## 填充模式使用场景
PAG 填充模式主要使用在以下两种场景：
1. 当渲染的尺寸（PAGView、PAGSurface 大小）和 pag 文件的尺寸不一致时
2. 当 pag 文件中 [<font color=blue> 占位图 </font>](/docs/terms.html#占位图) 的尺寸和填充图片尺寸不一致时

## 填充模式的效果
### PAG 支持以下几种填充模式：

+  None：不缩放，左上角位置开始裁剪

+  LetterBox：黑边，在保持高宽比的情况下缩放到设备的可用屏幕大小，图像不发生变形，如果图片尺寸和填充区域比例不一致，会出现黑边，为默认填充模式

+  Stretch：拉伸，不保持宽高比填充，会发生失变形

+  Zoom：裁剪，在保持高宽比的情况下缩放到完全填满可用的屏幕大小

<img
src='/img/docs/pag_fillmode.jpeg'
style='width: 620px; margin: 32px 0 48px 0'
/>

## 填充模式的设置方法
### 导出面板中设置
[<font color=blue> 占位图 </font>](/docs/terms.html#占位图) 的填充模式可以在 AE 导出面板中设置

<img
src='/img/docs/image_fill_setting.jpg'
style='width: 620px; margin: 32px 0 48px 0'
/>


### API 设置
可以在 PAGView、PAGImageView、PAGPlayer、PAGImage 中通过以下方法设置
```asm
- (void)setScaleMode:(PAGScaleMode)value
```

iOS 平台的 PAGImageView 通过系统自带的 contentMode 方法
```asm
@property(nonatomic) UIViewContentMode contentMode;
```
 如果以上填充模式不满足需求，支持设置 PAG 渲染内容或填充图片的 Matrix, 通过以下接口
```asm
// iOS
- (void)setMatrix:(CGAffineTransform)value;

// Android
void setMatrix(Matrix matrix);

```



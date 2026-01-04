---
id: web-play-pagfile
title: 播放 PAG 文件
---
---

## 初始化 PAGView

指定 `PAGFile` 对象与 `canvas` 对象进行绑定，实例化成 `PAGView` 对象。

```javascript
const pagView = await PAG.PAGView.init(pagFile, canvas);
```

#### 首帧渲染

`PAGView.init` 默认会进行首帧渲染。

在进行首帧渲染的过程中，当 PAG 动画文件中存在 [<font color=blue> BMP 预合成</font>](/docs/terms.html#bmp-预合成)（下文说明如何确认 [<font color=blue> PAG 文件</font>](/docs/terms.html#pag-文件)是否存在 [<font color=blue> BMP 预合成</font>](/docs/terms.html#bmp-预合成)）时，会调用 VideoReader 模块。

由于 VideoReader 模块在 Web 平台依赖于 VideoElement，所以在部分移动端场景下，PAGView.init 不是在用户交互产生的调用链中，可能会存在不允许播放导致无法正常渲染画面的问题。

当出现这种情况，我们推荐取消首帧渲染  

```javascript
const pagView = await PAG.PAGView.init(pagFile, canvas, { firstFrame: false });
```

在用户交互产生的调用链中再调用 `pagView.play()` 进行画面渲染。

#### 高清渲染

在 Web 平台上，我们需要考虑两种像素分辨率：设备像素分辨率（设备实际的点的数量）和 CSS 像素分辨率（在编程时我们所使用的点的数量）。这两者之间的比率被称为 `devicePixelRatio`。这意味着，如果我们想在屏幕上显示一个 1px 大小的 CSS 像素，我们实际需要渲染的尺寸是 1px \* `devicePixelRatio`。

默认情况下，PAG 会自动缩放 Canvas 的尺寸以适应屏幕的可视尺寸。这个过程可能会改变 Canvas 的宽高以及 `style` 属性。

如果你不希望 PAG 修改 Canvas 的属性，你可以在初始化时取消缩放，如下所示：

``` javascript
const pagView = await PAG.PAGView.init(pagFile, canvas, { useScale: false });
```

#### 多个 PAGView

首先，因为 PAG Web 版是单线程的 SDK，所以我们不建议**同屏播放多个 PAGView**。

对于有多个 PAGView 实例的场景，我们需要先知道，浏览器环境中 WebGL 活跃的 context 数量是有限制的，Chrome 是 16 个，
Safari 是 8 个。因为有这个限制存在，我们应当及时使用 `destroy` 回收无用的 PAGView 实例和移除 Canvas 的引用。

推荐的解决方案是使用 PAG 的组合模式，自己创建一个 PAGComposition，然后把需要播放的 PAGFile 通过 addLayer 的方法添加
进去，setStartTime 可以设置每个 PAGFile 相对于 PAGComposition 的开始时间，setMatrix 可以设置相当于 PAGComposition 
的位置。

**以下是特殊场景的解决方法，不推荐使用：**

如果你需要在 Chrome 浏览器中同屏存在多个 PAGView 实例且不需要在 Safari 上使用，可以尝试使用 canvas2D 模式，需要在 `PAGView.init` 的时候传入 `{ useCanvas2D: true }` 。这个模式下，会用一个 WebGL 当作渲染器，然后往多个 canvas2D 分发画面，从而规避 WebGL 活跃 context 数量的限制。

因为 Safari 上 [`CanvasRenderingContext2D.drawImage()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage) 的性能很差，所以我们不推荐在 Safari 上使用这个模式。

#### 渲染尺寸

为了高清的渲染效果，PAGView 默认会按照 Canvas 尺寸 \* `devicePixelRatio` 作为实际渲染尺寸。
受设备自身性能影响 WebGL 的最大渲染尺寸可能各不相同。会出现渲染尺寸过大导致白屏的情况。

建议移动端下，实际渲染尺寸不大于 2560px。

#### 注册解码器

对于“用户与页面交互之后才可以使用 Video 标签进行视频播放”规则的限制，PAG Web 版提供软件解码器注入接口 ` PAG.registerSoftwareDecoderFactory()`。

注入软件解码器后，PAG 会调度软件解码器去对 [<font color=blue> BMP 预合成</font>](/docs/terms.html#bmp-预合成)进行解码与上屏，从而实现部分平台进入页面自动播放的功能。

推荐解码器接入：https://github.com/libpag/ffavc/tree/main/web

已知“用户与页面交互之后才可以使用 Video 标签进行视频播放”限制的平台有：移动端微信浏览器，iPhone 省电模式，部分 Android 浏览器。

## 操作动效

播放

```javascript
pagView.play();
```

暂停

```javascript
pagView.pause();
```

停止

```javascript
pagView.stop();
```

销毁

```javascript
pagView.destroy();
```
## Web 自适应说明

### 填充模式

当 PAGView（PAGSurface）和 PAGFile 的尺寸不一致时，会使用填充模式进行适应，默认是 LetterBox 模式。你可以在 [PAG 填充模式](/docs/pag-fillmode.html) 章节中找到更多信息。

填充模式：

- None：不缩放，左上角位置开始裁剪；
- LetterBox：黑边，在保持高宽比的情况下缩放到设备的可用屏幕大小，图像不发生变形，如果图片尺寸和填充区域比例不一致，会出现黑边，为默认填充模式；
- Stretch：拉伸，不保持宽高比填充，会发生失变形；
- Zoom：裁剪，在保持高宽比的情况下缩放到完全填满可用的屏幕大小；


### Canvas 尺寸变化

如 [<font color=blue> 高清渲染</font>](/docs/zh-CN/web-play-pagfile.html#高清渲染) 章节中所述，PAGView.init() 会默认将 canvas 的宽高设定为 宽高 * dpr，然后使用 `style` 将其缩放回原尺寸进行展示。

但是，如果以上填充模式无法满足你的需求, 你也可以关闭 PAGView 默认的高清渲染, 手动控制渲染尺寸。

首先，你需要计算 canvas 的尺寸：

```javascript
const styleDeclaration = window.getComputedStyle(canvas, null);
canvas.width = Number(styleDeclaration.width.replace('px', '')) * window.devicePixelRatio;
canvas.height = Number(styleDeclaration.height.replace('px', '')) * window.devicePixelRatio;
```

接着，在初始化 PAGView 时，传入 `useScale: false` 关闭默认的高清渲染：

```javascript
const pagView = await PAG.PAGView.init(pagFile, canvas, { useScale: false });
```

最后，当 `canvas` 展示大小发生变化时，重新计算 `canvas` 的尺寸，并调用 `pagView.updateSize` 方法：

``` javascript
window.onresize = () => {
  const styleDeclaration = window.getComputedStyle(canvas, null);
  canvas.width = Number(styleDeclaration.width.replace('px', '')) * window.devicePixelRatio;
  canvas.height = Number(styleDeclaration.height.replace('px', '')) * window.devicePixelRatio;
  pagView.updateSize();
  pagView.flush();
}
```



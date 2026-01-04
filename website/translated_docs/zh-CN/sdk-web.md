---
id: sdk-web
title: Web端接入指南
---

---

SDK 的接入和使用请遵守 [<font color=blue>PAG SDK 个人信息保护规则</font>](https://privacy.qq.com/document/preview/01e79d0cc7a2427ba774b88c6beff0fd)

## 特性

- Web 平台能力适配，支持 libpag 全能力
- 基于 WebAssembly + WebGL

## 快速开始

PAG Web 端，由 libpag.js + libpag.wasm 文件组成。

```html
<canvas class="canvas" id="pag"></canvas>
<script type="module" src="https://cdn.jsdelivr.net/npm/libpag@latest/lib/libpag.min.js"></script>
<script>
  window.onload = async () => {
    // 实例化 PAG
    const PAG = await window.libpag.PAGInit();
    // 获取 PAG 素材数据
    const buffer = await fetch('https://pag.qq.com/file/like.pag').then((response) => response.arrayBuffer());
    // 加载 PAG 素材为 PAGFile 对象
    const pagFile = await PAG.PAGFile.load(buffer);
    // 将画布尺寸设置为 PAGFile的尺寸
    const canvas = document.getElementById('pag');
    canvas.width = pagFile.width();
    canvas.height = pagFile.height();
    // 实例化 PAGView 对象
    const pagView = await PAG.PAGView.init(pagFile, canvas);
    // 播放 PAGView
    await pagView.play();
  };
</script>
```
PS: 全局只需要实例化一个 PAG 对象

`上述步骤接入的是 libpag 单线程版本，若要接入多线程版本请参考如下接入指南。`

## 多线程接入

接入多线程的 Web 端代码与单线程相同，但服务端要符合跨域安全性要求，具体要求可查看 [<font color=blue>多线程接入指南</font>](https://github.com/Tencent/libpag/blob/main/web/README.zh_CN.md#%E5%A4%9A%E7%BA%BF%E7%A8%8B%E6%8E%A5%E5%85%A5%E6%8C%87%E5%8D%97)

## 浏览器兼容性

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome for Android | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari on iOS | QQ Browser Mobile |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| Chrome >= 69                                                                                                                                                      | Safari >= 11.3                                                                                                                                                    | Android >= 7.0                                                                                                                                                                | iOS >= 11.3                                                                                                                                                              | last 2 versions   |

更多版本的兼容工作正在进行中

**以上的兼容表仅代表可以运行的兼容性。对于有移动端接入需要的用户，需要阅读一下这篇[兼容性情况](/docs/web-sdk/compatibility.html)的文章**

## More

Web-lite：[<font color=blue>https://github.com/Tencent/libpag/tree/main/web/lite</font>](https://github.com/Tencent/libpag/tree/main/web/lite)

Github：[<font color=blue>https://github.com/Tencent/libpag/blob/main/web/README.md</font>](https://github.com/Tencent/libpag/blob/main/web/README.md)

Web demo：[<font color=blue>https://github.com/libpag/pag-web</font>](https://github.com/libpag/pag-web)


---
id: sdk-miniprogram
title: 小程序端接入指南
---

---

SDK 的接入和使用请遵守 [<font color=blue>PAG SDK 个人信息保护规则</font>](https://privacy.qq.com/document/preview/01e79d0cc7a2427ba774b88c6beff0fd)

> libpag-miniprogram 是 libpag 在微信小程序平台的 SDK
>
> 当前为 alpha 版本，欢迎使用与反馈🎉

## 特性

- Web 平台能力适配，支持 libpag 全能力
- 基于 WebAssembly + WebGL

## 快速开始

PAG Web 端，由 libpag.js + libpag.wasm.br 文件组成。

1. NPM 依赖

``` bash
$ npm install libpag-miniprogram
```

点击「微信开发者工具」- 「工具」- 「构建npm」，进行小程序 npm 依赖构建

2. 将 node_modules/libpag-miniprogram/lib/libpag.wasm.br 文件复制到utils目录下
3. 初始化 PAG

``` javascript
// index.js
import { PAGInit } from 'libpag-miniprogram';

Page({
  async onReady() {
    this.PAG = await PAGInit({locateFile: (file) => '/utils/' + file});
  }
})
```

4. 播放 PAG 动效
```xml
<!-- index.wxml -->
<canvas type="webgl" id="pag" style="width: 300px; height:300px;"></canvas>
```

``` javascript
// index.js
wx.createSelectorQuery()
  .select('#pag')
  .node()
  .exec(async (res) => {
    const canvas = res[0].node;
    const buffer = await loadFileByRequest('https://pag.qq.com/file/test.pag');
    const pagFile = await this.PAG.PAGFile.load(buffer);
    const pagView = await this.PAG.PAGView.init(pagFile, canvas);
    pagView.play();
  });

const loadFileByRequest = async (url) => {
  return new Promise((resolve) => {
    wx.request({
      url,
      method: 'GET',
      responseType: 'arraybuffer',
      success(res) {
        if (res.statusCode !== 200) {
          resolve(null);
        }
        resolve(res.data);
      },
      fail() {
        resolve(null);
      },
    });
  });
};
```

## More

lite版本：[<font color="blue">https://github.com/Tencent/libpag/tree/main/web/lite/wechat</font>](https://github.com/Tencent/libpag/tree/main/web/lite/wechat)

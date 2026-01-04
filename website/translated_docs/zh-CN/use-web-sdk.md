---
id: use-web-sdk
title: SDK 安装
---

---


libpag SDK 的运行需要依赖于 libpag.js 和 libpag.wasm 文件，可以简单的理解为 libpag.js 是代理层，libpag.wasm 是核心层。
libpag.wasm 的加载需要通过引入 libpag.js 后调用 `PAGInit()` 接口进行实例化，这个时候会默认去加载当前执行脚本同级目录下的 libpag.wasm 文件。当 libpag.wasm 并不载同级目录下时，可以使用 `PAGInit()` 上的钩子 `locateFile` 去指定
libpag.wasm 的路径。

wasm 文件是可以 GZIP 的，公共 CDN 默认启用了 wasm 文件的 GZIP，如果是自己的静态资源服务需要手动配置。

## 通过 CDN 使用

直接使用 `<script>` 引入 CDN 上的 js 文件。

```
<script type="module" src="https://cdn.jsdelivr.net/npm/libpag@latest/lib/libpag.min.js"></script>
```

你可以在公共 CDN [<font color=blue>cdn.jsdelivr.net/npm/libpag/</font>](https://cdn.jsdelivr.net/npm/libpag/) 浏览 NPM 包内的内容，如果想要指定某一个版本可以使用 @\<version> 指定。

也可以使用其他同步 NPM 的公共 CDN 如 [<font color=blue>unpkg</font>](https://unpkg.com/browse/libpag@4.2.84/) 或者将文件下载下来自行加载。

### 使用全局引入的版本

`libpag` 会被注册为一个全局变量，可以调用 `libpag.PAGInit` 来实例化以获得 `PAG` 实例：

``` html
<script type="module" src="https://cdn.jsdelivr.net/npm/libpag@latest/lib/libpag.min.js"></script>
<script>
  libpag.PAGInit().then((pag) => {
    // 实例化成功
  })
</script>
```

[<font color=blue>在线示例</font>](https://codesandbox.io/s/umd-demo-zt5vo7?file=/index.html)

### 使用 ES 模块引入的版本

大多数的现代浏览器现在都已原生支持 ES 模块，所以可以这样使用：

```html
<script type="module">
    import { PAGInit } from "https://cdn.jsdelivr.net/npm/libpag@latest/lib/libpag.esm.js";
    PAGInit({
      locateFile: (file) => "https://cdn.jsdelivr.net/npm/libpag@latest/lib/" + file
    }).then((pag) => {
      // 实例化成功
    })
</script>
```

这里可以注意到 PAGInit 方法中使用 locateFile 的钩子指向 libpag.wasm 的位置。

[<font color=blue>在线示例</font>](https://codesandbox.io/s/esm-demo-l2nb0b?file=/index.html:385-1415)

## 通过 NPM 使用

> 前提条件
>
> 1. 已经安装 [<font color=blue>Node.js</font>](https://nodejs.org/en/)，并且熟悉命令行
> 2. 熟悉 Webpack/Rollup 等打包工具

本节中我们将介绍如何在工程化的项目中引入 libpag，其中需要配置 Webpack/Rollup 对 libpag.wasm 进行拷贝动作。

在命令行中运行 npm 进行 libpag 安装（不要带上 `>` 符号）：

``` bash
> npm install libpag
```

在代码中引入：

``` javascript
import { PAGInit } from 'libpag';
PAGInit().then(pag => {
  // 实例化成功
})
```

需要注意的是，像 Webpack 和 Rollup 等打包工具是默认没有打包 .wasm 文件的。也就是说如果你的项目是 Vue / React 这类
使用脚手架构建的，需要把 node_modules 下的 libpag/lib/libpag.wasm 文件打包到最终产物中，并且使用 `locateFile` 钩子返回 libpag.wasm 文件的路径，这样才能确保在网络请求中能加载到 libpag.wasm 文件。

简单的接入示例和 Vue / React / PixiJS 等配置示例， 可以点击 [<font color=blue>这里</font>](https://github.com/libpag/pag-web) 查看。

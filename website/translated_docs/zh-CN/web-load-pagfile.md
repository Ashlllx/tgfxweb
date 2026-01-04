---
id: web-load-pagfile
title: 加载 PAG 文件
---
---

## 网络加载
> PAG SDK专注于动效渲染，并没有内置网络模块, 因此请自行使用网络模块加载动效文件。

以浏览器 API `fetch` 为例，加载动效文件的代码如下：

``` javascript
fetch("https://pag.qq.com/file/like.pag").then(response => {
  return response.arrayBuffer(); // [<font color=blue> PAG 文件</font>](/docs/terms.html#pag-文件)
})
```

## PAG 文件解码

使用 `PAGFile.load()` 将 [<font color=blue> PAG 文件</font>](/docs/terms.html#pag-文件)解码成 `PAGFile` 对象：

``` javascript
const { PAGFile } = PAG; // 从 PAGInit 实例化得到的 PAG 对象
PAGFile.load(arrayBuffer).then(pagFile => {
  // 得到 PAGFile 对象
})
```

## 获取文件信息

获取 [<font color=blue> PAG 文件</font>](/docs/terms.html#pag-文件)尺寸：

``` javascript
const width = pagFile.width();
const height = pagFile.height();
```

获取 [<font color=blue> PAG 文件</font>](/docs/terms.html#pag-文件)时长：

``` javascript
const duration = pagFile.duration();
```

获取 [<font color=blue> PAG 文件</font>](/docs/terms.html#pag-文件)帧率：

``` javascript
const frameRate = pagFile.frameRate();
```

---
id: sdk-intergation
title: SDK 快速接入
---
---


## 移动端接入

### 个人信息保护规则
SDK的接入和使用请遵守 [<font color=blue>PAG SDK个人信息保护规则</font>](https://privacy.qq.com/document/preview/01e79d0cc7a2427ba774b88c6beff0fd)

### SDK 获取
最新 SDK：[<font color=blue>SDK下载页面</font>](https://github.com/tencent/libpag/releases)<br/>

其中企业版 SDK 包含 enterprise 字样，而社区版不包含该字样。<br/>

#### 社区版功能后缀:
- 无后缀。无后缀版本为full版本，内部包含软件解码器，当硬解失败时使用。 
- noffavc。后缀为noffavc版本内部不包含软件解码器，支持解码器外部注入。iOS由于硬件解码器效果优异，full版本也不带ffavc，因此不提供本版本。

#### 企业版功能后缀:
- 无后缀。无后缀版本为基础版本，不包含 Movie 模块，不支持多字节 emoji，包含高阶 AE 特性。iOS额外支持多字节 emoji 的能力。
- noffavc。后缀为noffavc，不包含 Movie 模块和多字节 emoji 能力、内部不包含软件解码器，支持解码器外部注入。iOS由于硬件解码器效果优异，基础版本已经不包含ffavc，因此不需要单独提供noffavc版本。
- movie。后缀为movie，包含音频播放、[<font color=blue>占位图</font>](/docs/terms.html#占位图)一键替换视频、导出视频文件和高阶 AE 特性以及多字节 emoji 的能力。

和社区版本不同的是，企业版本的接入需要 [<font color=blue>SDK鉴权</font>](/docs/sdk-authorization.html)

#### 平台说明：
 - Android 端 SDK 为 aar 文件，支持 armeabi、armv7a、arm64
 - iOS 端 SDK 为 framework 文件，提供动态库完整版本（arm64、模拟器 x84_64/arm 64）

### Android端接入

#### 基本要求
+ **支持android 4.4及以上系统**
+ **推荐使用gradle 3.0及以上版本编译**

#### aar接入
   1. 将libpag的aar文件放置在android工程项目的libs目录下
   2. 添加添加aar库依赖<br/>
   在app的gradle文件app/build.gradle，添加libpag的库依赖
   
```
	android {
	    repositories {
        flatDir {
            dirs 'libs'
        }
    }
	
	dependencies {
	    //libpag的核心库
	    //将 libpag_enterprise_4.2.41_android_armeabi_armv7a_arm64v8a.aar 换成你下载的 aar 文件名
    	implementation(name: 'libpag_enterprise_4.2.41_android_armeabi_armv7a_arm64v8a.aar', ext: 'aar')
        implementation("androidx.exifinterface:exifinterface:1.3.3")
	}
	
``` 

**注意：** 需要在混淆列表里面，添加libpag的keep规则：
   
```
	-keep class org.libpag.** {*;}
	-keep class androidx.exifinterface.** {*;}
```
配置完以后，sync一下，再编译。<br/><br/>

#### maven接入

提供六个版本（以4.2.41版本为例）：

**企业基础版本**：com.tencent.tav:libpag-enterprise:4.2.41，不包含 Movie 模块，不支持多字节 emoji，包含高阶 AE 特性。

**企业 movie 版本**：com.tencent.tav:libpag-enterprise:4.2.41-movie，包含音频播放、[<font color=blue>占位图</font>](/docs/terms.html#占位图)一键替换视频、导出视频文件和高阶 AE 特性以及多字节 emoji 的能力。

**企业 noffavc 版本**：com.tencent.tav:libpag-enterprise:4.2.41-noffavc，不包含 Movie 模块和多字节 emoji 能力、内部不包含软件解码器，支持解码器外部注入。

**社区基础版本** com.tencent.tav:libpag:4.2.41 不支持多字节 emoji，包含 PAG 的基础能力。

**社区 harfbuzz 版本** com.tencent.tav:libpag:4.2.41-harfbuzz 支持多字节 emoji 的能力。

**社区 noffavc 版本** com.tencent.tav:libpag:4.2.41-noffavc 不支持多字节 emoji，内部不包含软件解码器，支持解码器外部注入。

i. 在 root 工程目录下面修改 build.gradle 文件，增加**mavenCentral()**
   
```
buildscript {

    repositories {
		mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.2.1'
    }
}
	
``` 

ii. 在 app 的 gradle 文件 app/build.gradle，添加 libpag 的库依赖

基础版本：
```
	dependencies {
		//基础版本，如需保持最新版本，可以使用 latest.release 指代
		implementation 'com.tencent.tav:libpag-enterprise:latest.release'
	}
``` 
Movie版本：
```
	dependencies {
		// 使用movie版本，+movie后缀：
		implementation 'com.tencent.tav:libpag-enterprise:4.2.41-movie'
	}
``` 
noffavc版本：
```
	dependencies {
		// 使用noffavc版本，+noffavc后缀：
		implementation 'com.tencent.tav:libpag-enterprise:4.2.41-noffavc'
	}
``` 

**注意：** 需要在混淆列表里面，添加 libpag 的 keep 规则：
   
```
	-keep class org.libpag.** {*;}
	-keep class androidx.exifinterface.** {*;}
```
配置完以后，sync 一下，再编译。<br/><br/>


### iOS端接入

#### 基本要求<br/>

- **支持iOS9及以上** 
- **需要使用Xcode11.0及以上版本进行编译**

#### Framework接入<br>
   1. 将 libpag 的 framework 文件 libpag.xcframework 和 FFMovie.xcframework(movie版本需要) 放置在iOS工程项目目录下。
   2. 在项目工程中，配置所使用 Target 的 General->Embedded Binaries，添加 libpag.xcframework 和 FFMovie.xcframework(movie版本需要) 。
   3. 由于 libpag 暂时不支持 Bitcode，需要配置 Build Settings->Build Options->Enable Bitcode 为 No

#### cocoapods接入<br>
修改App目录下的Podfile文件，添加相应的libpag的引用.

下面以 4.2.41 为例，业务请根据需要选择对应的版本。

企业movie版本：
```
	pod 'libpag-enterprise', '4.2.41-movie'
```

企业基础版本：
```
	pod 'libpag-enterprise', '4.2.41'
```

社区版本：
```
	pod 'libpag', '4.2.41'
```

**注意：** 最新SDK版本请参考：[<font color=blue>SDK下载页面</font>](https://github.com/tencent/libpag/releases)<br/>

## 桌面端接入

### 接入方式
桌面端（macOS、Windows、Linux）暂不提供统一的制品库，需要开发者根据源码自行构建，但我们会提供编译指引。PAG是跨平台的，不同平台之间的API接口具有一致性。

具体原因如下：
1. Windows端没有统一的UI框架；<br/>
2. Linux端由于服务端CPU型号或系统版本的差异，统一的制品库难以完全兼容

#### 源码下载
PAG 的主体实现位于 C++ 层代码，平台侧为 PAG 的绘制提供渲染环境，因此所有的代码都位于 github 仓库
[<font color=blue>https://github.com/tencent/libpag</font>](https://github.com/tencent/libpag)

源码下载后需要拉取第三方库依赖

#### macOS 和 Linux 平台：
 ```
   ./sync_deps.sh
 ```

#### 其它平台：
```
   npm install -g depsync
   depsync
```

在源码根目录下，有平台侧的文件夹，如 android、ios、web、linux、mac、 win 等，各平台侧的工程文件在这些目录下，工程文件均依赖仓库中的 C++ 主体代码。

### API接口使用
在PAG的源码工程中，C++层基本上所有对外提供的方法都进行了测试用例的覆盖，如果想了解具体方法的使用，查看相关测试用例是一种很便捷的途径。



### macOS端接入

#### 基本要求
+ **macOS 10.14 or later**

#### 编译构建
   macOS 端的项目工程位于源码根目录 mac 文件夹下，为 Xcode 工程，开发者可以自行构建




### Windows接入指南
#### 编译工具

* `Visual Studio` 最低版本要求 VS2015
* `Node.js` PAG依赖管理的基础
* `depsync` 用于PAG的依赖管理


#### 环境准备

1. 从[<font color=blue>Node.js</font>](https://nodejs.org/en/)官网获取并安装 Node.js
2. 通过 npm 安装
    ```
    npm install depsync -g
    ```


##### 运行Demo

1. 执行`libpag\win\Win32Demo.sln`启动 Demo 工程
2. 运行 Demo。首次执行时会同步依赖和编译 PAG，会比较耗时
3. 随 Demo 构建的 pag.lib 是 release 的，需要构建 debug 版可以参考下边的指引


##### 使用PAG【Angle backend】

1. 首次运行时，在`libpag`根目录下执行
    ```
    depsync
    ```

2. 在根目录执行 cmake-build 生成 PAG，会同时生成 32 位和 64 位的 pag.lib
    ```
    node .\vendor_tools\cmake-build pag -p win -o .\win\paglib -v -i -DPAG_BUILD_SHARED=OFF
    ```
    * `-p` platform，在Windows下选择`win`
    * `-o` output，指定输出目录
    * `-i` incremental，增量编译开关，关闭时会清理编译目录
    * `-d` debug，debug开关
    * `-v` verbose，详细打印日志
    * `DPAG_BUILD_SHARED` 动态库编译开关
   

3. 头文件位置
    ```
    libpag\include
    ```

4. 在自己的工程内使用的时候，还需要在`工程属性->链接器->输入->附加依赖项`中添加两个系统库
    ```
    Bcrypt.lib
    ws2_32.lib
    ```

5. 在使用 Angle backend 时，可执行程序需要链接 Angle 动态库
    ```
    libpag\vendor\angle\win\
    ```

##### 使用PAG【QT backend】

- Demo的位置在
    ```
    libpag\qt
    ```
- 请提前安装好 VS2019 版本，至少必须同时安装 **[使用 C++ 的桌面开发]** 和 **[通用 Windows 平台开发]** 两个子模块。
- 在 CLion 的选项菜单里搜索 **ToolChain** ，设置默认编译工具为 Visual Studio，并选择 **amd64** 架构。
- 用 CLion 打开根目录下的 qt 文件夹，首次刷新会提示 QT SDK 找不到，请打开自动生成的 qt/QTCMAKE.cfg 配置文件，修改其中的 QT 路径为本地安装路径即可。例如：`C:/Qt/Qt5.13.0/5.13.0/msvc2017_64/lib/cmake`。
- 在 CLion 中打开 PAGViewer 目标的配置面板，在 Environment Variables 一行填入本地 QT 的 DLL 库路径，例如：`PATH=C:\Qt\Qt5.13.0\5.13.0\msvc2017_64\bin`。
- 最后编译并运行 PAGViewer 目标即可。



### Linux端接入
#### 基本要求
+ **gcc版本不低于7.0**

#### 编译构建
1. 开发者参照源码根目录下的 Linux_build.md 完成依赖环境的安装

2. 通过根目录下的 build_linux.sh 完成pag库文件的构建

3. 编译生成的头文件和库文件位于 linux/vendor 目录下

## Web 端接入

### 个人信息保护规则

SDK 的接入和使用请遵守 [<font color=blue>PAG SDK 个人信息保护规则</font>](https://privacy.qq.com/document/preview/01e79d0cc7a2427ba774b88c6beff0fd)

### 特性

- Web 平台能力适配，支持 libpag 全能力
- 基于 WebAssembly + WebGL

### 快速开始

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

### 多线程接入

接入多线程的 Web 端代码与单线程相同，但服务端要符合跨域安全性要求，具体要求可查看 [<font color=blue>多线程接入指南</font>](https://github.com/Tencent/libpag/blob/main/web/README.zh_CN.md#%E5%A4%9A%E7%BA%BF%E7%A8%8B%E6%8E%A5%E5%85%A5%E6%8C%87%E5%8D%97)

### 浏览器兼容性

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome for Android | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari on iOS | QQ Browser Mobile |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| Chrome >= 69                                                                                                                                                      | Safari >= 11.3                                                                                                                                                    | Android >= 7.0                                                                                                                                                                | iOS >= 11.3                                                                                                                                                              | last 2 versions   |

更多版本的兼容工作正在进行中

**以上的兼容表仅代表可以运行的兼容性。对于有移动端接入需要的用户，需要阅读一下这篇 [兼容性情况](/docs/web-sdk/web-features.html) 的文章**

### More

Web-lite：[<font color=blue>https://github.com/Tencent/libpag/tree/main/web/lite</font>](https://github.com/Tencent/libpag/tree/main/web/lite)

Github：[<font color=blue>https://github.com/Tencent/libpag/blob/main/web/README.md</font>](https://github.com/Tencent/libpag/blob/main/web/README.md)

Web demo：[<font color=blue>https://github.com/libpag/pag-web</font>](https://github.com/libpag/pag-web)


## 小程序端接入

### 个人信息保护规则

SDK 的接入和使用请遵守 [<font color=blue>PAG SDK 个人信息保护规则</font>](https://privacy.qq.com/document/preview/01e79d0cc7a2427ba774b88c6beff0fd)

> libpag-miniprogram 是 libpag 在微信小程序平台的 SDK
>
> 当前为 alpha 版本，欢迎使用与反馈🎉

### 特性

- Web 平台能力适配，支持 libpag 全能力
- 基于 WebAssembly + WebGL

### 快速开始

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

### More

lite版本：[<font color="blue">https://github.com/Tencent/libpag/tree/main/web/lite/wechat</font>](https://github.com/Tencent/libpag/tree/main/web/lite/wechat)
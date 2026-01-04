---
id: mobile-sdk-guide
title: 移动端接入指南
---
---

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


### DEMO下载

**企业版 iOS DEMO 下载:**

[<font color=blue>https://github.com/libpag/pag-enterprise-ios.git</font>](https://github.com/libpag/pag-enterprise-ios.git)

**企业版 Android DEMO 下载:**

[<font color=blue>https://github.com/libpag/pag-enterprise-android.git</font>](https://github.com/libpag/pag-enterprise-android.git)

**社区版 iOS DEMO下载:**

[<font color=blue>https://github.com/libpag/pag-ios.git</font>](https://github.com/libpag/pag-ios.git)

**社区版 Android DEMO下载:**

[<font color=blue>https://github.com/libpag/pag-android.git</font>](https://github.com/libpag/pag-android.git)

**社区版 Flutter Demo下载：**

[<font color=blue>https://github.com/libpag/pag-flutter.git</font>](https://github.com/libpag/pag-flutter.git)


### 测试素材
PAG动效测试素材下载：[<font color=blue> pag_files.zip </font>](https://pag.qq.com/file/pag_files.zip) 

接入使用过程若遇到问题请[<font color=blue>提交issue</font>](https://github.com/Tencent/libpag/issues/new/choose)<br/>

---
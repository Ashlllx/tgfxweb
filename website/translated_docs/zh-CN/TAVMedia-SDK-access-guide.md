---
id: TAVMedia-SDK-access-guide
title: TAVMedia 快速接入
---

## SDK 获取

[<font color=blue>Android 版 SDK</font>](https://github.com/TencentCloud/tavmedia-sdk-android)

[<font color=blue>iOS 版 SDK</font>](https://github.com/TencentCloud/tavmedia-sdk-ios)


## Android 端接入

### 基本要求
- 支持 android 4.4 及以上系统。

- 推荐使用 gralde 3.0 及以上版本编译。


### 接入方式

#### aar 接入
1. 将 tavmedia 的 aar 文件放置在 Android 工程目录的 libs 目录下。

2. 添加 aar 库依赖。

- 在 app 的 gradle 文件 `app/build.gradle` 中，添加如下 tavmedia 的库依赖。

   ``` java
   implementation fileTree(dir: 'libs', include: ['*.jar', '*.aar'])
   // aar方式依赖需要手动添加exifinterface和tavmedia_pag_decode的依赖
   implementation("androidx.exifinterface:exifinterface:2.0.15")
   implementation 'com.tencent.tav:tavmedia_pag_decode:1.0.0' // 如果项目同时依赖了libpag，不需要添加这行
   ```
- 在混淆列表中，添加以下 tavmedia 的 keep 规则。

   ``` bash
   -keep class com.tencent.tavmedia.**{*;}
   -keep class androidx.exifinterface.** {*;}
   -keep class org.libpag.** {*;}
   ```
3. 配置完成后，执行 sync 后再进行编译。


#### maven 接入
1. 在工程目录下修改 build.gradle 文件，增加 mavenCentral()。

   ``` java
   repositories {
     ...
     maven { url "https://mirrors.tencent.com/repository/maven/tencent_public" }    
     ...
    }
   ```
2. 添加依赖

- 在 app 的 gradle 文件 `app/build.gradle` 中，添加如下 tavmedia 的库依赖。

   ``` bash
   implementation "com.tencent.tav:tavmedia:2.0.12"
   ```
- 如果项目同时依赖了 libpag，则请使用如下依赖。

   ``` bash
   implementation('com.tencent.tav:tavmedia:2.0.12') {
       exclude group: 'com.tencent.tav', module: 'tavmedia_pag_decode'
   }
   ```
- 在混淆列表中，添加如下 tavmedia 的 keep 规则。

   ``` bash
   -keep class com.tencent.tavmedia.**{*;}
   -keep class androidx.exifinterface.** {*;}
   -keep class org.libpag.** {*;}
   ```

## iOS 端接入

### 基本要求
- 支持 iOS 9 及以上。

- 需要使用 Xcode11.0 及以上版本进行编译。


### 使用 CocoaPods
1. 在终端窗口中执行如下命令，安装 CocoaPods。
   

   > **说明：**
   > 

   > 执行命令前需在 Mac 中安装 Ruby 环境。
   > 

   ``` bash
   sudo gem install cocoapods
   ```
2. 进入项目所在路径，执行以下命令创建 Podfile 文件。

   ``` bash
   pod init
   ```
3. 根据您的项目需要选择合适的版本，按照以下方式编辑 Profile 文件。

   ``` bash
   platform :ios, '8.0'
   target 'App' 
   dopod 'TAVMedia'
   end
   ```
4. 在终端窗口中执行以下命令，以更新本地库文件，并安装 SDK。

   ``` bash
   pod install
   ```

   pod 命令执行完后，会生成集成了 SDK 的 .xcworkspace 后缀的工程文件，双击打开即可。

5. 将 Bundle Identifier 修改成与申请的测试授权一致。


### 下载 SDK 并手动导入
1. 下载并解压 [<font color=blue>SDK 库文件</font>](https://github.com/TencentCloud/tavmedia-sdk-ios)。

2. 打开您的 Xcode 工程项目，将文件夹中的 framework 添加到实际工程中。

3. 选择要运行的 TARGETS，选择 **General**，并展开 **Frameworks,Libraries,and Embedded Content** 项，单击展开项中的 `+` 号图标以添加依赖库。依次添加下载的 `TAVMedia.xcframework` 和 `FFmpeg.xcframework`。如下图所示：</br>
   <img src="/img/docs/jieru11.png" alt="img" style="zoom:50%;margin: 32px 0 48px 0;" /></br>



4. 由于 TAVMedia 暂时不支持 Bitcode，需要配置 **Build Settings** > **Build Options** > **Enable Bitcode** 为 No。

5. 将 Bundle Identifier 修改成与申请的测试授权一致。


## TAVMedia SDK License 指引

TAVMedia License 提供了鉴权功能，购买相应套餐之后获取正式版 License ，可以获得一年的使用权。若无 License 文件进行授权操作，则预览和导出画面上将带有水印。

本文将对 License 文件的新增、鉴权及常见问题进行说明指引。

## 获取 License

联系商务，选择购买 SDK，并获取正式版 License 使用授权（有效期1年至到期次日00:00:00为止）。

购买成功后会提供 License 文件的 URL 下载地址和密钥 Key。在应用中通过 URL 链接下载对应的 License 文件到本地进行鉴权验证

## License 鉴权

TAVMedia SDK 中提供了鉴权的对应的 API ，请按需选择：

### Android
``` java
String licenseUrl = "replace_your_license_url";
String licenseAppId = "replace_your_app_id";
String licenseKey = "replace_your_key";

licenseAuthListener = (errorCode, msg) -> {
    if (errorCode == TAVLicense.LICENSE_AUTH_SUCCESS) {
        Log.d("export", "auth success " + msg);
    } else {
        Log.e("export", "auth failed and errorCode is " + errorCode + " " + msg);
    }
};

TAVLicense.getInstance().Auth(getBaseContext(), licenseUrl, licenseKey, licenseAppId, licenseAuthListener);
```

核心接口类 TAVLicense 提供了鉴权方法 `Auth()`。
``` java
public void Auth(Context context, String url, String key, String appId, TAVLicenseAuthListener listener)
```

参数含义如下：
<table>
<tr>
<td rowspan="1" colSpan="1" >参数</td>

<td rowspan="1" colSpan="1" >含义</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >context</td>

<td rowspan="1" colSpan="1" >上下文</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >url</td>

<td rowspan="1" colSpan="1" >License 链接地址</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >key</td>

<td rowspan="1" colSpan="1" >密钥</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >appId</td>

<td rowspan="1" colSpan="1" >授权时提供的 AppID</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >listener</td>

<td rowspan="1" colSpan="1" >鉴权结果对应的回调，返回相应错误码</td>
</tr>
</table>


### iOS
``` objectivec
NSString *licenseUrl = @"replace_your_license_url";
NSString *licenseAppId = @"replace_your_app_id";
NSString *licenseKey = @"replace_your_key";
id<TAVLicenseAuthListener> listener = replace_your_Listener;
[TAVLicense Auth:licenseUrl key:licenseKey appID:licenseAppId listener:listener];
```

核心接口类 TAVLicense 提供了鉴权方法 `Auth()`。
``` objectivec
@interface TAVLicense : NSObject
+ (void)Auth:(NSString *)url key:(NSString *)key appID:(NSString *)appID listener:(id<TAVLicenseAuthListener>)listener;
@end
```

参数含义如下：
<table>
<tr>
<td rowspan="1" colSpan="1" >参数</td>

<td rowspan="1" colSpan="1" >含义</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >url</td>

<td rowspan="1" colSpan="1" >License 链接地址</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >key</td>

<td rowspan="1" colSpan="1" >密钥</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >appId</td>

<td rowspan="1" colSpan="1" >授权时提供的 AppID</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >listener</td>

<td rowspan="1" colSpan="1" >鉴权结果对应的回调，返回相应错误码</td>
</tr>
</table>


TAVLicenseAuthListener 协议会返回鉴权之后的结果，您可参考 [错误码](https://write.woa.com/document/88734190824157184) 了解返回结果信息。
``` c
@protocol TAVLicenseAuthListener <NSObject>
- (void)onLicenseAuthResult:(TAVLicenseAuthResult)result msg:(NSString *)msg;
@end
```

### 错误码
<table>
<tr>
<td rowspan="1" colSpan="1" >错误码</td>

<td rowspan="1" colSpan="1" >含义</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >0</td>

<td rowspan="1" colSpan="1" >鉴权成功</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >-1</td>

<td rowspan="1" colSpan="1" >参数错误</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >-2</td>

<td rowspan="1" colSpan="1" >APPID 错误</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >-3</td>

<td rowspan="1" colSpan="1" >包名错误</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >-4</td>

<td rowspan="1" colSpan="1" >时间过期</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >-5</td>

<td rowspan="1" colSpan="1" >解密失败</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >-6</td>

<td rowspan="1" colSpan="1" >License 文件不存在</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >-7</td>

<td rowspan="1" colSpan="1" >License 下载出错</td>
</tr>
</table>


## License 续期

License 到期之后需要在控制台进行续费和更新，然后再次进行鉴权操作。

## 相关问题

#### 如何获取正式版 License？

若您需在业务中使用 TAVMedia SDK 功能，请联系商务，根据您的需求选择 SDK 套餐进行购买。

购买后即可获取 License，在通过控制台将 License 绑定后，即可使用相应功能。

#### License 的有效期是多长？过期后如何更新 License？

TAVMedia License 的有效期是创建成功后，从签发 License 日起计算一年（365天）的时长。例如，您在2022年01月01日申请并创建成功正式版 License，正式版 License 将在2023年01月02日的00:00:00过期。

正式版 License 过期后需要重新购买新的 License 进行续期。

#### License 支持的包名个数是多少？授权台数是多少？

目前单个 License 仅支持一个包名，但对授权终端的台数无限制。



## TAVMedia SDK Demo 体验

TAVMedia SDK 分为试用版和正式版
试用版 SDK Demo 提供 TAVMedia 的具体场景应用，帮助您快速开发视频编辑、模板应用、特效添加的短视频 App。您可以在下方卡片中获取源码 Demo， 并参考 接入指引 进行接入。

请参考以下链接下载源码：

[<font color=blue>iOS 源码</font>](https://github.com/TencentCloud/tavmedia-sdk-ios)

[<font color=blue>Android 源码</font>](https://github.com/TencentCloud/tavmedia-sdk-android)
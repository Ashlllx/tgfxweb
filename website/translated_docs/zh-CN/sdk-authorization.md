---
id: sdk-authorization
title: 企业版 SDK 鉴权
---
---

使用 PAG 企业版 SDK 需要先进行鉴权，在 APP 的生命周期中，鉴权只需要执行一次。

如果企业版 SDK 尚未鉴权或鉴权失败，画面会显示一个不断运动的“正在使用未授权的 PAG 企业版 SDK Unauthorized PAG Enterprise SDK”水印标签。

使用方应当保证在使用 PAG 之前完成鉴权，否则会显示带水印的画面。如果 PAG 已经显示了水印，在鉴权成功后，水印会自动消失。

## 使用流程
### 1、获取 License
进入 [<font color=blue> PAG企业版购买咨询 </font>](https://pag.io/product.html#pag-enterprise-edition) 联系我们购买 SDK，并获取正式版 License 使用授权。

购买成功后会提供 License 文件、Key 和 AppID。通过 License 文件、Key 和 AppID 使用 SDK 可以鉴权验证。

### 2、调用鉴权接口

SDK 提供了两个鉴权接口，支持使用方传入 license 本地文件路径或者 license 二进制数据。

如果您担心 License 维护管理与更新出差池，导致出现问题，或者不想维护管理 License，PAG 企业版也提供企业高级版，进入 [<font color=blue> PAG企业版购买咨询 </font>](https://pag.io/product.html#pag-enterprise-edition) 联系我们购买高级版 SDK。
使用企业高级版，则无需调用任何接口，SDK 内部会自动鉴权。


代码示例

Android

```java
    String licenseAppId = "replace_your_app_id";
    String licenseKey = "replace_your_key";
    String sdkLicenseFilePath = "replace_your_license_file_path";
    // 通过文件路径
    int result = PAGLicenseManager.LoadSDKLicense(context, sdkLicenseFilePath, licenseAppId, licenseKey);
    // 通过 bytes
    File file = new File(sdkLicenseFilePath);
    byte[] bytes = Files.readAllBytes(file.toPath());
    int result2 = PAGLicenseManager.LoadSDKLicense(context, bytes, licenseAppId, licenseKey);
    // 通过 result 判断结果
    if (result == PAGLicenseManager.LicenseResultSuccess) {
        // 鉴权成功
    }
```

iOS

```objectivec
    NSString *sdkPath = @"replace your license path";
    NSString *key = @"replace your key";
    NSString *appID = @"replace your app id";
    // 方式1 通过路径鉴权
    PAGLicenseResult result = [PAGLicenseManager LoadSDKLicense:sdkPath key:key appID:appID];
    
    // 方式2 通过 Data 鉴权
    NSData* licenseData = [self LoadLicenseData];
    [PAGLicenseManager LoadSDKLicense:licenseData.bytes length:licenseData.length key:key appID:appID];
```

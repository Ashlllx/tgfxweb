---
id: export-video
title: 渲染导出视频
---
---

PAG SDK 是一个特效渲染组件，专注于特效渲染，社区版不会处理音视频相关内容。如果需要渲染导出视频的功能，可以使用 PAG 企业版。
包含 Movie 功能的 PAG 企业版（包名带有 movie 后缀）支持加载 PAGComposition 实例导出成视频。


## 使用流程
### 1、构建 PAGComposition 实例
通过 PAGFile 的 load 接口或者 PAGComposition 的 Make 接口创建 PAGComposition 实例，然后执行编辑文本和替换占位图等操作。
需要注意的是，同一个 PAGComposition 实例不能同时复用于多个渲染场景，如果同一个 PAGComposition 同时用于 PAGView 渲染播放和导出视频。

代码示例


Android:
```Java
private static PAGComposition createComposition() {
    // 构建新的 composition 实例，再将替换到 compositionForPlayer 的 PAGImage，重新替换到新实例中
    PAGFile composition = PAGFile.Load(PAG_FILE_PATH);
    for (int i = 0; i < selectVideos.size() && i < composition.numImages(); i++) {
        // 获取需要替换的图片、视频
        PAGMovie movie = PAGMovie.MakeFromFile(selectVideos.get(i));
        // 替换到 Composition 中
        composition.replaceImage(i, movie);
    }
    return composition;
}

private void export() {
    PAGComposition exportComposition = createComposition();
    ...
}

private void display() {
    PAGComposition previewComposition = createComposition();
    ...
}
```

iOS:
```objectivec
- (PAGComposition*)createComposition {
  NSString* pagPath = [[NSBundle mainBundle] pathForResource:fileName ofType:extension];
  // 构造 Composition
  PAGFile* file = [PAGFile Load:pagPath];
  if (file == nil) {
    return nil;
  }
  for (int i = 0; i < self.replaceMovies.count; i++) {
    // 获取需要替换的图片、视频
    NSString* moviePath = self.replaceMovies[i];
    PAGMovie* movie = [PAGMovie MakeFromFile:moviePath];
    // 替换到 Composition 中
    [file replaceImage:i data:movie];
  }
  return file;
}

- (void)export {
  PAGComposition* exportComposition = [self createComposition];
  ……
}

- (void)display {
  PAGComposition* exportComposition = [self createComposition];
  ……
}


```

### 2、构建 PAGMovieExporter 实例

PAGMovieExporter 是导出逻辑的核心类，构造时需要传入 PAGComposition 实例、ExportConfig 和 Callback。
其中，ExportConfig 用于配置导出参数，例如分辨率、输出路径等参数；Callback 用于异步接收信息回调。稍后会详细讲解 Callback。

需要注意的是，为了防止内存泄漏，SDK 将在 PAGMovieExporter 对象被销毁时释放相关资源。使用方需要在导出任务执行完成前持有 PAGMovieExporter 对象，以正常接收回调。同时，每次导出建议重新创建 PAGMovieExporter 实例，以免产生错误。

目前，PAGMovieExporter 只支持导出 h264格式的 mp4和 mov 文件。

代码示例

Andoird:
```Java
/**
 * 需要持有 PAGExportSession 实例，保证在导出任务完成前不被释放
 */
private PAGExportSession exporter;

private void export(PAGComposition composition) {
    PAGExportSession.Config config = new PAGExportSession.Config();
    config.width = composition.width();
    config.height = composition.height();
    config.outputPath = "/sdcard/pag_commerce_demo/pag_export/output.mp4";

    exporter = new PAGExportSession(pagFile, config, new MyCallback());
}
```

iOS:
```objectivec
// 创建默认导出配置
  PAGExportConfig* config = [PAGExportConfig new];
  // 设置路径
  config.outputPath =
      [[NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES) firstObject]
          stringByAppendingString:@"/tmp.mp4"];
  config.width = exportComposition.width;
  config.height = exportComposition.height;
  config.frameRate = exportComposition.frameRate;
  PAGMovieExporter* exporter = [PAGMovieExporter Make:exportComposition config:config callback:self];
  self.exporter = exporter;
```

### 3、启动导出/取消导出

调用 start 接口将启动导出任务。因为 start 接口会初始化编码器，通常会有一定耗时，如果使用方担心 start 耗时引起主线程卡顿，可以将 start 放在异步线程执行。

代码示例

Android:
```Java
exporter.start();
```

iOS:

```objectivec
[exporter start];
```

如果在导出任务执行过程中，需要取消，可以直接调用 cancel 方法，此时 cancel 方法会立即返回，但此时导出任务还不会中断，请勿立即执行删除导出文件操作，需要等到 Callback 回调 Canceled 状态后，导出才正式停止。

代码示例

Android:
```Java
// 调用 cancel 方法后，需要等待 SDK 回调 Canceled 后，再进行文件删除等操作
exporter.cancel();
```

iOS:

```objectivec
// 调用 cancel 方法后，需要等待 SDK 回调 Canceled 后，再进行文件删除等操作
[self.exporter cancel];
```

### 4、回调监听
导出回调，用于异步接收导出进度、状态变化的回调。

Status 说明：

* Exporting：任务进行中，此状态下，SDK 将通过 Callback.onProgress 接口回调实时进度
* Failed：导出失败，Session 结束
* Canceled：任务取消，Session 结束
* Complete：导出完成，Session 结束，此时可以处理导出的视频文件。
* UnKnow：未知状态，可视同 Failed，请向我们反馈。

Android:
```java
private class MyCallback implements PAGExportSession.Callback {

    @Override
    public void onProgress(final float progress) {
        Log.d(TAG, "onProgress() called with: progress = [" + progress + "]");
        runOnUiThread(() -> dialog.setProgress((int) (progress * 100)));
    }

    @Override
    public void onStatusChange(Status status, String[] msg) {
        Log.d(TAG, "onStatusChange: status = [" + status + "], msg = [" + Arrays.toString(msg) + "]");
        switch (status) {
            case Exporting:
                // do nothing
                break;
            case UnKnow:
            case Failed:
            case Canceled:
            case Complete:
              runOnUiThread(() -> {
                  // exporter.release()，及时释放内存, 不能在 onStatusChange 直接调用，因为 exporter 持有 callback 生命周期
                  exporter.release();
                  exporter = null;
                  dialog.dismiss();
              });
                break;
        }
    }
}
```

iOS:
```objectiveC

- (void)onProgress:(CGFloat)progress {
  [self.exportProgressView setProgress:progress];
}

- (void)onStatusChange:(PAGExportStatus)status msgs:(NSArray<NSString*>*)msgs {
  if (status == PAGExportStatusComplete || status == PAGExportStatusFailed ||
      status == PAGExportStatusCanceled) {
    // 移除进度条
    [self.exportProgressView removeFromSuperview];
    self.exportProgressView = nil;
    self.exporter = nil;
  }
  if (status == PAGExportStatusComplete) {
    UIAlertController* alert =
        [UIAlertController alertControllerWithTitle:@"导出结束"
                                            message:@""
                                     preferredStyle:UIAlertControllerStyleAlert];
    [alert addAction:[UIAlertAction actionWithTitle:@"确定"
                                              style:UIAlertActionStyleDefault
                                            handler:nil]];
    // 弹出提示框
    [self presentViewController:alert animated:true completion:nil];
  }
}


```

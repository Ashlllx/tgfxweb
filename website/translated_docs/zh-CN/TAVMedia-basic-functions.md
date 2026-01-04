---
id: TAVMedia-basic-functions
title: 常用 API 解读
---

## TAVMedia 鉴权

使用 TAVMedia SDK 需先进行鉴权，鉴权在 App 启动过程中仅需进行一次，建议在 App 启动的回调中进行。具体鉴权操作请参见 License 指引 。如果尚未鉴权或鉴权失败，画面会显示一个不断运动的标签。

## 基础功能

TAVMedia SDK 主要功能由 TAVClip、TAVSurface、TAVVideoReader 和 TAVAudioReader 构成。

### TAVClip

TAVClip 是播放数据的结构，用于描述播放内容、出现时间及出现位置。Clip 种类主要包括以下两种：
- 媒体 Media 类型：通常可以直接播放，包括 Audio（音频类）、Movie（视频类）、Composition（容器类）和 PAGSticker（PAG贴纸）。

- Effect 类型：用于对 Clip 进行特效处理，包括音频淡入淡出、Clip 位置变换、PAG 效果、LUT、饱和度亮度调节等。


### TAVSurface

TAVSurface 是渲染画布，用于最终呈现画面，在 iOS 中可以通过 CAEAGLLayer 和 CVPixelBuffer 创建。

### TAVVideoReader

TAVVideoReader 是渲染控制器，用于控制绘制进度，与 TAVSurface 共同控制 TAVClip 的画面播放。

## 使用 TAVMedia 渲染视频




【Android】
``` java
//在 Android 中继承自 TextureView 控件实现 TAVTextureView 控件，通过 TextureView 中的 SurfaceTexture 创建 TAVSurface ，并将画面渲染在 TAVSurface 上。TAVTextureView 的实现如下：

public class TAVTextureView extends TextureView implements TextureView.SurfaceTextureListener {

    private static final String TAG = "TAVTextureView";
    private final int fps = 20;
    private final int frameDuration = 1000 / fps;
    private boolean isAttachedToWindow = false;
    private TAVSurface mediaSurface;
    private TAVVideoReader videoReader;
    private TAVMovie media;
    private boolean isPlaying = false;

    public TAVTextureView(Context context) {
        this(context, null);
    }

    public TAVTextureView(Context context, AttributeSet attrs) {
        super(context, attrs);
        setOpaque(false);
        setSurfaceTextureListener(this);
        setKeepScreenOn(true);
    }

    @Override
    public void onSurfaceTextureAvailable(SurfaceTexture surface, int width, int height) {
        if (mediaSurface != null) {
            mediaSurface.release();
            mediaSurface = null;
        }
        if (videoReader != null) {
            videoReader.release();
            videoReader = null;
        }
		// 通过 SurfaceTexture 创建 TAVSurface 
        mediaSurface = TAVSurface.FromSurfaceTexture(surface);
        if (!isPlaying) {
            play();
        }
    }

    public void setMedia(TAVMovie media) {
        this.media = media;
    }

    @Override
    public void onSurfaceTextureSizeChanged(SurfaceTexture surface, int width, int height) {

    }

    @Override
    public boolean onSurfaceTextureDestroyed(SurfaceTexture surface) {
        if (isPlaying) {
            stop();
        }
        if (mediaSurface != null) {
            mediaSurface.release();
            mediaSurface = null;
            videoReader = null;
        }
        if (videoReader != null) {
            videoReader.release();
            videoReader = null;
        }
        if (!isPlaying) {
            stop();
        }
        return false;
    }

    @Override
    public void onSurfaceTextureUpdated(SurfaceTexture surface) {
    }

    @Override
    protected void onAttachedToWindow() {
        isAttachedToWindow = true;
        super.onAttachedToWindow();
    }

    @Override
    protected void onDetachedFromWindow() {
        isAttachedToWindow = false;
        super.onDetachedFromWindow();
    }

    public boolean isPlaying() {
        return isPlaying;
    }

    public void stop() {
        isPlaying = false;
    }

    public void play() {
        if (!isAttachedToWindow) {
            return;
        }
        isPlaying = true;
        new Thread(new RenderRunnable(), "tav_demo_play_thread").start();
        new Thread(new AudioRenderRunnable(), "tav_demo_play_audio_thread").start();
    }

    private class RenderRunnable implements Runnable {

        @Override
        public void run() {
            if (mediaSurface == null) {
                return;
            }
            videoReader = TAVVideoReader.Make(media, fps);
            if (videoReader == null) {
                return;
            }
            videoReader.setSurface(mediaSurface);
            runLoop(videoReader);
        }

        private void runLoop(TAVVideoReader videoReader) {
            while (isPlaying()) {
                long startTime = System.currentTimeMillis();
                videoReader.readNextFrame();
                long timeCons = System.currentTimeMillis() - startTime;
                Log.d(TAG, "video read: timeCons = " + timeCons);
                if (timeCons < frameDuration) {
                    trySleep(frameDuration - timeCons);
                }
            }
        }

        private void trySleep(long millis) {
            try {
                Thread.sleep(millis);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    private class AudioRenderRunnable implements Runnable {

        @Override
        public void run() {

            TAVAudioReader audioReader = TAVAudioReader.Make(media);
            AudioTrackWrapper audioTrackWrapper = new AudioTrackWrapper(44100, 2);
            audioTrackWrapper.setVolume(1);
            // 开始
            runLoop(audioReader, audioTrackWrapper);
            // 结束
            audioTrackWrapper.release();
        }

        private void runLoop(TAVAudioReader audioReader, AudioTrackWrapper audioTrackWrapper) {
            if (audioReader == null || audioTrackWrapper == null) {
                return;
            }
            while (isPlaying()) {
                long startTime = System.currentTimeMillis();
                TAVAudioFrame frame = audioReader.readNextFrame();
                audioTrackWrapper.writeData(frame.data, 0, (int) frame.length);
                long timeCons = System.currentTimeMillis() - startTime;
                Log.i(TAG, "audio read: timeCons = " + timeCons + ", timestamp = " + frame.timestamp + ", duration = "
                        + frame.duration);

                long frameDurationMs = frame.duration / 1000;
                if (timeCons < frameDurationMs) {
                    trySleep(frameDurationMs - timeCons);
                }
            }
        }

        private void trySleep(long millis) {
            try {
                Thread.sleep(millis);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

//构建渲染结构 Composition 以及执行渲染如下：
// 创建渲染结构
TAVComposition makeComposition(){
    long totalDuration = 3 * 1000 * 1000;
    int maxWidth = 0;

    TAVMovieAsset movieAsset = TAVMovieAsset.MakeFromPath(Utils.OUT_SAVE_DIR + "video-640x360.mp4");
    TAVMovie movie = TAVMovie.MakeFrom(movieAsset,0,totalDuration);

    movie.setStartTime(0);
    movie.setDuration(totalDuration);

    maxWidth = movieAsset.width();

    TAVImageAsset imageAsset = TAVImageAsset.MakeFromPath(Utils.OUT_SAVE_DIR + "hermione.jpg");
    TAVMovie imageMovie = TAVMovie.MakeFrom(imageAsset,0,totalDuration);
    imageMovie.setStartTime(0);
    imageMovie.setDuration(totalDuration);
    Matrix matrix = new Matrix();
    matrix.postTranslate(0,movieAsset.height() + 10);
    imageMovie.setMatrix(matrix);

    maxWidth = Math.max(maxWidth,imageAsset.width());

    TAVComposition composition = TAVComposition.Make(maxWidth,movieAsset.height() + imageAsset.height() + 10,0,totalDuration);
    composition.addClip(movie);
    composition.addClip(imageMovie);
    composition.setDuration(totalDuration);
    return composition;
}

// 渲染执行
DisplayMetrics displayMetrics = new DisplayMetrics();
getWindowManager().getDefaultDisplay().getMetrics(displayMetrics);

TAVComposition composition = makeComposition();

Utils.fitToTarget(composition, displayMetrics.widthPixels, displayMetrics.heightPixels);

textureView.setMedia(composition);
```


【iOS】
``` objectivec
//  创建渲染目标
- (TAVSurface*)createSurfaceWithCALayer {
    // 创建CAEAGLLayer并添加到view中
    self.glLayer = [CAEAGLLayer layer];
    self.glLayer.frame = CGRectMake(0, 0, self.view.bounds.size.width, self.view.bounds.size.height);
    self.glLayer.drawableProperties = @{ kEAGLDrawablePropertyRetainedBacking: @NO, kEAGLDrawablePropertyColorFormat: kEAGLColorFormatRGBA8 };
    [self.view.layer addLayer:self.glLayer];

    // 基于layer创建TAVSuface可以快速上屏
    return [TAVSurface FromLayer:self.glLayer];
}

+ (CVPixelBufferRef)createPixelBuffer:(NSInteger)width height:(NSInteger)height {
    if (width == 0 || height == 0) {
        return nil;
    }
    CFDictionaryRef empty = CFDictionaryCreate(kCFAllocatorDefault, NULL, NULL, 0, &kCFTypeDictionaryKeyCallBacks, &kCFTypeDictionaryValueCallBacks);
    CFMutableDictionaryRef attrs
        = CFDictionaryCreateMutable(kCFAllocatorDefault, 1, &kCFTypeDictionaryKeyCallBacks, &kCFTypeDictionaryValueCallBacks);
    CFDictionarySetValue(attrs, kCVPixelBufferIOSurfacePropertiesKey, empty);
    CVPixelBufferRef pixelBuffer = nil;
    CVReturn status = CVPixelBufferCreate(kCFAllocatorDefault, width, height, kCVPixelFormatType_32BGRA, attrs, &pixelBuffer);
    CFRelease(attrs);
    CFRelease(empty);
    if (status != kCVReturnSuccess) {
        return nil;
    }
    CFAutorelease(pixelBuffer);
    return pixelBuffer;
}

- (TAVSurface*)createSurfaceWithPixelBuffer {
    // 通过pixelBuffer创建离屏的surface，后续内容会绘制到pixelBuffer上
    // 通过pixelBuffer可以快速将TAVMedia嵌入业务已有的渲染链中
    CVPixelBufferRef pixelBuffer = [self createPixelBuffer:movie.width height:movie.height];
    return [TAVSurface FromCVPixelBuffer:pixelBuffer];
}

// 创建渲染结构
- (TAVMovie *)makeMovie {
    // TAVMedia时间数据都以微秒为单位，totalDuration在TAVMedia中实际表示为3秒
    NSInteger totalDuration = 3 * 1000 * 1000;
    // 构造需要播放的视频结构
    NSString *movieFilePath = [[NSBundle mainBundle] pathForResource:@"video-640x360" ofType:@"mp4"];
    // asset是所需要的资源数据
    TAVMovieAsset *movieAsset = [TAVMovieAsset MakeFromPath:movieFilePath];
    // movie继承自clip，表示asset的一个片段，用于在VideoReader/AudioReader中进行播放
    // MakeFrom中startTime表示movie在asset中的开始时间，duration表示movie在asset中的截取时长
    // Make构造时的startTime和duration目前没有提供修改接口
    TAVMovie *movie = [TAVMovie MakeFrom:movieAsset startTime:0 duration:totalDuration];
    // 与Make函数中不同，setStartTime表示的是在父级composition容器中的开始时间，不再是表示asset的开始时间
    [movie setStartTime:0];
    // 与Make函数中不同，setDuration表示的是在父级composition容器中的时长，不再是表示asset的截取时长
    [movie setDuration:totalDuration];
    return movie;
}

// 构建渲染控制器
- (void)setupVideoReader {
    self.movie = [self makeMovie];
    // 构建videoReader，用于控制视频的播放，frameRate可以根据业务的需求进行设置
    self.videoReader = [TAVVideoReader MakeFrom:self.movie frameRate:60];
    // 设置缩放模式，让视频在surface中居中，注意:ScaleMode会覆盖Movie的matrix
    [self.videoReader setScaleMode:TAVScaleModeLetterBox];
    // 构建surface，用于给videoReader提供显示目标
    // 如果希望嵌入到已有渲染链中，可以使用[self createSurfaceWithPixelBuffer]
    self.surface = [self createSurfaceWithCALayer];
    [self.videoReader setSurface:self.surface];
    
    // 绘制第0秒
    [self displayFirstFrame];
}

- (void)displayFirstFrame {
    // 渲染第0秒画面
    // seek到第0秒
    [self.videoReader seekTo:0];
    // 当调用seekTo后，readNextFrame会渲染seekTo的当前帧数据
    // 当未调用seekTo时，每次readNextFrame会使videoReader内部的时间按照帧率自增
    // readNextFrame调用后，内容会绘制到surface
    [self.videoReader readNextFrame];
}
```

## 使用 TAVMedia SDK 获取音频数据




【Android】
``` java
TAVAudioReader audioReader = TAVAudioReader.Make(media);
TAVAudioFrame frame = audioReader.readNextFrame();
```


【iOS】
``` objectivec
// 构建音频控制器
- (void)setupAudioReader {
    // 基于movie创建音频控制器，采样率、采样数、声道数可以根据业务需求进行设置
    self.audioReader = [TAVAudioReader MakeFrom:self.movie sampleRate:44100 sampleCount:1024 channels:1];
	
    // 获取第0秒的pcm数据
    [self.audioReader seekTo:0]; //seek到第0秒
    // 当调用seekTo后，readNextFrame会渲染seekTo的当前帧数据
    // 当未调用seekTo时，每次readNextFrame会按照音频配置获取下一个数据块
    TAVAudioFrame *frame = [self.audioReader readNextFrame];
    frame.timestamp // 音频数据的开始时间（单位us）
    frame.duration // 音频数据的持续时间（单位us）
    frame.data // 音频数据的pcm数据
}
```

## TAVMedia 层级结构

对于 TAVMedia SDK 来说，TAVVideoReader、TAVAudioReader 和 TAVSurface 相对简单，使用方式也比较固定，具体使用方法请参见基础功能。

对于业务来说，修改渲染结构 TAVClip 是较为复杂的编辑操作。TAVClip 是一段段的渲染内容，具体类型可以是视频、音频、图片、特效。通常，剪辑场景需要处理多个 TAVClip，这些 TAVClip 之间的关系处理即为 TAVMedia 层级结构所解决的问题。

## 相关类说明
<table>
<tr>
<td rowspan="1" colSpan="1" >类名</td>

<td rowspan="1" colSpan="1" >功能</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >TAVClip</td>

<td rowspan="1" colSpan="1" >渲染结构基类，所有的渲染结构都继承自 TAVClip</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >TAVComposition</td>

<td rowspan="1" colSpan="1" >TAVComposition 是 TAVClip 的子类，表示一系列 TAVClip 的集合</td>
</tr>
</table>


## 构造渲染结构

在 TAVMedia SDK 中，TAVComposition 用于解决特效需要跨越多个 TAVClip 的场景。例如，氛围特效、LUT 特效需要应用在所有视频上。同时，这些特效只能添加一个输入，无法将所有的视频都作为输入。此时，可以将所有的视频组成一个 TAVComposition，让 TAVComposition 作为特效的输入，从而完成需求。一个构造好的渲染结构通常类似于下图所示：</br>
<img src="/img/docs/cengjijiegou1.png" alt="img" style="zoom:50%;margin: 32px 0 48px 0;" /></br>


在构造渲染结构时，TAVClip 无法同时存在于多个 TAVComposition 中。TAVClip 如果同时添加到多个 TAVComposition 时，TAVClip 会首先从之前的 TAVComposition 中移除，再添加到新的 TAVComposition 中。同时，为了防止 TAVMedia 层级结构成为环状，TAVComposition 也无法添加一个子节点包含自己的 TAVComposition。

如下图所示，以常用的轨道场景进行拆解，轨道场景中每个轨道对应于 TAVMedia 就是一个 TAVComposition。

主轨道相当于最下方 TAVComposition 作为其他效果轨道的输入。当添加效果轨道时，如 LUT 效果轨道，该行为会将自己的效果 TAVClip 与输入组合成一个新的 TAVComposition。音频轨道或者画中画轨道这种无需输入的轨道，添加到最终渲染的 TAVComposition 中即可。</br>
<img src="/img/docs/cengjijiegou2.png" alt="img" style="zoom:50%;margin: 32px 0 48px 0;" /></br>


## TAVMedia 显示控制

本段内容介绍如何使用 TAVMedia SDK 控制位置和透明度。

## 相关类介绍
<table>
<tr>
<td rowspan="1" colSpan="1" >类名</td>

<td rowspan="1" colSpan="1" >功能</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >TAVAsset</td>

<td rowspan="1" colSpan="1" >素材资源类，用于表示基础素材资源</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >TAVMovie</td>

<td rowspan="1" colSpan="1" >TAVMovie 用于基于素材 TAVAsset 创建不同时间段的渲染数据，同时可以设置位置信息</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >TAVComposition</td>

<td rowspan="1" colSpan="1" >TAVComposition 继承自 TAVMovie，同时 TAVComposition 表示一系列 TAVClip 的组成，对 TAVComposition 的操作会应用到所有子 TAVClip</td>
</tr>
</table>


## 使用 matrix、cropRect 和 alpha 控制显示行为

除了 TAVMovie，其他的 TAVClip 通常是没有位置信息的。在 TAVMovie 中，业务可以通过设置 matrix、cropRect 和 alpha 来控制 TAVMovie 的显示行为。

### Matrix

Matrix 是 Movie 在 Composition 中的变化矩阵，用于控制 Movie 的位置。Matrix 默认是标准矩阵。Matrix 相对的（0,0）点是父级的左上角。具体坐标系如下图所示：</br>
<img src="/img/docs/xianshikongzhi1.png" alt="img" style="zoom:50%;margin: 32px 0 48px 0;" /></br>


### CropRect

CropRect 是 Movie 相对自身的裁剪区域，cropRect 只与 Movie 自己的宽高有关，和其他 Clip 无关。在渲染过程中，Movie 会先应用 Matrix 计算自己的位置，再使用 cropRect 将其他部分裁掉。</br>
<img src="/img/docs/xianshikongzhi2.png" alt="img" style="zoom:50%;margin: 32px 0 48px 0;" /></br>


## 示例

### 示例1

取中间1/4部分，并显示在原始位置。代码如下：




【Android】
``` java
TAVMovie movieWithCropRectAndMatrix = TAVMovie.MakeFrom(asset, 0, totalDuration);
movieWithCropRectAndMatrix.setDuration(totalDuration);

Matrix matrix = new Matrix();
matrix.postTranslate((float)-asset.width() / 2,(float)-asset.height() / 2);
matrix.postScale(2.0f,2.0f);
matrix.postTranslate((float) asset.width() /2,(float) asset.height() / 2);

RectF cropRect = new RectF((float)asset.width() / 4,(float)asset.height() / 4,(float)asset.width() / 2,(float)asset.height() / 2);
movieWithCropRectAndMatrix.setCropRect(cropRect);
movieWithCropRectAndMatrix.setMatrix(matrix);
```


【iOS】
``` objectivec
// movie 通过CropRect + matrix 显示一部分画面 并位移到正确位置
// movie 会先应用matrix再应用cropRect，matrix是相对父composition的位置，cropRect是相对自己内容的裁剪区域
TAVMovie *movieWithCropRectAndMatrix = [TAVMovie MakeFrom:asset startTime:0 duration:totalDuration];
[movieWithCropRectAndMatrix setDuration:totalDuration];
// 将锚点移动到0，0
CGAffineTransform matrix = CGAffineTransformMakeTranslation(-asset.width / 2, -asset.height / 2);
// 基于锚点拉伸两倍
matrix = CGAffineTransformConcat(matrix, CGAffineTransformMakeScale(2.0, 2.0));
// 恢复锚点位移
matrix = CGAffineTransformConcat(matrix, CGAffineTransformMakeTranslation(asset.width / 2, asset.height / 2));
// 裁剪后只剩下中间的一部分
CGRect cropRect = CGRectMake(asset.width / 4, asset.height / 4, asset.width / 2, asset.height / 2);
[movieWithCropRectAndMatrix setCropRect:cropRect];
[movieWithCropRectAndMatrix setMatrix:matrix];
```

### 示例2

通过设置 opacity（不透明度）可以控制 Movie 的透明度。示例代码如下：

> **说明：**
> 

> 取值范围为 0.0 - 1.0。0是完全透明，1是完全不透明。
> 





【Android】
``` java
TAVMovie movieWithCropRectAndMatrix = TAVMovie.MakeFrom(asset, 0, totalDuration);
// 设置opacity
movieWithOpacity.setOpacity(0.5);
```


【iOS】
``` objectivec
TAVMovie *movieWithOpacity = [TAVMovie MakeFrom:asset startTime:0 duration:totalDuration];
// 直接通过属性opacity设置不透明度
movieWithOpacity.opacity = 0.5;
```


## TAVMedia 时间控制

## 相关类介绍
<table>
<tr>
<td rowspan="1" colSpan="1" >类名</td>

<td rowspan="1" colSpan="1" >功能</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >TAVClip</td>

<td rowspan="1" colSpan="1" >渲染结构的基类，用于控制时间轴</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >TAVComposition</td>

<td rowspan="1" colSpan="1" >TAVComposition 由一系列 TAVClip 组成，对 TAVComposition 的操作会应用到所有子 TAVClip</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >TAVAsset</td>

<td rowspan="1" colSpan="1" >素材资源类，用于表示基础素材资源</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >TAVMovie</td>

<td rowspan="1" colSpan="1" >TAVMovie 用于基于素材 TAVAsset 创建不同时间段的渲染数据</td>
</tr>
</table>


## 通过 TAVClip 和 TAVComposition 排布时间轴

在 TAVMedia SDK 中，时间控制通过 TAVClip 和 TAVComposition 的嵌套进行。
- TAVClip 是渲染结构的基类，拥有 startTime 和 duration 两个基本属性，startTime 决定了 TAVClip 在 TAVComposition 中的出现时间点，duration 决定 TAVClip 在 TAVComposition 中的出现时长。

- TAVComposition 是 TAVClip 的集合，一个 TAVComposition 内部 TAVClip 的时间都是相对于 TAVComposition 的。TAVComposition 在构造的时候可以设置 ContentStartTime 和 ContentDuration，用于裁剪集合时间轴。同时，TAVComposition 继承自 TAVClip，也可以设置 startTime 和 duration 并添加到其他的 TAVComposition 中。


#### 示例

假设将一个在1s出现，显示4s的 TAVClip 添加在 TAVComposition 中，并跳过 TAVComposition 的前2s内容。则具体情况如下图所示：示例代码如下：</br>
<img src="/img/docs/shijiankongzhi.png" alt="img" style="zoom:50%;margin: 32px 0 48px 0;" /></br>




【Android】
``` java
TAVClip clip = new TAVClip();
clip.setStartTime( 1 * 1000 * 1000);
clip.setDuration(4 * 1000 * 1000);

TAVComposition composition =  TAVComposition.Make(720,1280, 2 * 1000 * 1000, 10 * 1000 * 1000);
composition.setDuration(10 * 1000 * 1000);
composition.addClip(clip);
```


【iOS】
``` objectivec
// createClip表示之前创建clip的行为
TAVClip * clip = [self createClip];
// 设置Clip的开始时间是1000000us
clip.startTime = 1 * 1000 * 1000;
// 设置Clip的持续时间是4000000us
clip.duration = 4 * 1000 * 1000;
// 创建一个分辨率为720*1280的Composition
// make时的startTime对应CompositionContentStartTime
// make时的duration对应CompositionContentDuration
TAVComposition * composition = [TAVComposition Make:720 height:1280 startTime:2 * 1000 * 1000 duration:10 * 1000 * 1000];
// clip 默认的startTime就是0 可以不设置composition.startTime = 0;
// 设置compositionDuration为10 * 1000 * 1000
composition.duration = 10 * 1000 * 1000;
// 把clip添加到composition中
[composition addClip:clip];
```

## 通过 TAVMovie 裁剪资源片段

除了 TAVComposition 可以对自己的内容进行裁剪，TAVMovie 也可以对素材 TAVAsset 进行裁剪。

TAVAsset 是素材资源类，通常基于 Data 或 Path 进行创建，表示图片、视频、音频资源。TAVAsset 不能直接添加进渲染结构中，需要通过 TAVMovie 创建资源对应的渲染结构。

TAVMovie 表示 TAVAsset 中的一个片段。在构造时可以设置 ContentStartTime 和 ContentDuration，决定 TAVMovie 在 TAVAsset 中的位置。TAVMovie 也继承自 TAVClip，可以用于 TAVMovie 控制片段在 TAVComposition 中的位置。

#### 示例

构造一个截取了视频资源1到4s的场景。示例代码如下：




【Android】
``` java
String path = Utils.OUT_SAVE_DIR + "video-640x360.mp4";
TAVMovieAsset asset = TAVMovieAsset.MakeFromPath(path);
TAVMovie movie = TAVMovie.MakeFrom(asset, 1 * 1000 * 1000, 4 * 1000 * 1000);
movie.setStartTime(0);
movie.setDuration(4 * 1000 * 1000);
```


【iOS】
``` objectivec
NSString *movieFilePath = [[NSBundle mainBundle] pathForResource:@"video-640x360" ofType:@"mp4"];
// 根据路径构造资源asset
TAVAsset* asset = [TAVMovieAsset MakeFromPath:movieFilePath];
// 基于资源构建movie，截取资源的1～4s
TAVMovie *movie = [TAVMovie MakeFrom:asset startTime:1 * 1000 * 1000 duration:4 * 1000 * 1000];
// ---- movie 构造完成 ----

// 注意：构造movie之后，也需要设置startTime和duration来定义在composition时间上的位置
// 与Make函数中不同，setStartTime表示的是在父级composition容器中的开始时间，不再是表示asset的开始时间
movie.startTime = 0;
// 与Make函数中不同，setDuration表示的是在父级composition容器中的时长，不再是表示asset的截取时长
movie.duration = 4 * 1000 * 1000;
```

## 变速

当 TAVMovie 的 contentDuration 和自身的 duration 不匹配时，TAVMovie 就会变速。TAVComposition 和 TAVMovie 类似，当 TAVComposition 的 ContentDuration 和 duration 不一致时，TAVComposition 的内容也会变速。

#### 示例

将一段10s视频两倍速播放。示例代码如下：




【Android】
``` java
// 通过Movie直接变速
long totalDuration = 10 * 1000 * 1000;
String path = Utils.OUT_SAVE_DIR + "video-640x360.mp4";
TAVMovieAsset asset = TAVMovieAsset.MakeFromPath(path);
TAVMovie movie = TAVMovie.MakeFrom(asset, 0, totalDuration);
movie.setStartTime(0);
movie.setDuration(totalDuration / 2.0);

// 通过Composition进行变速
String path = Utils.OUT_SAVE_DIR + "video-640x360.mp4";
TAVMovieAsset asset = TAVMovieAsset.MakeFromPath(path);
TAVMovie movie = TAVMovie.MakeFrom(asset, 0, totalDuration);
movie.setStartTime(0);
movie.setDuration(totalDuration);
TAVComposition composition = TAVComposition.Make(640, 360, 0, totalDuration);
composition.setStartTime(0);
composition.setDuration(totalDuration / 2.0);
```


【iOS】
``` objectivec
// 通过Movie直接变速
NSInteger totalDuration = 10 * 1000 * 1000;
NSString *movieFilePath = [[NSBundle mainBundle] pathForResource:@"video-640x360" ofType:@"mp4"];
TAVMovieAsset *asset = [TAVMovieAsset MakeFromPath:movieFilePath];
TAVMovie *movie = [TAVMovie MakeFrom:asset startTime:0 duration:totalDuration];
[movie setStartTime:0];
[movie setDuration:totalDuration / 2.0];

// 通过Composition进行变速
NSString *movieFilePath = [[NSBundle mainBundle] pathForResource:@"video-640x360" ofType:@"mp4"];
TAVMovieAsset *asset = [TAVMovieAsset MakeFromPath:movieFilePath];
TAVMovie *movie = [TAVMovie MakeFrom:asset startTime:0 duration:totalDuration];
[movie setStartTime:0];
[movie setDuration:totalDuration];
TAVComposition* composition = [TAVComposition Make:640 height:360 startTime:0 duration:totalDuration];
[composition setStartTime:0];
[composition setDuration:totalDuration / 2.0];
```

## 定格

类似变速，当 contentDuration = 0 或者近似0的时候，TAVmovie 或者 TAVcomposition 画面就会固定住。

#### 示例

取视频第1s的内容定格10s。示例代码如下：




【Android】
``` java
// 通过Movie定格
long totalDuration = 10 * 1000 * 1000;
String path = Utils.OUT_SAVE_DIR + "video-640x360.mp4";
TAVMovieAsset asset = TAVMovieAsset.MakeFromPath(path);
TAVMovie movie = TAVMovie.MakeFrom(asset, 1 * 1000 * 1000, 0);
movie.setStartTime(0);
movie.setDuration(totalDuration);

// 通过Composition定格
String path = Utils.OUT_SAVE_DIR + "video-640x360.mp4";
TAVMovieAsset asset = TAVMovieAsset.MakeFromPath(path);
TAVMovie movie = TAVMovie.MakeFrom(asset, 0, totalDuration);
movie.setStartTime(0);
movie.setDuration(totalDuration);
TAVComposition composition = TAVComposition.Make(640, 360, 1 * 1000 * 1000, totalDuration);
composition.setStartTime(0);
composition.setDuration(totalDuration);
```


【iOS】
``` objectivec
// 通过Movie定格
NSInteger totalDuration = 10 * 1000 * 1000;
NSString *movieFilePath = [[NSBundle mainBundle] pathForResource:@"video-640x360" ofType:@"mp4"];
TAVMovieAsset *asset = [TAVMovieAsset MakeFromPath:movieFilePath];
TAVMovie *movie = [TAVMovie MakeFrom:asset startTime:1 * 1000 * 1000 duration:0];
[movie setStartTime:0];
[movie setDuration:totalDuration];

// 通过Composition定格
NSString *movieFilePath = [[NSBundle mainBundle] pathForResource:@"video-640x360" ofType:@"mp4"];
TAVMovieAsset *asset = [TAVMovieAsset MakeFromPath:movieFilePath];
TAVMovie *movie = [TAVMovie MakeFrom:asset startTime:0 duration:totalDuration];
[movie setStartTime:0];
[movie setDuration:totalDuration];
TAVComposition* composition = [TAVComposition Make:640 height:360 startTime:1 * 1000 * 1000 duration:0];
[composition setStartTime:0];
[composition setDuration:totalDuration];变速
```


## TAVMedia 音频播放

## 相关类介绍
<table>
<tr>
<td rowspan="1" colSpan="1" >类名</td>

<td rowspan="1" colSpan="1" >功能</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >TAVAudio</td>

<td rowspan="1" colSpan="1" >通过 Asset 创建的音频片段</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >TAVAudioVolumeEffect</td>

<td rowspan="1" colSpan="1" >音频淡入淡出效果</td>
</tr>
</table>


### TAVAudio

TAVAudio 可以通过 Asset 创建音频片段，此时 Audio 内部只包含音频数据没有视频数据。通过 TAVAudio，业务可以添加背景音乐，也可以获取视频中的音频。音频音量大小可以通过 volume 接口进行设置，音量范围是0 - 1.0。

### TAVAudioVolumeEffect

TAVAudioVolumeEffect 是 TAVMedia 自带的音频音量控制效果，可以快速对 Clip 进行淡入淡出操作。TAVAudioVolumeEffect 的输入可以是 TAVAudio 或任意带有音频的 Clip。

## 示例

添加 BGM 并添加淡入淡出。代码如下：




【Android】
``` java
long totalDuration = 10 * 1000 * 1000;
// 构造音频轨道
String path = Utils.OUT_SAVE_DIR + "hoaprox.mp3";
TAVAudioAsset asset = TAVAudioAsset.MakeFromPath(path);
TAVAudio audio = TAVAudio.MakeFrom(asset, 0, totalDuration);
audio.setDuration(totalDuration);
// 构造音频变换特效
// 前3秒淡入，最后3秒淡出
TAVAudioVolumeEffect effect = TAVAudioVolumeEffect.MakeFIFOEffect(audio,
        1.0f, 3 * 1000 * 1000, 3 * 1000 * 1000);
effect.setStartTime(0);
effect.setDuration(totalDuration);

```


【iOS】
``` objectivec
// 构造音频轨道
NSString *audioPath = [[NSBundle mainBundle] pathForResource:@"hoaprox" ofType:@"mp3"];
TAVAudioAsset *asset = [TAVAudioAsset MakeFromPath:audioPath];
TAVAudio *audio = [TAVAudio MakeFrom:asset startTime:0 duration:totalDuration];
[audio setDuration:totalDuration];

// 构造音频变换特效
// 前3秒淡入，最后3秒淡出
TAVAudioVolumeEffect *effect = [TAVAudioVolumeEffect MakeFIFOEffect:audio maxVolume:1.0f fadeInDuration:3 * 1000 * 1000 fadeOutDuration:3 * 1000 * 1000];
// TAVAudioVolumeEffect也可以根据特定的声音变换数组进行创建，允许业务自定义音频变化曲线
// + (instancetype)MakeVolumeEffect:(TAVClip *)clip volumeRampList:(NSArray<TAVKeyFrame *> *)volumeRampList;
// 注意：volumeRampList的时间是相对于Effect的，如果Effect和Clip在时间轴上的位置不一致，效果可能会与预期不符

// 注意，这边需要设置startTime 和 duration，保证和输入在同一个时间出现
[effect setStartTime:audio.startTime];
[effect setDuration:audio.durat
```


## TAVMedia 添加效果

TAVMedia SDK 通过 TAVEffect 给 TAVClip 添加各种效果，包括色度饱和度调节、lut变换、位置变换、转场、PAG 滤镜效果等进阶功能。

## 相关类介绍
<table>
<tr>
<td rowspan="1" colSpan="1" >类名</td>

<td rowspan="1" colSpan="1" >功能</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >TAVClip</td>

<td rowspan="1" colSpan="1" >基础渲染结构</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >TAVEffect</td>

<td rowspan="1" colSpan="1" >继承自 TAVClip，作为效果基类</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >TAVComposition</td>

<td rowspan="1" colSpan="1" >TAVComposition 由一系列 TAVClip 组成，在渲染时控制渲染流程</td>
</tr>
</table>


## TAVComposition 中的渲染流程

通常情况下，TAVComposition 的渲染顺序是按照添加顺序进行。如下图所示，TAVComposition 依次添加了 TAVClip0、TAVClip1、TAVClip2 三个 TAVClip。
- 在 Time1 时，三个 TAVClip 都显示，Composition 会依次绘制 TAVClip0 > TAVClip1 > TAVClip2。

- 在 Time0 时，由于 TAVClip1 无法显示，因此绘制顺序是 TAVClip0 > TAVClip2。

- 在 Time2 时，绘制顺序是 TAVClip1。</br>
  <img src="/img/docs/xiaoguo111.png" alt="img" style="zoom:50%;margin: 32px 0 48px 0;" /></br>

   


   添加了 TAVEffect 后，TAVEffect 的 InputClip 会在 TAVEffect 需要的时候渲染。如下图所示，TAVClip2 是一个 TAVEffect，同时 TAVClip1 是 TAVClip 的 Input。

- 在 Time0 时，绘制顺序是 TAVClip0 > TAVEffect，TAVEffect 会尝试获取 TAVClip1 的画面，但是由于 TAVClip1 不显示，TAVEffect 会当 Input 不存在。

- 在 Time1 时，绘制顺序是 TAVClip0 > TAVEffect，此时 TAVClip1 虽然在显示区间内，但是不会主动绘制，会由 TAVEffect 获取 TAVClip1 的画面进行处理后再绘制。

- 在 Time2 时，绘制顺序是 TAVClip1, 此时 TAVEffect 不显示，TAVClip1 不受 Effect 的影响，直接绘制到画布上。</br>
  <img src="/img/docs/xiaoguo222.png" alt="img" style="zoom:50%;margin: 32px 0 48px 0;" /></br>




## TAVMedia 中支持的 Effect

### TAVTransformEffect
<table>
<tr>
<td rowspan="1" colSpan="1" >输入个数</td>

<td rowspan="1" colSpan="1" >功能</td>

<td rowspan="1" colSpan="1" >注意事项。</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >1</td>

<td rowspan="1" colSpan="1" >支持基于时间动态移动 Input 的位置和透明度</td>

<td rowspan="1" colSpan="1" >参数 Property 时间轴是相对 Effect，锚点对应的坐标是绝对坐标。</td>
</tr>
</table>


#### 示例

随时间旋转90度的效果。代码如下：




【Android】
``` java
TAVTransform2D transform2D = new TAVTransform2D();
TAVKeyframe[] keyframes = {
        TAVKeyframe.MakeLinear(0,1 * 1000 * 1000,0,90)
};
TAVAnimatableProperty rotation = new TAVAnimatableProperty(keyframes);
transform2D.rotation = rotation;

TAVTransformEffect effect = TAVTransformEffect.Make(transform2D);
effect.setStartTime(1 * 1000 * 1000);
effect.setDuration(1 * 1000 * 1000);
effect.addInput(inputClip);
composition.addClip(effect);
```


【iOS】
``` objectivec
TAVTransform2D* transform2D = [TAVTransform2D new];
// 不随时间变换的值可以直接使用TAVProperty
// exmaple:
// TAVProperty* value = [TAVProperty new];
// value.value = @(90);

// 构造随时间动态变换的旋转Property
TAVAnimatableProperty* rotation = [TAVAnimatableProperty new];
// 创建一个从0～90度的线性旋转动画，动画持续1秒
rotation.keyFrames = [TAVKeyFrame MakeLinear:0 endTime:1 * 1000 * 1000 startValue:@(0) endValue:@(90)];
transform2D.rotation = rotation;
// transform2D还有其他的参数，具体可以参照TAVTransform2D.h
// 基于transform2D创建effect
TAVTransformEffect* effect = [TAVTransformEffect Make:transform2D];
// effect从1s开始，此时旋转动画会从2s开始
[effect setStartTime:1 * 1000 * 1000];
[effect setDuration:1 * 1000 * 1000];
// 添加clip作为effect的输入，inputClip是业务自定的clip，这里没有创建
[effect addInput:inputClip];
// 将effect添加进composition中，composition是业务自定的composition，这里没有创建
[composition addClip:effect];
```

### TAVColorTuningEffect 
<table>
<tr>
<td rowspan="1" colSpan="1" >输入个数</td>

<td rowspan="1" colSpan="1" >功能</td>

<td rowspan="1" colSpan="1" >注意事项</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >1</td>

<td rowspan="1" colSpan="1" >修改 Input 色度（包括色温、色调、饱和度等等一系列颜色变化）</td>

<td rowspan="1" colSpan="1" >参数 Property 时间轴是相对 Effect，同时属性的取值范围是[-50, 50]。</td>
</tr>
</table>


#### 示例

随时间变换饱和度从-50到50的效果。代码如下：




【Android】
``` java
TAVColorTuning colorTuning = new TAVColorTuning();
TAVKeyframe[] keyframes = {
        TAVKeyframe.MakeLinear(0,1 * 1000 * 1000,-50,50)
};
TAVAnimatableProperty saturation = new TAVAnimatableProperty(keyframes);
colorTuning.saturation = saturation;

TAVColorTuningEffect effect = TAVColorTuningEffect.Make(colorTuning);
effect.setStartTime(1 * 1000 * 1000);
effect.setDuration(1 * 1000 * 1000);         
effect.addInput(inputClip);
composition.addClip(effect);
```


【iOS】
``` objectivec
// colorTuning内的属性，取值范围都是[-50,50]
TAVColorTuning* colorTuning = [TAVColorTuning new];

// 构造随时间动态变换的饱和度property
TAVAnimatableProperty* saturation = [TAVAnimatableProperty new];
// 创建一个从-50～+50的线性动画，动画持续1秒
saturation.keyFrames = [TAVKeyFrame MakeLinear:0 endTime:1 * 1000 * 1000 startValue:@(-50) endValue:@(50)];
colorTuning.saturation = saturation;
// TAVColorTuning还有其他的参数，具体可以参照TAVColorTuning.h
// 基于TAVColorTuning创建effect
TAVColorTuningEffect* effect = [TAVColorTuningEffect Make:colorTuning];
// effect从1s开始，此时饱和度动画会从2s开始
[effect setStartTime:1 * 1000 * 1000];
[effect setDuration:1 * 1000 * 1000];
// 添加clip作为effect的输入，inputClip是业务自定的clip，这里没有创建
[effect addInput:inputClip];
// 将effect添加进composition中，composition是业务自定的composition，这里没有创建
[composition addClip:effect];
```

### TAVLUTEffect 
<table>
<tr>
<td rowspan="1" colSpan="1" >输入个数</td>

<td rowspan="1" colSpan="1" >功能</td>

<td rowspan="1" colSpan="1" >注意事项</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >1</td>

<td rowspan="1" colSpan="1" >将 LUT 图应用在 Input 上</td>

<td rowspan="1" colSpan="1" >LUT 强度范围是[0,1]，LUT 图片格式要求是512*512的图片。</td>
</tr>
</table>


#### 示例

使用 LUT 并设置强度为0.5。代码如下：




【Android】
``` java
String path = Utils.OUT_SAVE_DIR + "lut1.png";
TAVLUTEffect lutEffect = TAVLUTEffect.MakeFromPath(path);
lutEffect.setStrength(0.5f);
lutEffect.setStartTime(0);
lutEffect.setDuration(1 * 1000 * 1000);
lutEffect.addInput(inputClip);
composition.addClip(lutEffect);
```


【iOS】
``` objectivec
// 获取LUT图片的路径
NSString* lutPath = [[NSBundle mainBundle] pathForResource:@"lut1" ofType:@"png"];
TAVLUTEffect* lutEffect = [TAVLUTEffect Make:lutPath];
// 设置lut的强度是0.5
[lutEffect setStrength:0.5];
// 设置开始时间
[lutEffect setStartTime:0];
// 设置时长是1s
[lutEffect setDuration:1 * 1000 * 1000];
// 添加clip作为effect的输入，inputClip是业务自定的clip，这里没有创建
[lutEffect addInput:inputClip];
// 将effect添加进composition中，composition是业务自定的composition，这里没有创建
[composition addClip:lutEffect];
```

### TAVChromaMattingEffect 
<table>
<tr>
<td rowspan="1" colSpan="1" >输入个数</td>

<td rowspan="1" colSpan="1" >功能</td>

<td rowspan="1" colSpan="1" >注意事项</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >1</td>

<td rowspan="1" colSpan="1" >基于色度抠图</td>

<td rowspan="1" colSpan="1" >intensity 是抠图强度，取值范围是[0,1]<br>- intensity 为0时不抠图，1时色度区间最大。<br>- shadow 是边缘软化度， 取之范围是[0,1]，shadow 越大，边缘会更自然。<br>- selectedColor 是基准颜色。</td>
</tr>
</table>


#### 示例

基于黑色抠图。代码如下：




【Android】
``` java
// 直接创建TAVChromaMattingEffect
TAVChromaMattingConfig config = new TAVChromaMattingConfig();
config.intensity = 0.2f;
config.shadow = 0.5f;
config.selectedColor = Color.BLACK;
TAVChromaMattingEffect effect = TAVChromaMattingEffect.Make(config);
// 设置开始时间
effect.setStartTime(0);
// 设置时长是1s
effect.setDuration(1 * 1000 * 1000);
// 添加clip作为effect的输入，inputClip是业务自定的clip，这里没有创建
effect.addInput(inputClip);
// 将effect添加进composition中，composition是业务自定的composition，这里没有创建
composition.addClip(effect);
```


【iOS】
``` objectivec
// 直接创建TAVChromaMattingEffect
TAVChromaMattingEffect* effect = [TAVChromaMattingEffect Make:0.2 shadow:0.5 selectedColor:UIColor.blackColor];
// 设置开始时间
[effect setStartTime:0];
// 设置时长是1s
[effect setDuration:1 * 1000 * 1000];
// 添加clip作为effect的输入，inputClip是业务自定的clip，这里没有创建
[effect addInput:inputClip];
// 将effect添加进composition中，composition是业务自定的composition，这里没有创建
[composition addClip:effect];
```

### TAVPAGEffect
<table>
<tr>
<td rowspan="1" colSpan="1" >输入个数</td>

<td rowspan="1" colSpan="1" >功能</td>

<td rowspan="1" colSpan="1" >注意事项</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >小于 PAG 文件的可编辑图片图层</td>

<td rowspan="1" colSpan="1" >将 input 作为 PAG 效果的替换图层，应用 PAG 效果。使用范围包括转场、氛围效果、PAG 模板等。</td>

<td rowspan="1" colSpan="1" >PAG 自身有宽高，如果放在不同比例尺下需要根据需求设置 Matrix。</td>
</tr>
</table>


#### 示例1

使用 PAG 氛围文件。代码如下：




【Android】
``` java
String path = Utils.OUT_SAVE_DIR + "fw.pag";
// 创建PAGEffect
TAVPAGEffect pagEffect = TAVPAGEffect.MakeFromPath(path);
// 添加clip作为effect的输入，inputClip是业务自定的clip，这里没有创建
pagEffect.addInput(inputClip);
// numImgs表示PAG最大支持的替换图层数量
int numImgs = pagEffect.numImages();
// PAG文件可能会存在多个替换图层，可以打开PAGViewer工具查看文件具体属性
// 设置第一个inputClip作为PAG文件中的第0个图片图层的替换数据，设置完成后TAVMedia就可以将效果叠加上去了
// 当inputClip的宽高和PAGFile不一致时，这边可以使用replace:inputIndex:scaleMode:
// 设置inputClip伸缩模式，具体行为可以参考TAVScaleMode.h
pagEffect.replaceImage(0,0);
// 这边可以根据需求设置成任意时长，例子中设置成文件时长
pagEffect.setDuration(pagEffect.fileDuration());
// 将effect添加进composition中，composition是业务自定的composition，这里没有创建
composition.addClip(pagEffect);
```


【iOS】
``` objectivec
// 获取PAG文件路径
NSString* fwPath = [[NSBundle mainBundle] pathForResource:@"fw" ofType:@"pag"];
// 创建PAGEffect
TAVPAGEffect* pagEffect = [TAVPAGEffect Make:fwPath];
// 添加clip作为effect的输入，inputClip是业务自定的clip，这里没有创建
[pagEffect addInput:inputClip];
// numImgs表示PAG最大支持的替换图层数量
int numImgs = [pagEffect numImages];
// PAG文件可能会存在多个替换图层，可以打开PAGViewer工具查看文件具体属性
// 设置第一个inputClip作为PAG文件中的第0个图片图层的替换数据，设置完成后TAVMedia就可以将效果叠加上去了
// 当inputClip的宽高和PAGFile不一致时，这边可以使用replace:inputIndex:scaleMode:
// 设置inputClip伸缩模式，具体行为可以参考TAVScaleMode.h
[pagEffect replace:0 inputIndex:0];
// 这边可以根据需求设置成任意时长，例子中设置成文件时长
[pagEffect setDuration:pagEffect.fileDuration];
// 将effect添加进composition中，composition是业务自定的composition，这里没有创建
[composition addClip:pagEffect];
```

#### 示例2

使用 PAG 转场文件进行转场。代码如下：




【Android】
``` java
int movieDuration = 3_000_000;
// 构建movie1
TAVMovieAsset asset1 = TAVMovieAsset.MakeFromPath(Utils.OUT_SAVE_DIR + "1.mp4");
TAVMovie movie1 = makeMovie(asset1, movieDuration, width, height);
movie1.setDuration(movieDuration);
// 构建movie2
TAVMovieAsset asset2 = TAVMovieAsset.MakeFromPath(Utils.OUT_SAVE_DIR + "2.mp4");
TAVMovie movie2 = makeMovie(asset2, movieDuration, width, height);
movie2.setDuration(movieDuration);
// 获取PAG转场文件路径
String transitionPath = Utils.OUT_SAVE_DIR + "zc.pag";
// 创建PAGEffect
TAVPAGEffect pagEffect = TAVPAGEffect.MakeFromPath(transitionPath);
// numImgs表示PAG最大支持的替换图层数量
// 转场效果有两个以上的numImages
int numImgs = pagEffect.numImages();
// 添加movie1,movie2作为effect的输入
pagEffect.addInput(movie1);
pagEffect.addInput(movie2);

// 分别设置movie1和movie2替换pagfile中的第一个替换图层和第二个替换图层
// 替换哪两个替换图层需要根据PAG文件来决定，通常情况下input0对应editableIndex0，input1对应editableIndex1
pagEffect.replaceImage(0,0);
pagEffect.replaceImage(1,1);
pagEffect.setDuration(pagEffect.fileDuration());

// 这边可以根据需求设置成任意时长，例子中设置成文件时长
movie2.setStartTime(movie1.duration() - pagEffect.duration());
// 设置转场和movie2一同开始
pagEffect.setStartTime(movie2.startTime());
// 将effect添加进composition中，composition是业务自定的composition，这里没有创建
composition.addClip(pagEffect);
```


【iOS】
``` objectivec
// 构造movie1和movie2两个视频片段
NSString *moviefilePath1 = [[NSBundle mainBundle] pathForResource:@"1" ofType:@"mp4"];
NSString *moviefilePath2 = [[NSBundle mainBundle] pathForResource:@"2" ofType:@"mp4"];
NSInteger movieDuration = 3 * 1000 * 1000;

// 构建movie1
movieAsset = [TAVMovieAsset MakeFromPath:moviefilePath1];
TAVMovie *movie1 = [TAVMovie MakeFrom:movieAsset startTime:0 duration:movieDuration];
[movie1 setDuration:movieDuration];

// 构建movie2
movieAsset = [TAVMovieAsset MakeFromPath:moviefilePath2];
TAVMovie *movie2 = [TAVMovie MakeFrom:movieAsset startTime:0 duration:movieDuration];
[movie2 setDuration:movieDuration];


// 获取PAG转场文件路径
NSString* zcPath = [[NSBundle mainBundle] pathForResource:@"zc" ofType:@"pag"];
// 创建PAGEffect
TAVPAGEffect* pagEffect = [TAVPAGEffect Make:zcPath];
// numImgs表示PAG最大支持的替换图层数量
// 转场效果有两个以上的numImages
int numImgs = [pagEffect numImages];

// 添加movie1,movie2作为effect的输入
[pagEffect addInput:movie1];
[pagEffect addInput:movie2];


// 分别设置movie1和movie2替换pagfile中的第一个替换图层和第二个替换图层
// 替换哪两个替换图层需要根据PAG文件来决定，通常情况下input0对应editableIndex0，input1对应editableIndex1
[pagEffect replace:0 inputIndex:0];
[pagEffect replace:1 inputIndex:1];

// 这边可以根据需求设置成任意时长，例子中设置成文件时长
[pagEffect setDuration:pagEffect.fileDuration];

// 设置movie2的开始时长，让movie1和movie2有pagEffect.duration的重叠时长作为转场时长
movie2.startTime = movie1.duration - pagEffect.duration;

// 设置转场和movie2一同开始
pagEffect.startTime = movie2.startTime;

// 将effect添加进composition中，composition是业务自定的composition，这里没有创建
[composition addClip:pagEffect];
```


## TAVMedia 导出

## 相关类介绍
<table>
<tr>
<td rowspan="1" colSpan="1" >类名</td>

<td rowspan="1" colSpan="1" >功能</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >TAVExport</td>

<td rowspan="1" colSpan="1" >导出视频</td>
</tr>

<tr>
<td rowspan="1" colSpan="1" >TAVMedia</td>

<td rowspan="1" colSpan="1" >待导出的渲染结构</td>
</tr>
</table>


### TAVExport

TAVExport 可以根据设置的 config 参数，直接导出 TAVMedia 到对应的文件路径下。

## 示例




【Android】
``` java
// 构造导出的配置
TAVExportConfig config = new Builder()
        .setVideoWidth(media.width()) // 配置导出视频的宽
        .setVideoHeight(media.height()) // 配置导出视频的高
        .setOutFilePath(outputFilePath) // 配置导出的文件路径
        .setUseHWEncoder(true) 
        .build();
// 开启异步线程导出，callback 为导出的回调函数
new Thread(() -> new TAVExport(media, config, callback).export()).start();
```


【iOS】
``` objectivec
// 获取需要导出的数据结构
TAVMedia *media = [self makeExportMovie];
// 构造导出参数
TAVExportConfig *config = [TAVExportConfig new];
// 配置导出视频的宽高
config.videoWidth = movie.width;
config.videoHeight = movie.height;
// 配置导出的文件路径
config.outPath = [self exportPath];
// delegate是导出功能的回调代理TAVMediaExportDelegate，支持获取progress、接收失败错误、接受完成事件
self.exporter = [TAVExport MakeMediaExport:media config:config delegate:self];
// 开始导出
[self.exporter exportMedia];
```
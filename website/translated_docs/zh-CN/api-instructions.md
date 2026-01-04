---
id: api-instructions
title:常用 API 解读
---
---

## 核心类分析

### PAGLayer

PAG 的渲染图层，PAG 是一个树状结构，PAGLayer 相当于树状结构中的叶子节点。PAG 对外暴露的渲染图层包括
PAGImageLayer （图片图层）、
PAGTextLayer （文本图层）、PAGSolidLayer（实色图层），只有这些图层可以二次改编辑。

PAGLayer 主要提供了以下能力：

以 C++ 层接口为例 （ PAG 的对外接口保持各平台一致性），通过 setMatrix 可以控制图层的位移、缩放和扭曲，通过
setVisible 控制 图层的显示与隐藏，通过 localTimeToGlobal 获取该图层相对于主渲染时间轴的具体时间，通过
setStartTime
设置图层相对于主时间轴的开始时间，通过设置 setExcludedFromTimeline 可以控制该图层渲染是否脱离主时间轴由接入方控制。

```asm
 // C++
 /**
   * A matrix object containing values that alter the scaling, rotation, and translation of the
   * layer. Altering it does not change the animation matrix, and it will be concatenated to current
   * animation matrix for displaying.
   */
  Matrix matrix() const;

  void setMatrix(const Matrix& value);
  
  /**
   * Whether or not the layer is visible.
   */
  bool visible() const;

  /**
   * Set the visible of the layer.
   */
  void setVisible(bool value);
  
  /**
   * Converts the time from the PAGLayer's (local) timeline to the PAGSurface (global) timeline. The
   * time is in microseconds.
   */
  int64_t localTimeToGlobal(int64_t localTime) const;

  /**
   * Converts the time from the PAGSurface (global) to the PAGLayer's (local) timeline timeline. The
   * time is in microseconds.
   */
  int64_t globalToLocalTime(int64_t globalTime) const;
  
  /**
   * The start time of the layer in microseconds, indicates the start position of the visible range
   * in parent composition. It could be negative value.
   */
  int64_t startTime() const;

  /**
   * Set the start time of the layer, in microseconds.
   */
  void setStartTime(int64_t time);
  
  /**
   * Indicate whether this layer is excluded from parent's timeline. If set to true, this layer's
   * current time will not change when parent's current time changes.
   */
  bool excludedFromTimeline() const;

  /**
   * Set the excludedFromTimeline flag of this layer.
   */
  void setExcludedFromTimeline(bool value);

```

### PAGImageLayer

PAGImageView 为图片图层，支持通过 replaceImage 的方法替换默认占位图，同时支持通过 imageBytes
获取默认占位图的数据。由于 PAG 专注于动效渲染，音视频编辑相关内容不属于 PAG SDK
的范畴，社区版是不支持占位图替换视频的，如果需要替换视频可以接入 PAG 企业版。

```asm
// C++
 /**
  * Replace the original image content with the specified PAGImage object.
  * Passing in null for the image parameter resets the layer to its default image content.
  * The setImage() method only modifies the content of the calling PAGImageLayer.
  *
  * @param image The PAGImage object to replace with.
  */
  void setImage(std::shared_ptr<PAGImage> image);

 /**
  * The default image data of this layer, which is webp format.
  */
  ByteData* imageBytes() const;
```

PAGImageLayer 支持用户自己创建，支持指定开始时间和时长，典型的应用场景中将一个外部视频添加到 pag 渲染数据。

```asm
 /**
  * Make a PAGImageLayer with with, height and duration(in microseconds).
  */
  static std::shared_ptr<PAGImageLayer> Make(int width, int height, int64_t duration);
```

### PAGTextLayer

PAGTextLayer 为文本图层，支持用户修改默认的文本信息、文本颜色、更换字体、字体大小等。

```asm
// C++
  /**
   * Returns the text layer’s fill color.
   */
  Color fillColor() const;

  /**
   * Set the text layer’s fill color.
   */
  void setFillColor(const Color& value);

  /**
   * Returns the text layer's font.
   */
  PAGFont font() const;

  /**
   * Set the text layer's font.
   */
  void setFont(const PAGFont& font);

  /**
   * Returns the text layer's font size.
   */
  float fontSize() const;

  /**
   * Set the text layer's font size.
   */
  void setFontSize(float size);

  /**
   * Returns the text layer's stroke color.
   */
  Color strokeColor() const;

  /**
   * Set the text layer's stroke color.
   */
  void setStrokeColor(const Color& color);

  /**
   * Returns the text layer's text.
   */
  std::string text() const;

  /**
   * Set the text layer's text.
   */
  void setText(const std::string& text);

```

为了方便修改文本数据，C++ 封装了 TextDocument 类，支持修改文本的排版、斜体、描边信息等，对应 iOS、Android
平台的 PAGText 类。

```asm
/**
   * When true, the text layer shows a fill.
   */
  bool applyFill = true;

  /**
   * When true, the text layer shows a stroke.
   */
  bool applyStroke = false;

  /**
   * Readonly, external modifications are not valid.
   */
  float baselineShift = 0;

  /**
   * When true, the text layer is paragraph (bounded) text.
   * Readonly, external modifications are not valid.
   */
  bool boxText = false;

  /**
   * Readonly, external modifications are not valid.
   */
  Point boxTextPos = Point::Zero();

  /**
   * For box text, the pixel dimensions for the text bounds.
   * Readonly, external modifications are not valid.
   */
  Point boxTextSize = Point::Zero();

  /**
   * Readonly, external modifications are not valid.
   */
  float firstBaseLine = 0;

  bool fauxBold = false;

  bool fauxItalic = false;
  /**
   * The text layer’s fill color.
   */
  Color fillColor = Black;

  /**
   * A string with the name of the font family.
   **/
  std::string fontFamily = "";

  /**
   * A string with the style information — e.g., “bold”, “italic”.
   **/
  std::string fontStyle = "";

  /**
   * The text layer’s font size in pixels.
   */
  float fontSize = 24;

  /**
   * The text layer’s stroke color.
   */
  Color strokeColor = Black;

  /**
   * Indicates the rendering order for the fill and stroke of a text layer.
   * Readonly, external modifications are not valid.
   */
  bool strokeOverFill = true;

  /**
   * The text layer’s stroke thickness.
   */
  float strokeWidth = 1;

  /**
   * The text layer’s Source Text value.
   */
  std::string text = "";

  /**
   * The paragraph justification for the text layer.
   */
  Enum justification = ParagraphJustification::LeftJustify;

  /**
   * The space between lines, 0 indicates 'auto', which is fontSize * 1.2
   */
  float leading = 0;

  /**
   * The text layer’s spacing between characters.
   */
  float tracking = 0;

  /**
   *  The text layer’s background color
   */
  Color backgroundColor = White;

```

### PAGSolidLayer

PAGSolidLayer 为实色图层，支持修改实色图层的颜色

```asm
// C++
  /**
   * Returns the layer's solid color.
   */
  Color solidColor();

  /**
   * Set the the layer's solid color.
   */
  void setSolidColor(const Color& value);

```

### PAGCompostion
PAGComponsition 是渲染树中的容器，继承于 PAGLayer，可以包含多个
PAGLayer，支持用户自己创建，支持增加、删除、更换渲染顺序，支持通过图层名称获取该名称对应的图层。
```asm
// C++
  /**
   * Returns the number of child layers of this composition.
   */
  int numChildren() const;

  /**
   * Returns the child layer that exists at the specified index.
   * @param index The index position of the child layer.
   * @returns The child layer at the specified index position.
   */
  std::shared_ptr<PAGLayer> getLayerAt(int index) const;

  /**
   * Returns the index position of a child layer.
   * @param pagLayer The layer instance to identify.
   * @returns The index position of the child layer to identify.
   */
  int getLayerIndex(std::shared_ptr<PAGLayer> pagLayer) const;

  /**
   * Changes the position of an existing child layer in the composition. This affects the layering
   * of child layers.
   * @param pagLayer The child layer for which you want to change the index number.
   * @param index The resulting index number for the child layer.
   */
  void setLayerIndex(std::shared_ptr<PAGLayer> pagLayer, int index);

  /**
   * Add a PAGLayer to current PAGComposition at the top. If you add a layer that already has a
   * different PAGComposition object as a parent, the layer is removed from the other PAGComposition
   * object.
   */
  bool addLayer(std::shared_ptr<PAGLayer> pagLayer);

  /**
   * Add a PAGLayer to current PAGComposition at the specified index. If you add a layer that
   * already has a different PAGComposition object as a parent, the layer is removed from the other
   * PAGComposition object.
   */
  bool addLayerAt(std::shared_ptr<PAGLayer> pagLayer, int index);

  /**
   * Check whether current PAGComposition contains the specified pagLayer.
   */
  bool contains(std::shared_ptr<PAGLayer> pagLayer) const;

  /**
   * Remove the specified PAGLayer from current PAGComposition.
   */
  std::shared_ptr<PAGLayer> removeLayer(std::shared_ptr<PAGLayer> pagLayer);

  /**
   * Remove the PAGLayer at specified index from current PAGComposition.
   */
  std::shared_ptr<PAGLayer> removeLayerAt(int index);

  /**
   * Remove all PAGLayers from current PAGComposition.
   */
  void removeAllLayers();

  /**
   * Swap the layers.
   */
  void swapLayer(std::shared_ptr<PAGLayer> pagLayer1, std::shared_ptr<PAGLayer> pagLayer2);

  /**
   * Swap the layers at the specified index.
   */
  void swapLayerAt(int index1, int index2);

```


### PAGFile
PAGFile 继承于 PAGComposition，不支持自己创建，通过加载 pag 文件获得，相对比 PAGComposition，PAGFile
增加了替换文本图层和图片图层内容的接口，因此如果需要编辑文本图层和图片图层的内容，一方面可以通过图层自身的接口，另一方面可以通过
PAGFile 的接口。
```asm
// C++
  /**
   * Replace the text data of the specified index. The index ranges from 0 to PAGFile.numTexts - 1.
   * Passing in null for the textData parameter will reset it to default text data.
   */
  void replaceText(int editableTextIndex, std::shared_ptr<TextDocument> textData);

  /**
   * Replace file's image content of the specified index with a PAGImage object. The index ranges from
   * 0 to PAGFile.numImages - 1. Passing in null for the image parameter will reset it to default
   * image content.
   */
  void replaceImage(int editableImageIndex, std::shared_ptr<PAGImage> image);

  /**
   * Replace file's image content of the specified layer name with a PAGImage object.
   * Passing in null for the image parameter will reset it to default image content.
   */
  void replaceImageByName(const std::string& layerName, std::shared_ptr<PAGImage> image);

```

### PAGSurface
PAGSurface 是 PAG 的渲染画布。PAGSurface 的创建， iOS 平台可以通过 CVPixelBufferRef、尺寸（内部同样创建的是 CVPixelBufferRef），
Android 平台可以通过 Surface、SurfaceTexture、TextureID、尺寸等创建，不同的创建方法对应
不同的应用场景。PAGSurface 提供了获取单帧渲染数据的接口，支持获取 BGRA 数据、CVPixelBufferRef 和Bitmap。

```asm
// OC
/**
 * Creates a new PAGSurface from specified CAEAGLLayer. The GPU context will be created internally
 * by PAGSurface.
 */
+ (PAGSurface*)FromLayer:(CAEAGLLayer*)layer;

/**
 * Creates a new PAGSurface from specified CVPixelBuffer. The GPU context will be created internally
 * by PAGSurface.
 */
+ (PAGSurface*)FromCVPixelBuffer:(CVPixelBufferRef)pixelBuffer;

/**
 * Creates a new PAGSurface from specified CVPixelBuffer and EAGLContext. Multiple PAGSurfaces with
 * the same context share the same GPU caches. The caches are not destroyed when resetting a
 * PAGPlayer's surface to another PAGSurface with the same context.
 */
+ (PAGSurface*)FromCVPixelBuffer:(CVPixelBufferRef)pixelBuffer context:(EAGLContext*)eaglContext;
/**
 * Creates a offscreen PAGSurface of specified size. PAGSurface internally creates a CVPixelBuffer
 * which can be accessed by [PAGSurface getCVPixelBuffer] after the first [PAGPLayer flush].
 */
+ (PAGSurface*)MakeOffscreen:(CGSize)size;

/**
 * Returns the internal CVPixelBuffer object associated with this PAGSurface, returns nil if this
 * PAGSurface is created by [PAGSurface FromLayer].
 */
- (CVPixelBufferRef)getCVPixelBuffer;

/**
 * Returns a CVPixelBuffer object capturing the contents of the PAGSurface. Subsequent rendering of
 * the PAGSurface will not be captured.
 */
- (CVPixelBufferRef)makeSnapshot;

/**
 * Copies the pixels of the PAGSurface to the specified memory address. The format of the copied
 * pixels is in the BGRA color type with the premultiplied alpha type. Returns false if failed.
 */
- (BOOL)copyPixelsTo:(void*)pixels rowBytes:(size_t)rowBytes;

```

```asm
// java
    public static PAGSurface MakeOffscreen(int width, int height);
    public static PAGSurface FromSurfaceTexture(SurfaceTexture surfaceTexture);

    public static PAGSurface FromSurfaceTexture(SurfaceTexture surfaceTexture, EGLContext shareContext);
    
    public static PAGSurface FromSurface(Surface surface);

    /**
     * Create a PAGSurface from specified OpenGL texture, return null if there is no current OpenGL context or the
     * texture is invalid. Note:
     * 1. The target of texture must be GL_TEXTURE_2D.
     * 2. The texture should not bind to any frameBuffer.
     * 3. PAG will use the current (OpenGL) context.
     */
    public static PAGSurface FromTexture(int textureID, int width, int height);
    /**
     * Create a PAGSurface from specified OpenGL texture, return null if there is no current OpenGL context or the
     * texture is invalid. Note:
     * 1. The target of texture must be GL_TEXTURE_2D.
     * 2. The texture should not bind to any frameBuffer.
     * 3. PAG will use the current (OpenGL) context.
     */
    public static PAGSurface FromTexture(int textureID, int width, int height, boolean flipY);

    /**
     * Create a PAGSurface from specified OpenGL texture, return null if there is no current OpenGL context or the
     * texture is invalid. Note:
     * 1. The target of texture must be GL_TEXTURE_2D.
     * 2. The texture should not bind to any frameBuffer.
     * 3. PAG will use a shared (OpenGL) context with the current.
     * 4. The caller can use fence sync objects to synchronise texture content (see
     * {@link PAGPlayer#flushAndFenceSync(long[])} and {@link PAGPlayer#waitSync(long)}).
     *
     * @see PAGPlayer#flushAndFenceSync(long[])
     * @see PAGPlayer#waitSync(long)
     */
    public static PAGSurface FromTextureForAsyncThread(int textureID, int width, int height) ;
    /**
     * Create a PAGSurface from specified OpenGL texture, return null if there is no current OpenGL context or the
     * texture is invalid. Note:
     * 1. The target of texture must be GL_TEXTURE_2D.
     * 2. The texture should not bind to any frameBuffer.
     * 3. PAG will use a shared (OpenGL) context with the current.
     * 4. The caller can use fence sync objects to synchronise texture content (see
     * {@link PAGPlayer#flushAndFenceSync(long[])} and {@link PAGPlayer#waitSync(long)}).
     *
     * @see PAGPlayer#flushAndFenceSync(long[])
     * @see PAGPlayer#waitSync(long)
     */
    public static PAGSurface FromTextureForAsyncThread(int textureID, int width, int height, boolean flipY);
    
    /**
     * Returns a bitmap capturing the contents of the PAGSurface. Subsequent rendering of the
     * PAGSurface will not be captured.
     */
    public native Bitmap makeSnapshot();
    

```

### PAGPlayer
PAG 的播放控制类，持有 PAGSurface 和 PAGComposition， 可以通过 setProgress 控制渲染进度， flush 完成当前帧的渲染，
可以通过 getBounds 接口获取各 PAGLayer 相对于 PAGSurface 渲染画布的位置信息， 通过 getLayersUnderPoint 获取特定位置下的所有图层。
```asm
// C++
  /**
   * Returns the current PAGComposition for PAGPlayer to render as content.
   */
  std::shared_ptr<PAGComposition> getComposition();

  /**
   * Sets a new PAGComposition for PAGPlayer to render as content.
   * Note: If the composition is already added to another PAGPlayer, it will be removed from the
   * previous PAGPlayer.
   */
  void setComposition(std::shared_ptr<PAGComposition> newComposition);

  /**
   * Returns the PAGSurface object for PAGPlayer to render onto.
   */
  std::shared_ptr<PAGSurface> getSurface();

  /**
   * Set the PAGSurface object for PAGPlayer to render onto.
   */
  void setSurface(std::shared_ptr<PAGSurface> newSurface);
  
   /**
   * Returns the current progress of play position, the value is from 0.0 to 1.0.
   */
  double getProgress();

  /**
   * Sets the progress of play position, the value ranges from 0.0 to 1.0. It is applied only when
   * the composition is not null.
   */
  void setProgress(double percent);
  
     /**
   * Apply all pending changes to the target surface immediately. Returns true if the content has
   * changed.
   */
  bool flush();
  
   /**
   * Returns a rectangle that defines the displaying area of the specified layer, which is in the
   * coordinate of the PAGSurface.
   */
  Rect getBounds(std::shared_ptr<PAGLayer> pagLayer);   
  
    /**
   * Returns an array of layers that lie under the specified point. The point is in the coordinate
   * space of the PAGSurface.
   */
  std::vector<std::shared_ptr<PAGLayer>> getLayersUnderPoint(float surfaceX, float surfaceY);

```

### PAGView
主要使用在 UI 动画场景，存在 Android、iOS、macOS、Web、微信小程序等平台，iOS 平台继承于 UIView， Andoroid 平台继承于
TextView， PAGView 支持通过本地路径 和 PAGComposition 加载， 调用 play 方法进行播放，内部有一个定时器，同时也提供了
PAGViewListener 的接口监听动画播放的状态，PAGView 内部实现了 PAGPlayer、PAGSurface、PAGComposition 的封装处理。

```asm
// 以 iOS 平台为例
@protocol PAGViewListener <NSObject>

@optional
/**
 * Notifies the start of the animation.
 */
- (void)onAnimationStart:(PAGView*)pagView;

/**
 * Notifies the end of the animation.
 */
- (void)onAnimationEnd:(PAGView*)pagView;

/**
 * Notifies the cancellation of the animation.
 */
- (void)onAnimationCancel:(PAGView*)pagView;

/**
 * Notifies the repetition of the animation.
 */
- (void)onAnimationRepeat:(PAGView*)pagView;

/**
 * Notifies the occurrence of another frame of the animation.
 */
- (void)onAnimationUpdate:(PAGView*)pagView;

@end

/**
 * Adds a listener to the set of listeners that are sent events through the life of an animation,
 * such as start, repeat, and end.
 */
- (void)addListener:(id<PAGViewListener>)listener;

/**
 * Removes a listener from the set listening to this animation.
 */
- (void)removeListener:(id<PAGViewListener>)listener;

/**
 * Indicates whether or not this pag view is playing.
 */
- (BOOL)isPlaying;

/**
 * Start the animation.
 */
- (void)play;

/**
 * Stop the animation.
 */
- (void)stop;

```

### PAGDecoder
PAGDecoder 用于获取 pag 文件的渲染数据，支持通过 PAGComposition 创建，渲染的尺寸和 PAGCompositon 的尺寸一致，
同时增加 sacle 参数支持用户设置渲染尺寸，通过 maxFrameRate 的参数设置最大渲染帧率。
在数据读取层面，支持获取数据为 UIImage 、Bitmap 和 RGBA 数据。

如果 PAGComposition 通过 path 创建（PAGFile 的方法），且没有进行文本编辑、占位图替换和实色图层更换填充颜色，PAGDecoder 渲染的数据支持缓存到本地，下次运行
的时候可以直接加载本地缓存。

```asm
// C++
  /**
   * Creates a PAGDecoder with a PAGComposition, a frame rate limit, and a scale factor for the
   * decoded image size. Please only keep an external reference to the PAGComposition if you need to
   * modify it in the feature. Otherwise, the internal composition will not be released
   * automatically after the associated disk cache is complete, which may cost more memory than
   * necessary. Returns nullptr if the composition is nullptr. Note that the returned PAGDecoder may
   * become invalid if the associated PAGComposition is added to a PAGPlayer or another PAGDecoder.
   */
  static std::shared_ptr<PAGDecoder> MakeFrom(std::shared_ptr<PAGComposition> composition,
                                              float maxFrameRate = 30.0f, float scale = 1.0f);

  /**
   * Returns the width of decoded image frames.
   */
  int width() const {
    return _width;
  }

  /**
   * Returns the height of decoded image frames.
   */
  int height() const {
    return _height;
  }

  /**
   * Returns the number of frames in the PAGDecoder. Note that the value may change if the
   * associated PAGComposition was modified.
   */
  int numFrames();

  /**
   * Returns the frame rate of decoded image frames. The value may change if the associated
   * PAGComposition was modified.
   */
  float frameRate();

  /**
   * Returns true if the frame at the given index has changed since the last readFrame() call. The
   * caller should skip the corresponding reading call if the frame has not changed.
   */
  bool checkFrameChanged(int index);

  /**
   * Reads pixels of the image frame at the given index into the specified memory address. Returns
   * false if failed. Note that caller must ensure that colorType, alphaType, and dstRowBytes stay
   * the same throughout every reading call. Otherwise, it may return false.
   */
  bool readFrame(int index, void* pixels, size_t rowBytes,
                 ColorType colorType = ColorType::RGBA_8888,
                 AlphaType alphaType = AlphaType::Premultiplied);

  /**
   * Reads pixels of the image frame at the given index into the specified HardwareBuffer. Returns
   * false if failed. Reading image frames into HardwareBuffer usually has better performance than
   * reading into memory.
   */
  bool readFrame(int index, HardwareBufferRef hardwareBuffer);
```

### PAGDiskCache
PAGDiskCache 用于读取、设置磁盘缓存大小，以及清除磁盘缓存内容。

```asm
// C++
/**
 * Defines methods to manage the disk cache capabilities.
 */
class PAG_API PAGDiskCache {
 public:
  /**
   * Returns the size limit of the disk cache in bytes. The default value is 1 GB.
   */
  static size_t MaxDiskSize();

  /**
   * Sets the size limit of the disk cache in bytes, which will triggers the cache cleanup if the
   * disk usage exceeds the limit. The opened files are not removed immediately, even if their disk
   * usage exceeds the limit, and they will be rechecked after they are closed.
   */
  static void SetMaxDiskSize(size_t size);

  /**
   * Removes all cached files from the disk. All the opened files will be also removed after they
   * are closed.
   */
  static void RemoveAll();
};
```

### PAGImageView
PAGImageView 主要应用于 UI 列表以及页面中含有多个 pag 文件同时渲染的场景。这些场景使用 PAGView 实现时，页面中需要含有
多个 PAGView，每一个 PAGView 都需要有一个 GPU 的渲染环境，任何一个 GPU 渲染的方案都会有一个初始的屏幕缓冲区开销，从而造成
内存占用的增加。PAGImageView 增加了磁盘缓存的功能，针对渲染过的内容，都会缓存到本地，当所有帧的数据缓存完成后，
就会销毁 PAG 的渲染环境，剩余的就是磁盘数据的读取，实现了pag 文件渲染与素材的无关性。如果 pag 文件的相关内容没有被编辑过
（如编辑文本、替换占位图等），下次加载就会直接读取缓存数据，无需创建 PAG 渲染环境。PAGImageView 的缓存支持两种模式：全磁盘和全内存，
默认为全磁盘模式，此时内存占用是最小的，CPU 占用相对较低，全内存模式的 CPU 占用最低，但内存占用较高，适用于对 CPU 占用要求较高、PAG 文件帧数较少的场景。

```asm
/**
 * If set to true, the PAGImageView loads all image frames into the memory, which will significantly
 * increase the rendering performance but may cost lots of additional memory. Use it when you prefer
 * rendering speed over memory usage. If set to false, the PAGImageView loads only one image frame
 * at a time into the memory. The default value is false.
 */
- (BOOL)cacheAllFramesInMemory;

/**
 * Sets the value of the cacheAllFramesInMemory property.
 */
- (void)setCacheAllFramesInMemory:(BOOL)enable;

```

API 接口层面，PAGImageView 的其它相关接口和 PAGView 类似。

### PAGMovie
PAGMovie 是企业版的组件，继承自 PAGImage，可以直接替换 PAGImageLayer 的占位图。

```asm
// C++
/**
 * A movie used to replace the contents of PAGImageLayers in a PAGFile.
 */
class PAG_API PAGMovie : public PAGImage {
 public:
  /**
   * Creates a PAGMovie from the video path, Return null if the file doesn't exist, or it isn't a
   * valid video file.
   * PAGMovie supports the mov,mp4,m4a,3gp,3g2 and mj2 container formats, and it supports the H264 and H265 encoding formats.
   */
  static std::shared_ptr<PAGMovie> MakeFromFile(const std::string& filePath);

  /**
   * Creates a PAGMovie from the video path, Return null if the file doesn't exist, or it isn't a
   * valid video file，or the start time is more than the origin duration of this movie.
   * PAGMovie supports the mov,mp4,m4a,3gp,3g2 and mj2 container formats, and it supports the H264 and H265 encoding formats.
   */
  static std::shared_ptr<PAGMovie> MakeFromFile(const std::string& filePath, int64_t startTime,
                                                int64_t duration, float speed = 1.0f,
                                                float volume = 1.0f);

  /**
   * Returns the duration of this movie in microseconds, it applies the speed of PAGMovie.
   */
  virtual int64_t duration();
  }
```

### PAGAudioReader
PAGAudioReader 是企业版的组件，用于根据进度读取音频数据，这里的音频数据是 PAG 内置音频数据和 PAGMovie 中音频混合后。

```asm
// C++
/**
   * Creates a PAGAudioReader to read audio frame.
   *
   * @param sampleRate the sample rate of output audio frame
   * @param sampleCount the sample count of output audio frame
   * @param channels the channel count of output audio frame
   * @param volume the volume of output audio frame which is usually in the range [0 - 1.0].
   */
  static std::shared_ptr<PAGAudioReader> Make(int sampleRate = 44100, int sampleCount = 1024,
                                              int channels = 2, float volume = 1.0f);


  /**
   * Sets a new PAGComposition for PAGAudioReader to play as content.
   * Note: If the composition is already added to another PAGAudioReader, it will be removed from
   * the previous PAGAudioReader.
   */
  void setComposition(std::shared_ptr<PAGComposition> newComposition);

  /**
   * Seeks to the specified target time.
   */
  void seek(int64_t toTime);

  /**
   * Read the next audio frame.
   * output format: PCM Signed 16
   * if channels == 1, channel layout is MONO
   * if channels == 2, channel layout is STEREO
   */
  std::shared_ptr<PAGAudioSample> readNextSample();

  /**
   * Returns false if current composition has audio output, e.g. The PAG File has audio bytes or
   * An movie have replaced the contents of PAGImageLayers in a PAGFile
   */
  bool isEmpty();
```


### PAGMovieExporter
PAGMovieExporter 是 企业版的组件，用于将渲染结果导出成视频，不仅仅包含渲染画面，还包含音频数据。

```asm
// C++
/**
   * Create a movie Exporter with the specified composition and output movie config.
   */
  static std::shared_ptr<PAGMovieExporter> Make(
      const std::shared_ptr<PAGComposition>& composition, const PAGExportConfig& config,
      std::shared_ptr<PAGMovieExporter::Callback>& callback);
 /**
   * Start exporting movie asynchronously
   */
  void start() = 0;

  /**
   * Cancel exporting movie
   */
  void cancel() = 0;
 
};

}
```


## 常用方法解读

### PAG 运行时编辑
PAG 的运行时编辑主要分为两类：

 1）修改文本图层的文本信息、替换图片图层中的占位图、修改实色图层中的颜色
```asm
// C++
std::shared_ptr<pag::PAGFile> ReplaceImageOrText() {
  auto pagFile = pag::PAGFile::Load("../../assets/test2.pag");
  if (pagFile == nullptr) {
    return nullptr;
  }
  for (int i = 0; i < pagFile->numImages(); i++) {
    auto pagImage = pag::PAGImage::FromPath("../../assets/scene.png");
    pagFile->replaceImage(i, pagImage);
  }

  for (int i = 0; i < pagFile->numTexts(); i++) {
    auto textDocumentHandle = pagFile->getTextData(i);
    textDocumentHandle->text = "hah哈 哈哈哈哈👌";
    pagFile->replaceText(i, textDocumentHandle);
  }
  return pagFile;
}

```

2） 渲染数编辑
渲染树编辑指的是通过使用 PAGComposition 的相关接口，完成多个图层、多个 pag 文件的自由组合。具体如何使用可以参考下面的代码：

```asm
// 以 OC 版本为例
- (PAGComposition *)makeComposition {
    PAGComposition* compostion = [PAGComposition Make:self.view.bounds.size];
    float itemWidth = self.view.bounds.size.width / 5;
    float itemHeight = 100;
    for (int i = 0; i < 20; i++) {
        PAGFile* pagFile = [self getPAGFile:i / 5 clume:i % 5 name:[NSString stringWithFormat:@"%d", i] itemWidth:itemWidth itemHeight:itemHeight];
        [compostion addLayer:pagFile];
    }
    return compostion;
}

- (PAGFile*)getPAGFile:(int)row clume:(int)colume name:(NSString*)name itemWidth:(float)itemWidth itemHeight:(float)itemHeight {
    PAGFile* pagFile = [PAGFile Load:[[NSBundle mainBundle] pathForResource:name ofType:@"pag"]];
    if (pagFile) {
        float scaleX = itemWidth * 1.0f / [pagFile width];
        CGAffineTransform transform = CGAffineTransformMakeScale(scaleX, scaleX);
        CGAffineTransform tranflate = CGAffineTransformMakeTranslation(itemWidth * colume, row * itemHeight + 150);
        transform = CGAffineTransformConcat(transform, tranflate);
        [pagFile setMatrix:transform];
        [pagFile setStartTime:0];
        [pagFile setDuration:10000000];
    }
    return pagFile;
}

```

### PAG UI 及列表场景使用
当一个页面中含有多个pag 文件时，如果使用多个 PAGView，由于每一个 PAGView 都需要一个独立的渲染环境，内存和 CPU 占用相对较高，推荐的处理方法有两种：

1）通过使用 PAG 的组合模式用将多个 PAG 文件添加到同一个 PAGComposition 中，具体使用方法见运行时编辑，从而将多个渲染环境缩减到一个渲染环境，降低内存和 CPU 占用，
具体可以参考 PAG 的 demo 工程：

Android：https://github.com/libpag/pag-android

iOS： https://github.com/libpag/pag-ios

2）对于一些 UI 列表场景，需要有多个 View 的存在， pag 文件无法添加到一个 PAGComposition 中，此时可以使用 PAGImageView。可以参考 [<font color=blue> UI 场景及列表播放优化</font>](/docs/use-pagimageview.html)


### PAG 字体注册
PAG 除了支持修改文本图层的文本信息外，还支持修改字体。具体方法如下：

（1）通过 PAGFont 获取字体的相关信息，然后赋值给 PAGText，使用到的接口如下：
获取字体信息
```asm
  // C++
  /**
   * Registers a font required by the text layers in pag files, so that they can be rendered as
   * designed.
   */
  static PAGFont RegisterFont(const std::string& fontPath, int ttcIndex,
                              const std::string& fontFamily = "",
                              const std::string& fontStyle = "");
  /**
   * Registers a font required by the text layers in pag files, so that they can be rendered as
   * designed.
   */
  static PAGFont RegisterFont(const void* data, size_t length, int ttcIndex,
                              const std::string& fontFamily = "",
                              const std::string& fontStyle = "");
  PAGFont(std::string fontFamily, std::string fontStyle)
      : fontFamily(std::move(fontFamily)), fontStyle(std::move(fontStyle)) {
  }

  /**
   * A string with the name of the font family.
   **/
  const std::string fontFamily;
  /**
   * A string with the style information — e.g., “bold”, “italic”.
   **/
  const std::string fontStyle;        
```

（2）fontFamlily 和 fontStyle 赋值给 PAGText，PAGText 再填充到 PAGTextLayer 中
```asm
 // C++
   for (int i = 0; i < pagFile->numTexts(); i++) {
    auto textDocumentHandle = pagFile->getTextData(i);
    textDocumentHandle->text = "hah哈 哈哈哈哈👌";
    // Use special font
    auto pagFont = pag::PAGFont::RegisterFont("../../resources/font/NotoSansSC-Regular.otf", 0);
    textDocumentHandle->fontFamily = pagFont.fontFamily;
    textDocumentHandle->fontStyle = pagFont.fontStyle;
    pagFile->replaceText(i, textDocumentHandle);
  }

```
如果使用了特定字体而又没有注册或字体文件中没有包含该字符，PAG 内部（Android、iOS、macOS、Windows 平台）有一个默认字体
列表（同时支持外部设置字体回退列表，外部设置时会覆盖默认设置），会回退到 PAG 的默认字体列表中，此时使用那种字体对于业务方而言是不确定的。

```asm
// C++
  /**
   * Resets the fallback font names. It should be called only once when the application is being
   * initialized.
   */
  static void SetFallbackFontNames(const std::vector<std::string>& fontNames);

  /**
   * Resets the fallback font paths. It should be called only once when the application is being
   * initialized.
   */
  static void SetFallbackFontPaths(const std::vector<std::string>& fontPaths,
                                   const std::vector<int>& ttcIndices);

```

### PAG 视频编辑场景
在视频编辑场景，使用的不是 PAGView，而是 PAGPlayer、PAGSurface 和 PAGComposition。

PAGSurface 可以通过 CVPixelBufferRef 或纹理创建，方便快捷的与视频后编辑中的 CVPixelBuffer 或 纹理进行整合。同时
PAGImage 也支持通过 CVPixelBufferRef 或 纹理创建，通过 PAGPlayer 控制播放进度，将视频内容填充进图片图层的占位图。

```asm
// OC
/**
 * Creates a PAGImage object from the specified CVPixelBuffer, return null if the CVPixelBuffer is
 * invalid.
 */
+ (PAGImage*)FromPixelBuffer:(CVPixelBufferRef)pixelBuffer;

// java
public static PAGImage FromTexture(int textureID, int textureTarget, int width, int height);

public static PAGImage FromTexture(int textureID, int textureTarget, int width, int height, boolean flipY);

```

如果需要导出视频，可以使用 PAG 企业版。

### PAG 软解注入
为什么会有软解注入？PAG 的导出方式中支持 BMP 预合成导出，在 pag 文件中，如果含有 BMP 预合成，一个 BMP 预合成相当于
一个视频，视频则需要解码。 在 PAG SDK 中默认使用硬件解码，但硬件解码存在两个问题：

1）移动端硬件解码器的瞬时存在数目是有限制的，不能无限的创建，如果创建硬件解码器的数目超过限制，就会出现解码器创建失败的情况，在视频编辑场景中需要关注；

2）Android 平台由于机型兼容性、碎片化验证，不能保证所有的机型都能硬件解码成功，因此 Android 平台软解是必须的。

于是，在提供的制品库中， iOS 平台由于没有兼容性的问题，默认是不带软解的，Android 提供了两个包，普通的包默认是内置软解的，noffavc 的包是没有内置软解的。
具体怎么注入软解呢：Android 平台可以选择完整制品库，iOS 平台可以引入 ffavc 。   
```asm
pod 'ffavc'
```
通过如下方法完成软件解码器的注册：

```asm
// OC
-(void)registerSoftwareDecoder {
    // 注册软件解码器工厂指针
    auto factory = ffavc::DecoderFactory::GetHandle();
    [PAGVideoDecoder RegisterSoftwareDecoderFactory:(void*)factory];
    }

```
如果接入方自己的 APP 中已经内置了软解库，可以通过外部注入的方式注入软解。
PAG 官网提供了下面这个软解注入接口，需要业务方基于自己的解码器实现，PAG BMP 预合成中的视频编码格式为 h264。
https://github.com/libpag/ffavc/blob/main/vendor/libpag/include/pag/decoder.h

具体的实现方式可以参考：
https://github.com/libpag/ffavc/blob/main/src/decoder/FFAVCDecoder.cpp

然后自己通过上面提到的方式注入软解。


### PAG 服务端渲染
和 Lottie、SVGA 不同的是，PAG 支持服务端渲染，尽管 PAG 的渲染依赖 OpenGL 环境，但 服务端却可以继续使用 CPU 服务器。
具体实现层面，PAG 通过 swiftshader 在 CPU 服务器上构建出了 OpenGL 环境，使得 pag 文件可以在 CPU 环境中正常渲染。
在服务端的具体使用如下，获取到的是 BGRA 的数据，该数据可以用于视频编码。

```asm
 // C++
  auto pagFile = pag::PAGFile::Load("../../assets/test2.pag");
  auto pagSurface = pag::PAGSurface::MakeOffscreen(pagFile->width(), pagFile->height());
  if (pagSurface == nullptr) {
    printf("---pagSurface is nullptr!!!\n");
    return -1;
  }
  auto pagPlayer = new pag::PAGPlayer();
  pagPlayer->setSurface(pagSurface);
  pagPlayer->setComposition(pagFile);

  auto totalFrames = TimeToFrame(pagFile->duration(), pagFile->frameRate());
  auto currentFrame = 0;

  int bytesLength = pagFile->width() * pagFile->height() * 4;

  while (currentFrame <= totalFrames) {
    pagPlayer->setProgress(currentFrame * 1.0 / totalFrames);
    auto status = pagPlayer->flush();

    // PAG 渲染数据读取
    auto data = new uint8_t[bytesLength];
    pagSurface->readPixels(pag::ColorType::BGRA_8888, pag::AlphaType::Premultiplied, data,
                           pagFile->width() * 4);
    delete[] data;

    currentFrame++;
  }

  delete pagPlayer;

```

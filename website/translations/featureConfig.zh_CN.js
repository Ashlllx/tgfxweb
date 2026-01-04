// List of group
const groups = [
  {
    id: 1,
    name: '图层类型',
    enName: 'Layer Types',
  },
  {
    id: 2,
    name: '混合模式',
    enName: 'Blend Modes',
  },
  {
    id: 3,
    name: '形状图层',
    enName: 'Shapes',
  },
  {
    id: 4,
    name: '2D变换',
    enName: 'Transforms',
  },
  {
    id: 5,
    name: '3D变换',
    enName: '3DTransform',
  },
  {
    id: 6,
    name: '摄像机',
    enName: 'Camera',
  },
  {
    id: 7,
    name: '其他功能',
    enName: 'Others functions',
  },
  {
    id: 8,
    name: '图层样式',
    enName: 'Layer Styles',
  },
  {
    id: 9,
    name: '特效',
    enName: 'Effect',
  },
  {
    id: 10,
    name: '轨道遮罩',
    enName: 'Track Mattes',
  },
  {
    id: 11,
    name: '蒙版',
    enName: 'Masks',
  },
  {
    id: 12,
    name: '文本数据源',
    enName: 'SourceText',
  },
  {
    id: 13,
    name: '文本动效制作工具',
    enName: 'Text Animates',
  },
  {
    id: 14,
    name: '文本路径选项',
    enName: 'Text Path Options',
  },
];

// List of feature compare
const featureCompare = {
  name: 'AE 导出插件',
  group: '技术能力',
  desc: '不支持整体透明度(可能产生叠影)，只支持分散到各个图层的透明度',
  support: {
    // 社区版是否支持
    openSource: false,
    // 企业订阅版是否支持
    enterprise: true,
    // 企业高级版是否支持
    enterprisePlus: true,
    // 企业定制版是否支持
    enterpriseCustom: true,
  },
};

// List of feature,
const features = [
  {
    name: '虚拟对象',
    enName: 'Null Object',
    group: '图层类型',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '实色图层',
    enName: 'Solid Layer',
    group: '图层类型',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '文字图层',
    enName: 'Text Layer',
    group: '图层类型',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '形状图层',
    enName: 'Shape Layer',
    group: '图层类型',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '预合成图层',
    enName: 'PreCompose Layer',
    group: '图层类型',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '图片图层',
    enName: 'Image Layer',
    group: '图层类型',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '定位点',
    enName: 'Anchor Point',
    group: '2D变换',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '位置',
    enName: 'Position',
    group: '2D变换',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '位置分离XY轴',
    enName: 'Position Separated X/Y',
    group: '2D变换',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '缩放',
    enName: 'Scale',
    group: '2D变换',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '旋转',
    enName: 'Rotation',
    group: '2D变换',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '不透明度',
    enName: 'Opacity',
    desc: '不支持整体透明度(可能产生叠影)，只支持分散到各个图层的透明度',
    group: '2D变换',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '锚点',
    enName: 'Anchor Point',
    group: '3D变换',
    version: '4.2+',
    support: {
      openSource: false,
      enterprise: true,
    },
  },
  {
    name: '位置',
    enName: 'Position',
    group: '3D变换',
    version: '4.2+',
    support: {
      openSource: false,
      enterprise: true,
    },
  },
  {
    name: '位置分离 XYZ 轴',
    enName: 'Position Separated X/Y/Z',
    group: '3D变换',
    version: '4.2+',
    support: {
      openSource: false,
      enterprise: true,
    },
  },
  {
    name: '缩放',
    enName: 'Scale',
    group: '3D变换',
    version: '4.2+',
    support: {
      openSource: false,
      enterprise: true,
    },
  },
  {
    name: '方向',
    enName: 'Orientation',
    group: '3D变换',
    version: '4.2+',
    support: {
      openSource: false,
      enterprise: true,
    },
  },
  {
    name: '旋转',
    enName: 'Rotation X Y Z',
    group: '3D变换',
    version: '4.2+',
    support: {
      openSource: false,
      enterprise: true,
    },
  },
  {
    name: '不透明度',
    enName: 'Opacity',
    desc: '不支持整体透明度(可能产生叠影)，只支持分散到各个图层的透明度',
    group: '3D变换',
    version: '4.2+',
    support: {
      openSource: false,
      enterprise: true,
    },
  },
  {
    name: '目标点',
    enName: 'Point of Interest',
    group: '摄像机',
    version: '4.2+',
    support: {
      openSource: false,
      enterprise: true,
    },
  },
  {
    name: '位置',
    enName: 'Position',
    group: '摄像机',
    version: '4.2+',
    support: {
      openSource: false,
      enterprise: true,
    },
  },
  {
    name: '方向',
    enName: 'Orientation',
    group: '摄像机',
    version: '4.2+',
    support: {
      openSource: false,
      enterprise: true,
    },
  },
  {
    name: '旋转',
    enName: 'Rotation X Y Z',
    group: '摄像机',
    version: '4.2+',
    support: {
      openSource: false,
      enterprise: true,
    },
  },
  {
    name: '摄像机选项 - 缩放',
    enName: 'Camera Options Zoom',
    group: '摄像机',
    version: '4.2+',
    support: {
      openSource: false,
      enterprise: true,
    },
  },
  {
    name: 'BMP 预合成',
    enName: 'BMP Composition',
    desc: '可指定部分图层以截图方式导出，支持所有 AE 特性',
    group: '其他功能',
    version: '2.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '正常',
    enName: 'Normal',
    group: '混合模式',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '变暗',
    enName: 'Darken',
    group: '混合模式',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '相乘',
    enName: 'Multiply',
    group: '混合模式',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '颜色加深',
    enName: 'ColorBurn',
    group: '混合模式',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '相加',
    enName: 'Add',
    group: '混合模式',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '变亮',
    enName: 'Lighten',
    group: '混合模式',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '屏幕',
    enName: 'Screen',
    group: '混合模式',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '颜色减淡',
    enName: 'ColorDodge',
    group: '混合模式',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '叠加',
    enName: 'Overlay',
    group: '混合模式',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '柔光',
    enName: 'SoftLight',
    group: '混合模式',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '强光',
    enName: 'HardLight',
    group: '混合模式',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '差值',
    enName: 'Difference',
    group: '混合模式',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '排除',
    enName: 'Exclusion',
    group: '混合模式',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '色相',
    enName: 'Hue',
    group: '混合模式',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '饱和度',
    enName: 'Saturation',
    group: '混合模式',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '颜色',
    enName: 'Color',
    group: '混合模式',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '发光度',
    enName: 'Luminosity',
    group: '混合模式',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '无遮罩',
    enName: 'None',
    group: '轨道遮罩',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Alpha 遮罩',
    enName: 'Alpha Matte',
    desc: '',
    group: '轨道遮罩',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Alpha 反转遮罩',
    enName: 'Alpha Inverted Matte',
    desc: '',
    group: '轨道遮罩',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Luma 遮罩',
    enName: 'Luma Matte',
    desc: '',
    group: '轨道遮罩',
    version: '4.1+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Luma 反转遮罩',
    enName: 'Luma Inverted Matte',
    desc: '',
    group: '轨道遮罩',
    version: '4.1+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '蒙版路径',
    enName: 'Mask Path',
    group: '蒙版',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '蒙版扩展',
    enName: 'Mask Expansion',
    group: '蒙版',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '蒙版模式',
    enName: 'Mask Modes',
    desc: '无 (None)\n相加 (Add)\n相减 (Subtract)\n交集 (Intersect)\n差值 (Difference)',
    group: '蒙版',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '蒙版不透明度',
    enName: 'Mask Opacity',
    group: '蒙版',
    version: '4.1+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '蒙版羽化',
    enName: 'Mask Feather',
    group: '蒙版',
    version: '4.1+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '投影',
    enName: 'Drop Shadow',
    desc: '颜色 (Color)\n不透明度 (Opacity)\n角度 (Angle)\n距离 (Distance)\n扩展 (Spread)\n大小 (Size)',
    group: '图层样式',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '渐变叠加',
    enName: 'Gradient Overlay',
    group: '图层样式',
    version: '4.1+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '描边',
    enName: 'Stroke',
    group: '图层样式',
    version: '4.3+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '外发光',
    enName: 'Outer Glow',
    group: '图层样式',
    version: '4.3+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '置换效果',
    enName: 'Displacement Map',
    desc: '',
    group: '特效',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '运动模糊',
    enName: 'Motion Blur',
    group: '特效',
    version: '2.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '高斯模糊',
    enName: 'Gaussian Blur',
    group: '特效',
    version: '2.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '凹凸效果',
    enName: 'Bulge',
    group: '特效',
    version: '2.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '辉光效果',
    enName: 'Glow',
    group: '特效',
    version: '2.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '色阶控制',
    enName: 'Levels Individual Controls',
    group: '特效',
    version: '2.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '边角定位',
    enName: 'Corner Pin',
    group: '特效',
    version: '2.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '动态拼贴',
    enName: 'Motion Tile',
    group: '特效',
    version: '2.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '径向模糊',
    enName: 'Radial Blur',
    group: '特效',
    version: '3.2+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '马赛克',
    enName: 'Mosaic',
    group: '特效',
    version: '3.2+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '亮度和对比度',
    enName: 'Brightness & Contrast',
    group: '特效',
    version: '4.2+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '色相/饱和度',
    enName: 'Hue Saturation',
    group: '特效',
    version: '4.2+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '组',
    enName: 'Group',
    group: '形状图层',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '矩形',
    enName: 'Rectangle',
    group: '形状图层',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '椭圆',
    enName: 'Ellipse',
    group: '形状图层',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '多边星形 ',
    enName: 'Polystar',
    group: '形状图层',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '路径',
    enName: 'Path',
    group: '形状图层',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '填充',
    enName: 'Fill',
    group: '形状图层',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '描边',
    enName: 'Stroke',
    group: '形状图层',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '合并路径',
    enName: 'Merge Paths',
    group: '形状图层',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '中继器',
    enName: 'Repeater',
    group: '形状图层',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '修剪路径',
    enName: 'Trim Paths',
    group: '形状图层',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '圆角',
    enName: 'Round Corners',
    group: '形状图层',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '渐变填充',
    enName: 'Gradient Fill',
    group: '形状图层',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '渐变描边',
    enName: 'Gradient Stroke',
    group: '形状图层',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '基线偏移',
    enName: 'Baseline Shift',
    group: '文本数据源',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '点文本',
    enName: 'Point Text',
    group: '文本数据源',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '带框文本',
    enName: 'Box Text',
    group: '文本数据源',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '仿粗体',
    enName: 'Faux Bold',
    group: '文本数据源',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '仿斜体',
    enName: 'Faux Italic',
    group: '文本数据源',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '文本颜色',
    enName: 'Fill Color',
    group: '文本数据源',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '字体名称',
    enName: 'Font Family',
    group: '文本数据源',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '字体样式',
    enName: 'Font Style',
    group: '文本数据源',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '字号',
    enName: 'Font Size',
    group: '文本数据源',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '描边颜色',
    enName: 'Stroke Color',
    group: '文本数据源',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '描边宽度',
    enName: 'Stroke Width',
    group: '文本数据源',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '交换图层和描边',
    enName: 'Stroke Over Fill',
    group: '文本数据源',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '行距',
    enName: 'Leading',
    group: '文本数据源',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '字间距',
    enName: 'Tracking',
    group: '文本数据源',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '文本对齐',
    enName: 'Paragraph Justification',
    desc: '左对齐 (Left)\n居中对齐 (Center)\n右对齐 (Right)\n最后一行左对齐 (Full Justify Last Line Left)\n最后一行居中对齐 (Full Justify Last Line Center)\n最后一行右对齐 (Full Justify Last Line Right)\n两端对齐 (Full Justify Last Line Full)',
    group: '文本数据源',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '属性',
    enName: 'property',
    desc: '字间距 (Tracking)\n字符间距类型 (Track Type)\n字符间距大小 (Tracking Amount)\n位置 (Position)\n旋转 (Rotation)\n缩放 (Scale)\n不透明度 (Opacity)',
    group: '文本动效制作工具',
    version: '3.2+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '范围选择器',
    enName: 'Range Selector',
    descList: [
      {
        title: '起始',
        enTitle: '(Start)',
      },
      {
        title: '结束',
        enTitle: '(End)',
      },
      {
        title: '偏移',
        enTitle: '(Offset)',
      },
      {
        title: '单位',
        enTitle: '(Units)',
        content: '仅支持默认值"百分比"',
      },
      {
        title: '依据',
        enTitle: '(Based On)',
        content: '仅支持默认值"字符"',
      },
      {
        title: '模式',
        enTitle: '(Mode)',
      },
      {
        title: '数量',
        enTitle: '(Amount)',
      },
      {
        title: '形状',
        enTitle: '(Shape)',
      },
      {
        title: '平滑度',
        enTitle: '(Smoothness)',
        content: '仅支持默认值 100%',
      },
      {
        title: '缓和高',
        enTitle: '(Ease High)',
        content: '除三角形，其他仅支持默认值 0%',
      },
      {
        title: '缓和低',
        enTitle: '(Ease Low)',
        content: '除三角形，其他仅支持默认值 0%',
      },
      {
        title: '随机排序',
        enTitle: '(Randomize Order)',
      },
      {
        title: '随机植入',
        enTitle: '(Random Seed)',
      },
    ],
    group: '文本动效制作工具',
    version: '3.2+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '摆动选择器',
    enName: 'Wiggly Selector',
    descList: [
      {
        title: '模式',
        enTitle: '(Mode)',
      },
      {
        title: '最大量',
        enTitle: '(Max Amount)',
      },
      {
        title: '最小量',
        enTitle: '(Min Amount)',
      },
      {
        title: '依据',
        enTitle: '(Based On)',
        content: '仅支持默认值"字符"',
      },
      {
        title: '摇摆/秒',
        enTitle: '(Wiggly Per Second)',
      },
      {
        title: '关联',
        enTitle: '(Correlation)',
      },
      {
        title: '时间相位',
        enTitle: '(Temporal Phase)',
      },
      {
        title: '空间相位',
        enTitle: '(Spatial Phase)',
      },
      {
        title: '随机植入',
        enTitle: '(Random Seed)',
      },
    ],
    group: '文本动效制作工具',
    version: '3.2+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '路径',
    enName: 'Path',
    group: '文本路径选项',
    version: '4.1+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '反转路径',
    enName: 'Reverse Path',
    group: '文本路径选项',
    version: '4.1+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '垂直于路径',
    enName: 'Perpendicular To Path',
    group: '文本路径选项',
    version: '4.1+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '强制对齐',
    enName: 'Force Alignment',
    group: '文本路径选项',
    version: '4.1+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '首字边距',
    enName: 'First Margin',
    group: '文本路径选项',
    version: '4.1+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: '末字边距',
    enName: 'Last Margin',
    group: '文本路径选项',
    version: '4.1+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
];

const featureConfig = {
  /**
   * List of feature
   */
  features: features,
  groups: groups,
};

module.exports = featureConfig;

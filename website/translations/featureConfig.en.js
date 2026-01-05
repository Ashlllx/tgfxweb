// List of group
const groups = [
  {
    id: 1,
    name: 'Layer Types',
    enName: 'Layer Types',
  },
  {
    id: 2,
    name: 'Blend Modes',
    enName: 'Blend Modes',
  },
  {
    id: 3,
    name: 'Shapes',
    enName: 'Shapes',
  },
  {
    id: 4,
    name: 'Transforms',
    enName: 'Transforms',
  },
  {
    id: 5,
    name: '3DTransform',
    enName: '3DTransform',
  },
  {
    id: 6,
    name: 'Camera',
    enName: 'Camera',
  },
  {
    id: 7,
    name: 'Others functions',
    enName: 'Others functions',
  },
  {
    id: 8,
    name: 'Layer Styles',
    enName: 'Layer Styles',
  },
  {
    id: 9,
    name: 'Effect',
    enName: 'Effect',
  },
  {
    id: 10,
    name: 'Track Mattes',
    enName: 'Track Mattes',
  },
  {
    id: 11,
    name: 'Masks',
    enName: 'Masks',
  },
  {
    id: 12,
    name: 'SourceText',
    enName: 'SourceText',
  },
  {
    id: 13,
    name: 'Text Animates',
    enName: 'Text Animates',
  },
  {
    id: 14,
    name: 'Text Path Options',
    enName: 'Text Path Options',
  },
];

// List of feature compare
const featureCompare = {
  name: 'AE (After Effects) Export Plugins',
  group: 'Technical abilities',
  desc: 'For better performance, only supports transparency separately applied to individual layers..',
  support: {
    // Open source version support
    openSource: false,
    // Enterprise subscription support
    enterprise: true,
    // Enterprise plus support
    enterprisePlus: true,
    // Enterprise custom support
    enterpriseCustom: true,
  },
};

// List of feature,
const features = [
  {
    name: 'Null Object',
    enName: 'Null Object',
    group: 'Layer Types',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Solid Layer',
    enName: 'Solid Layer',
    group: 'Layer Types',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Text Layer',
    enName: 'Text Layer',
    group: 'Layer Types',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Shape Layer',
    enName: 'Shape Layer',
    group: 'Layer Types',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'PreCompose Layer',
    enName: 'PreCompose Layer',
    group: 'Layer Types',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Image Layer',
    enName: 'Image Layer',
    group: 'Layer Types',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Anchor Point',
    enName: 'Anchor Point',
    group: 'Transforms',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Position',
    enName: 'Position',
    group: 'Transforms',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Position Separated X/Y',
    enName: 'Position Separated X/Y',
    group: 'Transforms',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Scale',
    enName: 'Scale',
    group: 'Transforms',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Rotation',
    enName: 'Rotation',
    group: 'Transforms',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Opacity',
    enName: 'Opacity',
    desc: 'For better performance, only supports transparency separately applied to individual layers.',
    group: 'Transforms',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Anchor Point',
    enName: 'Anchor Point',
    group: '3DTransform',
    version: '4.2+',
    support: {
      openSource: false,
      enterprise: true,
    },
  },
  {
    name: 'Position',
    enName: 'Position',
    group: '3DTransform',
    version: '4.2+',
    support: {
      openSource: false,
      enterprise: true,
    },
  },
  {
    name: 'Position Separated X/Y/Z',
    enName: 'Position Separated X/Y/Z',
    group: '3DTransform',
    version: '4.2+',
    support: {
      openSource: false,
      enterprise: true,
    },
  },
  {
    name: 'Scale',
    enName: 'Scale',
    group: '3DTransform',
    version: '4.2+',
    support: {
      openSource: false,
      enterprise: true,
    },
  },
  {
    name: 'Orientation',
    enName: 'Orientation',
    group: '3DTransform',
    version: '4.2+',
    support: {
      openSource: false,
      enterprise: true,
    },
  },
  {
    name: 'Rotation X Y Z',
    enName: 'Rotation X Y Z',
    group: '3DTransform',
    version: '4.2+',
    support: {
      openSource: false,
      enterprise: true,
    },
  },
  {
    name: 'Opacity',
    enName: 'Opacity',
    desc: 'For better performance, only supports transparency separately applied to individual layers.',
    group: '3DTransform',
    version: '4.2+',
    support: {
      openSource: false,
      enterprise: true,
    },
  },
  {
    name: 'Point of Interest',
    enName: 'Point of Interest',
    group: 'Camera',
    version: '4.2+',
    support: {
      openSource: false,
      enterprise: true,
    },
  },
  {
    name: 'Position',
    enName: 'Position',
    group: 'Camera',
    version: '4.2+',
    support: {
      openSource: false,
      enterprise: true,
    },
  },
  {
    name: 'Orientation',
    enName: 'Orientation',
    group: 'Camera',
    version: '4.2+',
    support: {
      openSource: false,
      enterprise: true,
    },
  },
  {
    name: 'Rotation X Y Z',
    enName: 'Rotation X Y Z',
    group: 'Camera',
    version: '4.2+',
    support: {
      openSource: false,
      enterprise: true,
    },
  },
  {
    name: 'Camera Options Zoom',
    enName: 'Camera Options Zoom',
    group: 'Camera',
    version: '4.2+',
    support: {
      openSource: false,
      enterprise: true,
    },
  },
  {
    name: 'BMP Composition',
    enName: 'BMP Composition',
    desc: 'Specify certain compositions to be exported as image sequences that can support all AE features.',
    group: 'Others functions',
    version: '2.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Normal',
    enName: 'Normal',
    group: 'Blend Modes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Darken',
    enName: 'Darken',
    group: 'Blend Modes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Multiply',
    enName: 'Multiply',
    group: 'Blend Modes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'ColorBurn',
    enName: 'ColorBurn',
    group: 'Blend Modes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Add',
    enName: 'Add',
    group: 'Blend Modes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Lighten',
    enName: 'Lighten',
    group: 'Blend Modes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Screen',
    enName: 'Screen',
    group: 'Blend Modes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'ColorDodge',
    enName: 'ColorDodge',
    group: 'Blend Modes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Overlay',
    enName: 'Overlay',
    group: 'Blend Modes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'SoftLight',
    enName: 'SoftLight',
    group: 'Blend Modes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'HardLight',
    enName: 'HardLight',
    group: 'Blend Modes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Difference',
    enName: 'Difference',
    group: 'Blend Modes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Exclusion',
    enName: 'Exclusion',
    group: 'Blend Modes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Hue',
    enName: 'Hue',
    group: 'Blend Modes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Saturation',
    enName: 'Saturation',
    group: 'Blend Modes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Color',
    enName: 'Color',
    group: 'Blend Modes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Luminosity',
    enName: 'Luminosity',
    group: 'Blend Modes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'None',
    enName: 'None',
    group: 'Track Mattes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Alpha Matte',
    enName: 'Alpha Matte',
    desc: '',
    group: 'Track Mattes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Alpha Inverted Matte',
    enName: 'Alpha Inverted Matte',
    desc: '',
    group: 'Track Mattes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Luma Matte',
    enName: 'Luma Matte',
    desc: '',
    group: 'Track Mattes',
    version: '4.1+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Luma Inverted Matte',
    enName: 'Luma Inverted Matte',
    desc: '',
    group: 'Track Mattes',
    version: '4.1+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Mask Path',
    enName: 'Mask Path',
    group: 'Masks',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Mask Expansion',
    enName: 'Mask Expansion',
    group: 'Masks',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Mask Modes',
    enName: 'Mask Modes',
    desc: 'None (None)\nAdd (Add)\nSubtract (Subtract)\nIntersect (Intersect)\nDifference (Difference)',
    group: 'Masks',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Mask Opacity',
    enName: 'Mask Opacity',
    group: 'Masks',
    version: '4.1+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Mask Feather',
    enName: 'Mask Feather',
    group: 'Masks',
    version: '4.1+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Drop Shadow',
    enName: 'Drop Shadow',
    desc: 'Color (Color)\nOpacity (Opacity)\nAngle (Angle)\nDistance (Distance)\nSpread (Spread)\nSize (Size)',
    group: 'Layer Styles',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Gradient Overlay',
    enName: 'Gradient Overlay',
    group: 'Layer Styles',
    version: '4.1+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Stroke',
    enName: 'Stroke',
    group: 'Layer Styles',
    version: '4.3+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Outer Glow',
    enName: 'Outer Glow',
    group: 'Layer Styles',
    version: '4.3+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Displacement Map',
    enName: 'Displacement Map',
    desc: '',
    group: 'Effect',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Motion Blur',
    enName: 'Motion Blur',
    group: 'Effect',
    version: '2.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Gaussian Blur',
    enName: 'Gaussian Blur',
    group: 'Effect',
    version: '2.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Bulge',
    enName: 'Bulge',
    group: 'Effect',
    version: '2.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Glow',
    enName: 'Glow',
    group: 'Effect',
    version: '2.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Levels Individual Controls',
    enName: 'Levels Individual Controls',
    group: 'Effect',
    version: '2.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Corner Pin',
    enName: 'Corner Pin',
    group: 'Effect',
    version: '2.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Motion Tile',
    enName: 'Motion Tile',
    group: 'Effect',
    version: '2.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Radial Blur',
    enName: 'Radial Blur',
    group: 'Effect',
    version: '3.2+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Mosaic',
    enName: 'Mosaic',
    group: 'Effect',
    version: '3.2+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Brightness & Contrast',
    enName: 'Brightness & Contrast',
    group: 'Effect',
    version: '4.2+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Hue Saturation',
    enName: 'Hue Saturation',
    group: 'Effect',
    version: '4.2+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Group',
    enName: 'Group',
    group: 'Shapes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Rectangle',
    enName: 'Rectangle',
    group: 'Shapes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Ellipse',
    enName: 'Ellipse',
    group: 'Shapes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Polystar ',
    enName: 'Polystar',
    group: 'Shapes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Path',
    enName: 'Path',
    group: 'Shapes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Fill',
    enName: 'Fill',
    group: 'Shapes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Stroke',
    enName: 'Stroke',
    group: 'Shapes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Merge Paths',
    enName: 'Merge Paths',
    group: 'Shapes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Repeater',
    enName: 'Repeater',
    group: 'Shapes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Trim Paths',
    enName: 'Trim Paths',
    group: 'Shapes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Round Corners',
    enName: 'Round Corners',
    group: 'Shapes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Gradient Fill',
    enName: 'Gradient Fill',
    group: 'Shapes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Gradient Stroke',
    enName: 'Gradient Stroke',
    group: 'Shapes',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Baseline Shift',
    enName: 'Baseline Shift',
    group: 'SourceText',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Point Text',
    enName: 'Point Text',
    group: 'SourceText',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Box Text',
    enName: 'Box Text',
    group: 'SourceText',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Faux Bold',
    enName: 'Faux Bold',
    group: 'SourceText',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Faux Italic',
    enName: 'Faux Italic',
    group: 'SourceText',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Fill Color',
    enName: 'Fill Color',
    group: 'SourceText',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Font Family',
    enName: 'Font Family',
    group: 'SourceText',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Font Style',
    enName: 'Font Style',
    group: 'SourceText',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Font Size',
    enName: 'Font Size',
    group: 'SourceText',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Stroke Color',
    enName: 'Stroke Color',
    group: 'SourceText',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Stroke Width',
    enName: 'Stroke Width',
    group: 'SourceText',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Stroke Over Fill',
    enName: 'Stroke Over Fill',
    group: 'SourceText',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Leading',
    enName: 'Leading',
    group: 'SourceText',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Tracking',
    enName: 'Tracking',
    group: 'SourceText',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Paragraph Justification',
    enName: 'Paragraph Justification',
    desc: 'Left (Left)\nCenter (Center)\nRight (Right)\nFull Justify Last Line Left\nFull Justify Last Line Center (Full Justify Last Line Center)\nFull Justify Last Line Right (Full Justify Last Line Right)\nFull Justify Last Line Full (Full Justify Last Line Full)',
    group: 'SourceText',
    version: '1.0+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'property',
    enName: 'property',
    desc: 'Tracking (Tracking)\nTrack Type (Track Type)\nTracking Amount (Tracking Amount)\nPosition (Position)\nRotation (Rotation)\nScale (Scale)\nOpacity (Opacity)',
    group: 'Text Animates',
    version: '3.2+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Range Selector',
    enName: 'Range Selector',
    descList: [
      {
        title: 'Start',
        enTitle: '(Start)',
      },
      {
        title: 'End',
        enTitle: '(End)',
      },
      {
        title: 'Offset',
        enTitle: '(Offset)',
      },
      {
        title: 'Units',
        enTitle: '(Units)',
        content: 'Only "Percentage" is supported.',
      },
      {
        title: 'Based On',
        enTitle: '(Based On)',
        content: 'Only "Characters" is supported.',
      },
      {
        title: 'Mode',
        enTitle: '(Mode)',
      },
      {
        title: 'Amount',
        enTitle: '(Amount)',
      },
      {
        title: 'Shape',
        enTitle: '(Shape)',
      },
      {
        title: 'Smoothness',
        enTitle: '(Smoothness)',
        content: 'Only "100%" is supported.',
      },
      {
        title: 'Ease High',
        enTitle: '(Ease High)',
        content: 'Except for triangles, only "0%" is supported.',
      },
      {
        title: 'Ease Low',
        enTitle: '(Ease Low)',
        content: 'Except for triangles, only "0%" is supported.',
      },
      {
        title: 'Randomize Order',
        enTitle: '(Randomize Order)',
      },
      {
        title: 'Random Seed',
        enTitle: '(Random Seed)',
      },
    ],
    group: 'Text Animates',
    version: '3.2+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Wiggly Selector',
    enName: 'Wiggly Selector',
    descList: [
      {
        title: 'Mode',
        enTitle: '(Mode)',
      },
      {
        title: 'Max Amount',
        enTitle: '(Max Amount)',
      },
      {
        title: 'Min Amount',
        enTitle: '(Min Amount)',
      },
      {
        title: 'Based On',
        enTitle: '(Based On)',
        content: 'Only "Characters" is supported.',
      },
      {
        title: 'Wiggly Per Second',
        enTitle: '(Wiggly Per Second)',
      },
      {
        title: 'Correlation',
        enTitle: '(Correlation)',
      },
      {
        title: 'Temporal Phase',
        enTitle: '(Temporal Phase)',
      },
      {
        title: 'Spatial Phase',
        enTitle: '(Spatial Phase)',
      },
      {
        title: 'Random Seed',
        enTitle: '(Random Seed)',
      },
    ],
    group: 'Text Animates',
    version: '3.2+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Path',
    enName: 'Path',
    group: 'Text Path Options',
    version: '4.1+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Reverse Path',
    enName: 'Reverse Path',
    group: 'Text Path Options',
    version: '4.1+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Perpendicular To Path',
    enName: 'Perpendicular To Path',
    group: 'Text Path Options',
    version: '4.1+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Force Alignment',
    enName: 'Force Alignment',
    group: 'Text Path Options',
    version: '4.1+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'First Margin',
    enName: 'First Margin',
    group: 'Text Path Options',
    version: '4.1+',
    support: {
      openSource: true,
      enterprise: true,
    },
  },
  {
    name: 'Last Margin',
    enName: 'Last Margin',
    group: 'Text Path Options',
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

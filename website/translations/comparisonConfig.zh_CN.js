// featureCompare
const comparisonFeature = {
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

// List of compare feature,
const comparisonFeatures = [
  {
    name: 'AE 导出插件',
    group: '技术能力',
    desc: '',
    support: {
      openSource: true,
      enterprise: true,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: '桌面预览工具',
    group: '技术能力',
    desc: '',
    support: {
      openSource: true,
      enterprise: true,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: 'SDK 全平台支持',
    group: '技术能力',
    desc: '',
    support: {
      openSource: true,
      enterprise: true,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: '磁盘缓存能力',
    group: '技术能力',
    desc: '针对 UI 场景优化，内存占用更低，性能更好',
    support: {
      openSource: true,
      enterprise: true,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: '通用 AE 特性',
    group: '技术能力',
    desc: '高阶特性除外',
    support: {
      openSource: true,
      enterprise: true,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: '高阶 AE 特性',
    group: '技术能力',
    desc: '企业版专属特性请参考下方 AE 特性支持列表',
    support: {
      openSource: false,
      enterprise: true,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: '音频播放',
    group: '技术能力',
    desc: '',
    support: {
      openSource: false,
      enterprise: true,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: '占位图替换视频',
    group: '技术能力',
    desc: '',
    support: {
      openSource: false,
      enterprise: true,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: '导出视频文件',
    group: '技术能力',
    desc: '',
    support: {
      openSource: false,
      enterprise: true,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: 'PAG 官方论坛',
    group: '服务支持',
    desc: '社区互助答疑，官方不定期答疑',
    support: {
      openSource: true,
      enterprise: true,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: '内侧功能体验',
    group: '服务支持',
    desc: '抢先体验内测的最新功能，并获得一对一即时技术支持',
    support: {
      openSource: true,
      enterprise: true,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: '业务即时对接群',
    group: '服务支持',
    desc: '官方团队一对一专业对接，工作时间内即时响应',
    support: {
      openSource: false,
      enterprise: true,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: '素材性能优化指导',
    group: '服务支持',
    desc: '',
    support: {
      openSource: false,
      enterprise: true,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: '业务最佳实践指导',
    group: '服务支持',
    desc: '',
    support: {
      openSource: false,
      enterprise: true,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: '定向发包',
    group: '服务支持',
    desc: '针对具体业务单独发包，线上问题解决更及时',
    support: {
      openSource: false,
      enterprise: false,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: '线上问题 7x24 小时响应',
    group: '服务支持',
    desc: '全天候响应，深入业务协助排查线上紧急问题',
    support: {
      openSource: false,
      enterprise: false,
      enterprisePlus: false,
      enterpriseCustom: true,
    },
  },
  {
    name: '专业技术培训',
    group: '服务支持',
    desc: '可针对研发和设计师的使用问题集中培训',
    support: {
      openSource: false,
      enterprise: false,
      enterprisePlus: false,
      enterpriseCustom: true,
    },
  },
  {
    name: '新功能和 AE 特性定制',
    group: '服务支持',
    desc: '',
    support: {
      openSource: false,
      enterprise: false,
      enterprisePlus: false,
      enterpriseCustom: true,
    },
  },
  {
    name: '免费升级',
    group: '授权方式',
    desc: '续费期内免费升级 SDK 到最新版本',
    support: {
      openSource: false,
      enterprise: true,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: '一年有效 License',
    group: '授权方式',
    desc: '单 App 授权，过期后需下发新证书用户侧才可继续使用',
    support: {
      openSource: false,
      enterprise: true,
      enterprisePlus: 'N / A',
      enterpriseCustom: 'N / A',
    },
  },
  {
    name: '长期有效 License',
    group: '授权方式',
    desc: '单 App 授权，当前版本号永久有效，用户侧无需更新证书',
    support: {
      openSource: false,
      enterprise: false,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: '多 App 批量授权',
    group: '授权方式',
    desc: '总价低于分别独立授权，需为同一业务下多个子 App',
    support: {
      openSource: false,
      enterprise: false,
      enterprisePlus: false,
      enterpriseCustom: true,
    },
  },
];

const comparisonConfig = {
  /**
   * List of compare feature,
   */
  features: comparisonFeatures,
};

module.exports = comparisonConfig;

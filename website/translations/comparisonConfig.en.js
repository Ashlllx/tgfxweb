// featureCompare
const comparisonFeature = {
  name: 'AE Export Plugins',
  group: 'Capabilities',
  desc: 'Does not support global transparency (which may cause ghosting), only supports transparency dispersed across individual layers.',
  support: {
    // Whether the community version supports it
    openSource: false,
    // Whether the enterprise subscription version supports it
    enterprise: true,
    // Whether the enterprise advanced version supports it
    enterprisePlus: true,
    // Whether the enterprise custom version supports it
    enterpriseCustom: true,
  },
};

// List of compare features
const comparisonFeatures = [
  {
    name: 'AE Export Plugins',
    group: 'Capabilities',
    desc: '',
    support: {
      openSource: true,
      enterprise: true,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: 'Desktop Preview Tools',
    group: 'Capabilities',
    desc: '',
    support: {
      openSource: true,
      enterprise: true,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: 'Full Platform SDK',
    group: 'Capabilities',
    desc: '',
    support: {
      openSource: true,
      enterprise: true,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: 'Disk Cache Support',
    group: 'Capabilities',
    desc: 'Optimized for UI scenarios with lower memory usage and better performance.',
    support: {
      openSource: true,
      enterprise: true,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: 'Common AE Features',
    group: 'Capabilities',
    desc: 'Advanced features not included.',
    support: {
      openSource: true,
      enterprise: true,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: 'Advanced AE Features',
    group: 'Capabilities',
    desc: 'Please refer to the AE Features chart below.',
    support: {
      openSource: false,
      enterprise: true,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: 'Audio Playback',
    group: 'Capabilities',
    desc: '',
    support: {
      openSource: false,
      enterprise: true,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: 'Video Replacement',
    group: 'Capabilities',
    desc: '',
    support: {
      openSource: false,
      enterprise: true,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: 'Video Exporting',
    group: 'Capabilities',
    desc: '',
    support: {
      openSource: false,
      enterprise: true,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: 'PAG Discussions',
    group: 'Services',
    desc: 'Help each other in the PAG community.',
    support: {
      openSource: true,
      enterprise: true,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: 'Beta Early Access',
    group: 'Services',
    desc: 'Free access to pre-release versions of PAG SDK.',
    support: {
      openSource: true,
      enterprise: true,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: 'Standard Technical Support',
    group: 'Services',
    desc: 'Get one-on-one technical support from experts of the PAG official team.',
    support: {
      openSource: false,
      enterprise: true,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: 'Animation Performance Guidance',
    group: 'Services',
    desc: '',
    support: {
      openSource: false,
      enterprise: true,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: 'Development Best Practices Guidance',
    group: 'Services',
    desc: '',
    support: {
      openSource: false,
      enterprise: true,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: 'Custom SDK Releases',
    group: 'Services',
    desc: 'Build custom SDK releases specifically for your business to fix online issues more quickly.',
    support: {
      openSource: false,
      enterprise: false,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: '7x24 Technical Support',
    group: 'Services',
    desc: 'Get 7x24 instant help from the PAG official team for any urgent online issues.',
    support: {
      openSource: false,
      enterprise: false,
      enterprisePlus: false,
      enterpriseCustom: true,
    },
  },
  {
    name: 'Technical Training',
    group: 'Services',
    desc: 'Professional training for R&D and designers regarding usage issues.',
    support: {
      openSource: false,
      enterprise: false,
      enterprisePlus: false,
      enterpriseCustom: true,
    },
  },
  {
    name: 'Custom AE Features',
    group: 'Services',
    desc: '',
    support: {
      openSource: false,
      enterprise: false,
      enterprisePlus: false,
      enterpriseCustom: true,
    },
  },
  {
    name: 'Free Upgrades',
    group: 'Licensing',
    desc: 'You can upgrade to the latest SDK version for free during the paid period.',
    support: {
      openSource: false,
      enterprise: true,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: 'Subscription License',
    group: 'Licensing',
    desc: 'Only valid for one year and one app (both Android & iOS). The app users need to receive a new license to continue using the SDK.',
    support: {
      openSource: false,
      enterprise: true,
      enterprisePlus: 'N / A',
      enterpriseCustom: 'N / A',
    },
  },
  {
    name: 'Perpetual License',
    group: 'Licensing',
    desc: 'Bound to a particular SDK version and valid for one app (both Android & iOS) indefinitely.',
    support: {
      openSource: false,
      enterprise: false,
      enterprisePlus: true,
      enterpriseCustom: true,
    },
  },
  {
    name: 'Custom License',
    group: 'Licensing',
    desc: 'Bound to a particular SDK version and valid for multiple apps indefinitely.',
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

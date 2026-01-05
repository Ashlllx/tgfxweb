/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// TGFX Website Configuration

// Products using TGFX - case page uses full screenshots, homepage uses logos
const users = [
  {
    caption: 'PAG',
    image: '/img/tgfximg/showcase-pag.png',
    logo: '/img/tgfximg/logo-pag.png',
    logoStyle: { background: 'linear-gradient(180deg, #3C80E2 0%, #015BD9 100%)' },
    description: '一个将设计师在 After Effects 中制作的动画一键导出、快速部署到各主流平台的动效工作流解决方案。',
    descriptionEn: 'A motion design workflow solution that exports After Effects animations for fast, high-performance integration across major platforms.',
    infoLink: 'https://pag.io',
    pinned: true,
  },
  {
    caption: 'CoDesign',
    image: '/img/tgfximg/showcase-codesign.png',
    logo: '/img/tgfximg/logo-codesign.svg',
    logoStyle: { background: 'white' },
    description: '腾讯自主研发的一站式产品设计协作平台，支持在线导入预览设计稿、自动生成标注与切图，助力设计与产品、开发团队高效对接。',
    descriptionEn: 'An all-in-one collaborative design platform by Tencent that streamlines design review, annotations, and asset delivery across teams.',
    infoLink: 'https://codesign.qq.com',
    pinned: true,
  },
  {
    caption: 'IMA',
    image: '/img/tgfximg/showcase-ima.png',
    logo: '/img/tgfximg/logo-ima.png',
    logoStyle: { background: 'white' },
    description: '一款以知识库为核心的智能工作台产品，集"搜 · 读 · 写"于一体，助力用户提升学习与办公效率。',
    descriptionEn: 'An intelligent workstation centered on knowledge management, integrating "search, read, and write" to help users improve learning and work efficiency.',
    infoLink: 'https://ima.qq.com',
    pinned: true,
  },
  {
    caption: '腾讯地图',
    image: '/img/tgfximg/showcase-qqmap.png',
    logo: '/img/tgfximg/logo-map.png',
    logoStyle: { background: 'white' },
    description: '一款基于位置的生活服务平台，提供精准导航、实时路况、地点搜索等功能，覆盖全国各大城市。',
    descriptionEn: 'A location-based service platform offering precise navigation, real-time traffic updates, and comprehensive POI search across major cities in China.',
    infoLink: 'https://map.qq.com',
    pinned: true,
  },
  {
    caption: 'Hippy',
    image: '/img/tgfximg/showcase-hippy.png',
    logo: '/img/tgfximg/logo-hippy.png',
    logoStyle: { background: 'white' },
    description: '一个跨端开发框架，让开发者"写一套代码，运行于 iOS、Android 和 Web"等多个平台。',
    descriptionEn: 'A cross-platform framework that allows developers to build one codebase and run it seamlessly on iOS, Android, Web, and other platforms.',
    infoLink: 'https://hippyjs.org',
    pinned: true,
  },
  {
    caption: '咪咕视频',
    image: '/img/tgfximg/showcase-migu.png',
    logo: '/img/tgfximg/logo-migu.png',
    logoStyle: { background: 'white' },
    description: '一个集正版影视剧、综艺、动漫及体育赛事直播于一体的视频平台与娱乐应用。',
    descriptionEn: 'A video streaming app offering licensed movies, TV shows, anime, and major sports live broadcasts.',
    infoLink: 'https://www.miguvideo.com',
    pinned: true,
  },
]

const links = {
  download: {
    mac: '#',
    win: '#',
  },
}

const siteConfig = {
  title: 'TGFX - 跨平台轻量级2D图形库', // Title for your website.
  tagline:
    'TGFX (Tencent Graphics) 是腾讯开源的跨平台轻量级2D图形库，拥有全平台支持。可独立运行，也可以作为PAG动效的渲染引擎、编辑器和播放器的渲染引擎。',
  url: 'https://tgfx.dev', // Your website URL
  baseUrl: '/', // Base URL for your project */

  disableTitleTagline: true,

  // Used for publishing and more
  projectName: 'tgfx.dev',
  organizationName: 'Tencent',

  separateCss: ['static/css'],
  stylesheets: [
    {
      href: '/css/pc.css',
      type: 'text/css',
      id: 'pc-css',
    },
    {
      href: '/css/mobile.css',
      type: 'text/css',
      id: 'mobile-css',
    },
    {
      href: '/css/tgfx.css',
      type: 'text/css',
      id: 'tgfx-css',
    },
  ],
  headerLinks: [
    {
      href: '/',
      label: '首页',
    },
    {
      href: '/docs/home.html',
      label: '文档',
    },
    {
      href: '/docs/api.html',
      label: 'API 参考',
    },
    {
      href: '/case.html',
      label: '案例',
    },
    {
      href: 'https://github.com/Tencent/tgfx',
      label: 'GitHub',
    },
    {
      href: 'https://github.com/Tencent/tgfx/discussions',
      label: '论坛交流',
    },
    { languages: true },
  ],

  // If you have users set above, you add it here:
  users,
  links,

  /* path to images for header/footer */
  headerIcon: 'img/tgfximg/nav-logo.png',
  footerIcon: 'img/tgfximg/tgfx-icon.png',
  favicon: 'img/tgfximg/logo.png',

  /* Colors for website - based on Figma design */
  colors: {
    primaryColor: '#0066FF',
    secondaryColor: '#00173A',
  },

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © 2018 - ${new Date().getFullYear()} Tencent. All Rights Reserved.`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['/javascript/tgfx.js', 'https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: false,

  // Open Graph and Twitter card images.
  ogImage: 'img/tgfximg/tgfx-icon.png',
  twitterImage: 'img/tgfximg/tgfx-icon.png',

  languages: [
    {
      enabled: true,
      name: 'EN',
      tag: 'en',
    },
    {
      enabled: true,
      name: 'CN',
      tag: 'zh-CN',
    },
  ],

  useEnglishUrl: false,
}

module.exports = siteConfig

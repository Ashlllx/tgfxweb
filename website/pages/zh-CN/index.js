const React = require('react');
const siteConfig = require(`${process.cwd()}/siteConfig.js`);

// TGFX Chinese Homepage Components - based on Figma design

// Hero Section
class Hero extends React.Component {
  render() {
    return (
      <div className="tgfx-hero">
        <div className="tgfx-hero-bg-center"></div>
        <div className="tgfx-hero-content">
          <div className="tgfx-hero-text">
            <div className="tgfx-hero-logo-text">
              <img src="/img/tgfximg/tgfx-logo-text.png" alt="TGFX" />
            </div>
            <p className="tgfx-hero-subtitle">
              TGFX (Tencent Graphics) 是腾讯开源的轻量级 2D 渲染引擎，为现代 GPU 而生，可在各主流平台上提供高性能的文本、位图与矢量渲染能力。
            </p>
            <div className="tgfx-hero-buttons">
              <a href="/docs/home.html" className="tgfx-btn tgfx-btn-primary">
                快速开始
              </a>
              <a href="#download" className="tgfx-btn tgfx-btn-outline">
                工具下载
              </a>
            </div>
          </div>
          <div className="tgfx-hero-visual">
            <div className="tgfx-hero-logo">
              <img src="/img/tgfximg/hero-logo-big.png" alt="TGFX Logo" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Feature Section
class Features extends React.Component {
  render() {
    const features = [
      {
        index: '1',
        title: '包体极致轻量',
        description:
          '核心功能全面对齐 Skia，覆盖位图、矢量、文本、混合模式、滤镜、Picture 录制等，并支持 PDF、SVG、3D 变换、广色域渲染等高级特性。在功能接近的情况下，TGFX 更加轻量，核心渲染模块包体仅约 Skia 的 30%。',
        image: '/img/tgfximg/feature-1.png',
      },
      {
        index: '2',
        title: '渲染性能领先',
        description:
          '渲染管线专为现代 GPU 深度优化，彻底抛弃对传统 CPU 渲染管线的兼容，内存占用更低，减少 CPU/GPU 串行阻塞，并充分利用多线程、SIMD 与 HardwareBuffer 等硬件加速特性。部分场景性能较 Skia 提升可达 10 倍以上。',
        image: '/img/tgfximg/feature-2.png',
        button: {
          text: '性能测试',
          link: 'https://tgfx.org/benchmark',
        },
      },
      {
        index: '3',
        title: '平台完整覆盖',
        description:
          '支持几乎所有主流平台，包括 iOS、Android、macOS、Windows、Linux、Web 与 OpenHarmony 等，并兼容 Qt、小程序等运行环境。通过 PAG 方案已实际运行于数千款头部产品中，稳定性经过了海量用户的持续验证。',
        image: '/img/tgfximg/feature-3.png',
      },
      {
        index: '4',
        title: '统一 GPU 封装',
        description:
          '提供独立可用的跨平台 GPU 接口层，以现代 GPU 接口形式统一封装 Metal、Vulkan、WebGPU 与 OpenGL 等后端，采用极薄封装设计，运行时几乎零性能损耗。同时强化 OpenGL 安全性，使对象也可在任意线程中安全释放。',
        image: '/img/tgfximg/feature-4.png',
      },
      {
        index: '5',
        title: '图层显示列表',
        description:
          '提供贴近业务层的图层渲染模块，支持开箱即用的树状显示列表组织方式，内置脏矩形渲染与瓦片缓存等局部刷新算法，并结合高性能标脏与动态剔除系统，轻松支撑数十万图层同屏渲染，同时实现快速且流畅的缩放与移动。',
        image: '/img/tgfximg/feature-5.png',
      },
      {
        index: '6',
        title: '可视调试工具',
        description:
          '配套提供可视化的性能调试工具，配合特定编译开关，可在所有平台上快速抓帧，分析渲染流程并定位性能瓶颈。同时针对图层渲染模块提供显示列表查看工具，支持实时展开图层数与属性预览，助力快速排查显示对象异常。',
        image: '/img/tgfximg/feature-6.png',
        button: {
          text: '下载工具',
          link: '#download',
        },
      },
    ];

    return (
      <div className="tgfx-features">
        <div className="tgfx-features-header">
          <span className="tgfx-features-tag">FEATURE</span>
        </div>
        <div className="tgfx-features-list">
          {features.map((feature, idx) => (
            <div key={idx} className={`tgfx-feature-item ${idx % 2 === 1 ? 'reverse' : ''}`}>
              <div className="tgfx-feature-content">
                <div className="tgfx-feature-index">{feature.index}</div>
                <div className="tgfx-feature-text">
                  <h3 className="tgfx-feature-title">{feature.title}</h3>
                  <p className="tgfx-feature-desc">{feature.description}</p>
                  {feature.button && (
                    <a href={feature.button.link} className="tgfx-btn-small">{feature.button.text}</a>
                  )}
                </div>
              </div>
              <div className="tgfx-feature-image">
                <img src={feature.image} alt={feature.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

// Users Section - Homepage shows logos
class Users extends React.Component {
  render() {
    const users = siteConfig.users || [];
    return (
      <div className="tgfx-users">
        <div className="tgfx-users-header">
          <span className="tgfx-users-tag">SHOWCASE</span>
        </div>
        <h2 className="tgfx-users-title">他们都在使用...</h2>
        <div className="tgfx-users-grid">
          {users.slice(0, 6).map((user, idx) => (
            <a key={idx} href={user.infoLink} className="tgfx-user-item" target="_blank" rel="noopener noreferrer">
              <div className="tgfx-user-logo" style={user.logoStyle}>
                <img src={user.logo || user.image} alt={user.caption} />
              </div>
              <div className="tgfx-user-name">{user.caption}</div>
            </a>
          ))}
        </div>
        <a href="/case.html" className="tgfx-btn-more">查看更多案例</a>
      </div>
    );
  }
}

// Download Section - dark background
class Download extends React.Component {
  render() {
    return (
      <div className="tgfx-download" id="download">
        <div className="tgfx-download-content">
          <div className="tgfx-download-box">
            <img src="/img/tgfximg/installer.png" alt="TGFX Inspector" />
          </div>
          <h2 className="tgfx-download-title">免费下载使用</h2>
          <div className="tgfx-download-buttons">
            <a href="#" className="tgfx-btn-download-dark">
              Coming Soon...
            </a>
          </div>
        </div>
      </div>
    );
  }
}

// Main Page
class Index extends React.Component {
  render() {
    return (
      <div className="tgfx-container">
        <Hero />
        <Features />
        <Users />
        <Download />
      </div>
    );
  }
}

module.exports = Index;

const React = require('react');
const siteConfig = require(`${process.cwd()}/siteConfig.js`);

// TGFX English Homepage Components

// Hero Section - 基于 Figma 设计稿
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
              TGFX (Tencent Graphics) is a lightweight 2D graphics library designed for modern GPUs, delivering high-performance text, image, and vector rendering across all major platforms.
            </p>
            <div className="tgfx-hero-buttons">
              <a href="/docs/home.html" className="tgfx-btn tgfx-btn-primary">
                Get Started
              </a>
              <a href="#download" className="tgfx-btn tgfx-btn-outline">
                Download
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

// Feature Section - 基于 Figma 设计稿
class Features extends React.Component {
  render() {
    const features = [
      {
        index: '1',
        title: 'Ultra Lightweight',
        description:
          'Core features fully align with Skia, covering images, vectors, text, blend modes, filters, Picture recording, and more. Advanced capabilities such as PDF, SVG, 3D transformations, and wide-gamut rendering are also supported. With comparable functionality, TGFX is significantly lighter, with the core rendering module only about 30% of Skia\'s binary size.',
        image: '/img/tgfximg/feature-1.png',
      },
      {
        index: '2',
        title: 'High Performance',
        description:
          'The rendering pipeline is deeply optimized for modern GPUs, completely dropping support for legacy CPU pipelines. Memory usage is lower, CPU/GPU mixed-call blocking is minimized, and multi-threading, SIMD, and HardwareBuffer acceleration are fully utilized. In some scenarios, performance can be up to 10× higher than Skia.',
        image: '/img/tgfximg/feature-2.png',
        button: {
          text: 'Benchmark',
          link: 'https://tgfx.org/benchmark',
        },
      },
      {
        index: '3',
        title: 'Cross Platform',
        description:
          'Supports nearly all major platforms, including iOS, Android, macOS, Windows, Linux, Web, and OpenHarmony, while also compatible with Qt and mini-program environments. Through the PAG solution, TGFX has been deployed in thousands of leading products, with stability verified by a massive user base.',
        image: '/img/tgfximg/feature-3.png',
      },
      {
        index: '4',
        title: 'GPU Interface',
        description:
          'Provides a standalone, cross-platform GPU interface layer, unifying Metal, Vulkan, WebGPU, and OpenGL backends under a modern GPU API design. The wrapper is extremely thin, with near-zero runtime performance overhead. OpenGL safety is enhanced as well, allowing resources to be safely released on any thread.',
        image: '/img/tgfximg/feature-4.png',
      },
      {
        index: '5',
        title: 'Layer Module',
        description:
          'Offers a layer rendering module close to the application layer, supporting out-of-the-box tree-structured display lists. It combines partial refresh and tiled rendering techniques with an efficient dirty marking system and fast culling, easily handling hundreds of thousands of layers on screen, while enabling smooth and responsive zooming and panning.',
        image: '/img/tgfximg/feature-5.png',
      },
      {
        index: '6',
        title: 'Visual Inspector',
        description:
          'Comes with visual inspecting tools that, with specific compile options, enable fast frame capture, render flow analysis, and performance bottleneck detection across all platforms. For the layer rendering module, it provides a display list viewer to expand layers and preview attributes in real time, helping quickly identify rendering issues.',
        image: '/img/tgfximg/feature-6.png',
        button: {
          text: 'Download',
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

// Users Section - Homepage shows logos (not case screenshots)
class Users extends React.Component {
  render() {
    const users = siteConfig.users || [];
    return (
      <div className="tgfx-users">
        <div className="tgfx-users-header">
          <span className="tgfx-users-tag">SHOWCASE</span>
        </div>
        <h2 className="tgfx-users-title">Who's Using TGFX</h2>
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
        <a href="/case.html" className="tgfx-btn-more">View More</a>
      </div>
    );
  }
}

// Download Section - 基于 Figma 设计稿 (深色背景)
class Download extends React.Component {
  render() {
    return (
      <div className="tgfx-download" id="download">
        <div className="tgfx-download-content">
          <div className="tgfx-download-box">
            <img src="/img/tgfximg/installer.png" alt="TGFX Inspector" />
          </div>
          <h2 className="tgfx-download-title">Free Download</h2>
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

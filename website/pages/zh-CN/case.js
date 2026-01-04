const React = require('react');
const siteConfig = require(`${process.cwd()}/siteConfig.js`);

// TGFX 案例页组件 - 基于 Figma 设计稿

// 案例卡片 - 3列布局
class CaseCard extends React.Component {
  render() {
    const { image, title, description, link } = this.props;
    return (
      <a href={link} className="tgfx-showcase-item" target="_blank" rel="noopener noreferrer">
        <div className="tgfx-showcase-image">
          <img src={image} alt={title} />
        </div>
        <div className="tgfx-showcase-content">
          <h3 className="tgfx-showcase-name">{title}</h3>
          <p className="tgfx-showcase-desc">{description}</p>
        </div>
      </a>
    );
  }
}

// 案例列表
class CaseList extends React.Component {
  render() {
    const users = siteConfig.users || [];
    
    return (
      <div className="tgfx-showcase">
        <h1 className="tgfx-showcase-title">基于 TGFX 构建的产品</h1>
        <div className="tgfx-showcase-grid">
          {users.map((user, idx) => (
            <CaseCard
              key={idx}
              image={user.image}
              title={user.caption}
              description={user.description}
              link={user.infoLink}
            />
          ))}
        </div>
      </div>
    );
  }
}

// Download 区域 - 深色背景
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

// 案例页主组件 - 不需要自定义Footer，Docusaurus会自动添加
class Case extends React.Component {
  render() {
    return (
      <div className="tgfx-container">
        <CaseList />
        <Download />
      </div>
    );
  }
}

module.exports = Case;

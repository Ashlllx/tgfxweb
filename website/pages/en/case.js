const React = require('react');
const siteConfig = require(`${process.cwd()}/siteConfig.js`);

// TGFX Case Page Components (English) - based on Figma design

// Case Card - 3 column layout
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

// Case List
class CaseList extends React.Component {
  render() {
    const users = siteConfig.users || [];
    
    return (
      <div className="tgfx-showcase">
        <h1 className="tgfx-showcase-title">Products Built with TGFX</h1>
        <div className="tgfx-showcase-grid">
          {users.map((user, idx) => (
            <CaseCard
              key={idx}
              image={user.image}
              title={user.caption}
              description={user.descriptionEn || user.description}
              link={user.infoLink}
            />
          ))}
        </div>
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

// Case Page Main Component - Docusaurus adds footer automatically
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

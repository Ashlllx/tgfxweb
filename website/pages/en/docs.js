/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Docs extends React.Component {
  render() {
    return (
      <div className="docMainWrapper wrapper">
        <div className="container mainContainer docsContainer">
          <div className="wrapper">
            <div className="post">
              <header className="postHeader">
                <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>📚 TGFX Documentation Center</h1>
                <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>
                  Welcome to the TGFX Documentation Center!
                </p>
              </header>
              
              <article>
                <h2 style={{ fontSize: '32px', marginTop: '40px', marginBottom: '20px' }}>🚧 Content In Progress</h2>
                <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '20px' }}>
                  We are working hard to prepare detailed documentation for you, including:
                </p>
                <ul style={{ fontSize: '16px', lineHeight: '2', marginBottom: '30px' }}>
                  <li><strong>Quick Start Guide</strong> - Get started with TGFX quickly</li>
                  <li><strong>Core Concepts</strong> - Deep dive into TGFX design principles</li>
                  <li><strong>API Documentation</strong> - Complete API reference</li>
                  <li><strong>Best Practices</strong> - Real-world experience sharing</li>
                  <li><strong>FAQ</strong> - Common questions and solutions</li>
                </ul>

                <h2 style={{ fontSize: '32px', marginTop: '40px', marginBottom: '20px' }}>📖 Temporary Resources</h2>
                <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '20px' }}>
                  While we are preparing the complete documentation, you can learn about TGFX through:
                </p>

                <h3 style={{ fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>🔗 Official Resources</h3>
                <ul style={{ fontSize: '16px', lineHeight: '2', marginBottom: '30px' }}>
                  <li>
                    <strong>GitHub Repository</strong>: <a href="https://github.com/Tencent/tgfx" target="_blank" rel="noopener noreferrer">https://github.com/Tencent/tgfx</a>
                    <ul style={{ marginTop: '10px' }}>
                      <li>View source code</li>
                      <li>Read README for quick start</li>
                      <li>Browse example code</li>
                    </ul>
                  </li>
                  <li style={{ marginTop: '20px' }}>
                    <strong>Discussions</strong>: <a href="https://github.com/Tencent/tgfx/discussions" target="_blank" rel="noopener noreferrer">https://github.com/Tencent/tgfx/discussions</a>
                    <ul style={{ marginTop: '10px' }}>
                      <li>Ask questions and discuss</li>
                      <li>Share your experience</li>
                      <li>Get community support</li>
                    </ul>
                  </li>
                </ul>

                <h3 style={{ fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>💡 Quick Start</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '15px' }}>
                  Before the complete documentation goes live, we recommend following these steps:
                </p>
                <ol style={{ fontSize: '16px', lineHeight: '2', marginBottom: '30px' }}>
                  <li><strong>Visit GitHub Repository</strong>
                    <pre style={{ marginTop: '10px', padding: '15px', background: '#f5f5f5', borderRadius: '4px', overflow: 'auto' }}>
                      <code>git clone https://github.com/Tencent/tgfx.git</code>
                    </pre>
                  </li>
                  <li style={{ marginTop: '15px' }}><strong>Read README</strong> - Learn about the project, check build instructions, run example code</li>
                  <li style={{ marginTop: '15px' }}><strong>View Showcase</strong> - Visit the <a href="/case.html">Showcase page</a> to see TGFX in action</li>
                  <li style={{ marginTop: '15px' }}><strong>Join Community</strong> - Ask questions in Discussions, report issues or suggestions</li>
                </ol>

                <h2 style={{ fontSize: '32px', marginTop: '40px', marginBottom: '20px' }}>📅 Documentation Roadmap</h2>
                <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '15px' }}>
                  We plan to release the following documentation soon:
                </p>
                <ul style={{ fontSize: '16px', lineHeight: '2', marginBottom: '30px', listStyle: 'none', paddingLeft: '0' }}>
                  <li>☐ Quick Start Guide</li>
                  <li>☐ Installation & Configuration</li>
                  <li>☐ Basic Tutorials</li>
                  <li>☐ Advanced Tutorials</li>
                  <li>☐ Real-world Examples</li>
                  <li>☐ FAQ</li>
                </ul>

                <h2 style={{ fontSize: '32px', marginTop: '40px', marginBottom: '20px' }}>📧 Contact Us</h2>
                <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '20px' }}>
                  If you have any questions or suggestions, please contact us through:
                </p>
                <ul style={{ fontSize: '16px', lineHeight: '2', marginBottom: '40px' }}>
                  <li><strong>GitHub Issues</strong>: <a href="https://github.com/Tencent/tgfx/issues" target="_blank" rel="noopener noreferrer">Submit an issue</a></li>
                  <li><strong>GitHub Discussions</strong>: <a href="https://github.com/Tencent/tgfx/discussions" target="_blank" rel="noopener noreferrer">Join discussions</a></li>
                </ul>

                <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #eee' }} />
                <p style={{ fontSize: '18px', textAlign: 'center', color: '#0066FF', fontWeight: 'bold' }}>
                  Thank you for your patience! Complete documentation coming soon. 🎉
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Docs;

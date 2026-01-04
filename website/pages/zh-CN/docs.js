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
                <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>📚 TGFX 文档中心</h1>
                <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>
                  欢迎来到 TGFX 文档中心！
                </p>
              </header>
              
              <article>
                <h2 style={{ fontSize: '32px', marginTop: '40px', marginBottom: '20px' }}>🚧 内容正在准备中</h2>
                <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '20px' }}>
                  我们正在努力为您准备详细的文档内容，包括：
                </p>
                <ul style={{ fontSize: '16px', lineHeight: '2', marginBottom: '30px' }}>
                  <li><strong>快速开始指南</strong> - 帮助您快速上手 TGFX</li>
                  <li><strong>核心概念</strong> - 深入理解 TGFX 的设计理念</li>
                  <li><strong>API 文档</strong> - 完整的接口参考</li>
                  <li><strong>最佳实践</strong> - 实战经验分享</li>
                  <li><strong>常见问题</strong> - 帮助您解决常见问题</li>
                </ul>

                <h2 style={{ fontSize: '32px', marginTop: '40px', marginBottom: '20px' }}>📖 临时资源</h2>
                <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '20px' }}>
                  在文档完善期间，您可以通过以下方式了解 TGFX：
                </p>

                <h3 style={{ fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>🔗 官方资源</h3>
                <ul style={{ fontSize: '16px', lineHeight: '2', marginBottom: '30px' }}>
                  <li>
                    <strong>GitHub 仓库</strong>: <a href="https://github.com/Tencent/tgfx" target="_blank" rel="noopener noreferrer">https://github.com/Tencent/tgfx</a>
                    <ul style={{ marginTop: '10px' }}>
                      <li>查看源代码</li>
                      <li>阅读 README 快速入门</li>
                      <li>浏览示例代码</li>
                    </ul>
                  </li>
                  <li style={{ marginTop: '20px' }}>
                    <strong>论坛交流</strong>: <a href="https://github.com/Tencent/tgfx/discussions" target="_blank" rel="noopener noreferrer">https://github.com/Tencent/tgfx/discussions</a>
                    <ul style={{ marginTop: '10px' }}>
                      <li>提问和讨论</li>
                      <li>分享使用经验</li>
                      <li>获取社区支持</li>
                    </ul>
                  </li>
                </ul>

                <h3 style={{ fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>💡 快速开始</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '15px' }}>
                  在完整文档上线之前，建议按照以下步骤开始使用 TGFX：
                </p>
                <ol style={{ fontSize: '16px', lineHeight: '2', marginBottom: '30px' }}>
                  <li><strong>访问 GitHub 仓库</strong>
                    <pre style={{ marginTop: '10px', padding: '15px', background: '#f5f5f5', borderRadius: '4px', overflow: 'auto' }}>
                      <code>git clone https://github.com/Tencent/tgfx.git</code>
                    </pre>
                  </li>
                  <li style={{ marginTop: '15px' }}><strong>阅读 README</strong> - 了解项目简介、编译说明、示例代码</li>
                  <li style={{ marginTop: '15px' }}><strong>查看案例</strong> - 访问<a href="/case.html">案例页面</a>，了解 TGFX 的实际应用</li>
                  <li style={{ marginTop: '15px' }}><strong>参与社区</strong> - 在 Discussions 提问、报告问题或建议</li>
                </ol>

                <h2 style={{ fontSize: '32px', marginTop: '40px', marginBottom: '20px' }}>📅 更新计划</h2>
                <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '15px' }}>
                  我们计划在近期陆续发布以下文档：
                </p>
                <ul style={{ fontSize: '16px', lineHeight: '2', marginBottom: '30px', listStyle: 'none', paddingLeft: '0' }}>
                  <li>☐ 快速开始指南</li>
                  <li>☐ 安装与配置</li>
                  <li>☐ 基础教程</li>
                  <li>☐ 进阶教程</li>
                  <li>☐ 实战案例</li>
                  <li>☐ 常见问题 FAQ</li>
                </ul>

                <h2 style={{ fontSize: '32px', marginTop: '40px', marginBottom: '20px' }}>📧 联系我们</h2>
                <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '20px' }}>
                  如有任何问题或建议，欢迎通过以下方式联系我们：
                </p>
                <ul style={{ fontSize: '16px', lineHeight: '2', marginBottom: '40px' }}>
                  <li><strong>GitHub Issues</strong>: <a href="https://github.com/Tencent/tgfx/issues" target="_blank" rel="noopener noreferrer">提交问题</a></li>
                  <li><strong>GitHub Discussions</strong>: <a href="https://github.com/Tencent/tgfx/discussions" target="_blank" rel="noopener noreferrer">参与讨论</a></li>
                </ul>

                <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #eee' }} />
                <p style={{ fontSize: '18px', textAlign: 'center', color: '#0066FF', fontWeight: 'bold' }}>
                  感谢您的耐心等待！完整文档即将上线。🎉
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

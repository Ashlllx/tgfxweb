/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const translatorEN = require(`${process.cwd()}/core/translator.js`);

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return `${baseUrl}docs/${language ? `${language}/` : ''}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    const { config, language } = this.props;
    const isEn = language === 'en';

    return (
      <footer className="tgfx-footer">
        <div className="tgfx-footer-content">
          <div className="tgfx-footer-info">
            {isEn ? (
              <React.Fragment>
                <span>Address: Tencent Binhai Building, No.33 Haitian 2nd Road, Nanshan District, Shenzhen</span>
                <span>Tel: 0755-86013388</span>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <span>公司地址：广东省深圳市南山区海天二路33号腾讯滨海大厦</span>
                <span>联系电话：0755-86013388</span>
              </React.Fragment>
            )}
          </div>
          <div className="tgfx-footer-bottom">
            <div className="tgfx-footer-copyright">
              Copyright © 2018 - {new Date().getFullYear()} Tencent. All Rights Reserved.
            </div>
            <div className="tgfx-footer-links">
              <a href="/privacy-policy.html">{isEn ? 'Privacy Policy' : '隐私政策'}</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

module.exports = Footer;

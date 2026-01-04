/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const CompLibrary = require('../../core/CompLibrary.js');
const siteConfig = require(`${process.cwd()}/siteConfig.js`);
const translator = require(`${process.cwd()}/core/translator.js`);

translator.initialize('zh-CN');
const t = translator.t;

const Container = CompLibrary.Container;

class Download extends React.Component{
  render(){
    return (
      <div class='download'>
        <div class='wrap'>
          <div class='pkg'>
            <span class='pkg-download'></span>
            <a class='mac-download' href={siteConfig.links.download.mac}></a>
            <a class='win-download' href={siteConfig.links.download.win}></a>
          </div>
        </div>
      </div>
    )
  }
}

class Users extends React.Component {
  render() {
    const showcase = translator.users.map(user => (
      <a href={user.infoLink} key={user.infoLink}>
        <img src={user.image} alt={user.caption} title={user.caption} />
        <div class='name'>{user.caption}</div>
      </a>
    ));

    return (
      <div className="mainContainer usersContainer">
        <Container padding={['bottom', 'top']}>
          <div className="showcaseSection">
            <div className="prose">
              <h1>{t('usingTitle')}</h1>
            </div>
            <div className="logos">
              {showcase}
              <a class='contact js_bbs'>
                <img src='https://pag.qq.com/img/new_official_website/contact_us.png'/>
                <div class='name'>{t('usingContent')}</div>
                <div class='ts'>{t('usingTellUs')}</div>
              </a>
            </div>
            {/* <p>正在使用PAG动效方案?</p>
            <a href="https://github.com/libpag/pag-docs/blob/master/website/siteConfig.js" className="button">
              提交你的应用
            </a> */}
          </div>
        </Container>
        <Download/>
      </div>
    );
  }
}

module.exports = Users;

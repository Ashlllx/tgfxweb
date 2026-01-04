const React = require('react');
const InjectScript = require(`${process.cwd()}/core/InjectScript.js`);
const CustomerService = require(`${process.cwd()}/core/CustomerService.js`);
const translator = require(`${process.cwd()}/core/translator.js`);

translator.initialize('en');
const t = translator.t;

function imgUrl(img) {
  return `https://pag.qq.com/img/${img}`;
}

class Button extends React.Component {
  render() {
    const { text, img, blue, link, className, style = {}} = this.props;
    return (
      <a href={link} class={'btn ' + (blue ? 'blue' : 'white') + (className ? ` ${className} ` : '')} style={style}>
        {img && <img src={imgUrl(img)} width={24} height={24} />}
        <span>{text}</span>
      </a>
    );
  }
}

class Main extends React.Component {
  render() {
    return (
      <div class="product-main">
        <div class="section-one">
          <div class="banner">
            <ProductNav title={t('productNav.PAGCommunity')} img={'img_pag.png'} linkId="pag-community-edition" cls="product-nav" />
            <ProductNav title={t('productNav.PAGEnterprise')} img={'img_enterprise.png'} linkId="pag-enterprise-edition" cls="product-nav" />
            <ProductNav title={t('productNav.TAVMedia')} img={'img_tavmedia.png'} linkId="tavmedia" cls="product-nav" />
            {/* <ProductNav title={t('productNav.AnimateMaterial')} img={'img_pagart.png'} linkId="animate-material" cls="product-nav" /> */}
          </div>
          <div class="banner-bg"></div>
        </div>
        <div className="section section-two">
          <div className="anchor" id="pag-community-edition" />
          <div className="section-content">
            <div className="section-top">
              <img className="section-img" src="https://pag.qq.com/img/commerce/img_open_source.png" />
              <SectionDesc
                title={t('sectionDesc.PAGCommunity.title')}
                content={t('sectionDesc.PAGCommunity.content')}
                leftBtnText={t('sectionDesc.PAGCommunity.leftBtnText')}
                leftBtnLink="/en/feature.html"
                rightBtnText="Github"
                rightBtnImg="commerce/icon_github.png"
                rightBtnLink="https://github.com/libpag"
              />
            </div>
            <div className="section-bottom">
              <Card
                title={t('card.card1.title')}
                content={t('card.card1.content')}
              />
              <Card
                title={t('card.card2.title')}
                content={t('card.card2.content')}
              />
              <Card
                title={t('card.card3.title')}
                content={t('card.card3.content')}
              />
            </div>
          </div>
        </div>
        <div className="section section-three">
          <div className="anchor" id="pag-enterprise-edition" />
          <div className="section-content">
            <div className="section-top">
              <img className="section-img" src="https://pag.qq.com/img/commerce/img_pag_commerce.png" />
              <SectionDesc
                title={t('sectionDesc.PAGEnterprise.title')}
                content={t('sectionDesc.PAGEnterprise.content')}
                leftBtnText={t('sectionDesc.PAGEnterprise.leftBtnText')}
                rightBtnText={t('sectionDesc.PAGEnterprise.rightBtnText')}
                leftBtnLink="/en/feature.html"
                rightBtnTooltip={true}
              />
            </div>
            <div className="section-bottom">
              <Card
                title={t('card.card4.title')}
                content={t('card.card4.content')}
              />
              <Card
                title={t('card.card5.title')}
                content={t('card.card5.content')}
              />
              <Card
                title={t('card.card6.title')}
                content={t('card.card6.content')}
              />
            </div>
          </div>
        </div>
        <div className="section section-four">
          <div className="anchor" id="tavmedia" />
          <div className="section-content">
            <div className="section-top">
              <img className="section-img" src="https://pag.qq.com/img/commerce/img_tav_media.png" />
              <SectionDesc
                title={t('sectionDesc.TAVMedia.title')}
                content={t('sectionDesc.TAVMedia.content')}
                leftBtnText={t('sectionDesc.TAVMedia.leftBtnText')}
                rightBtnText={t('sectionDesc.TAVMedia.rightBtnText')}
                leftBtnLink="/docs/en/TAVMedia-SDK-product-Introduction.html"
                leftBtnWidth={124}
                rightBtnTooltip={true}
              />
            </div>
            <div className="section-bottom">
              <Card
                title={t('card.card7.title')}
                content={t('card.card7.content')}
              />
              <Card
                title={t('card.card8.title')}
                content={t('card.card8.content')}
              />
              <Card
                title={t('card.card9.title')}
                content={t('card.card9.content')}
              />
              <Card
                title={t('card.card10.title')}
                content={t('card.card10.content')}
              />
            </div>
          </div>
        </div>
        {/* <div className="section section-five">
          <div className="anchor" id="animate-material" />
          <div className="section-content">
            <div className="section-top">
              <img className="section-img" src="https://pag.qq.com/img/commerce/img_animate_material.png" />
              <SectionDesc
                title={t('sectionDesc.AnimateMaterial.title')}
                content={t('sectionDesc.AnimateMaterial.content')}
                leftBtnText={t('sectionDesc.AnimateMaterial.leftBtnText')}
                rightBtnText={t('sectionDesc.AnimateMaterial.rightBtnText')}
                leftBtnLink="https://animate.art/album"
                rightBtnTooltip={true}
              />
            </div>
            <div className="section-middle">
              <a target="_blank" href="https://animate.art/album?category=ad" className="material-type">
                <div class="dot"></div>
                <div class="title">{t('materialType.adTemplate')}</div>
              </a>
              <a target="_blank" href="https://animate.art/album?category=live" className="material-type">
                <div class="dot"></div>
                <div class="title">{t('materialType.liveEffect')}</div>
              </a>
              <a target="_blank" href="https://animate.art/album?category=video-edit" className="material-type">
                <div class="dot"></div>
                <div class="title">{t('materialType.videoEdit')}</div>
              </a>
              <a target="_blank" href="https://animate.art/album?category=video-template" className="material-type">
                <div class="dot"></div>
                <div class="title">{t('materialType.videoAtom')}</div>
              </a>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

class ProductNav extends React.Component {
  render() {
    const { title, linkId, cls, img } = this.props;
    const className = 'rectangle' + (cls ? ' ' + cls : '');
    return (
      <div class={className} data-link-id={linkId}>
        <img src={`https://pag.qq.com/img/commerce/${img}`} />
        <div class="title">{title}</div>
      </div>
    );
  }
}

class Card extends React.Component {
  render() {
    const { title, content, className } = this.props;
    return (
      <div class={`card ${className || ''}`}>
        <div class="title">{title}</div>
        <div class="divider"></div>
        <p className="content">{content}</p>
      </div>
    );
  }
}

class SectionDesc extends React.Component {
  render() {
    const {
      title,
      content,
      leftBtnText,
      leftBtnLink,
      rightBtnText,
      rightBtnLink = 'javascript:;',
      rightBtnImg = 'commerce/icon_contact.png',
      rightBtnTooltip,
    } = this.props;
    return (
      <div class="section-desc">
        <div class="title">{title}</div>
        <div class="content">
          <p>{content}</p>
        </div>
        <div className="btn-group">
          {rightBtnTooltip ? (
            // <Tooltip placement="top" title={t('sectionDesc.AnimateMaterial.rightBtnText')}>
              <Button className={'product-buy-btn'} link={rightBtnLink} text={rightBtnText} blue={true} img={rightBtnImg} />
            // </Tooltip>
          ) : (
            <Button link={rightBtnLink} text={rightBtnText} blue={true} img={rightBtnImg} />
          )}
          {/* {rightBtnTooltip ? (
            <Button className={'product-buy-btn'} link={rightBtnLink} text={rightBtnText} blue={true} img={rightBtnImg} />
          ) : (
            <Button link={rightBtnLink} text={rightBtnText} blue={true} img={rightBtnImg} />
          )} */}
          <Button link={leftBtnLink} text={leftBtnText} img={'new_official_website/more-b.png'}></Button>
        </div>
      </div>
    );
  }
}


class Tooltip extends React.Component {
  render() {
    const { title, children } = this.props;
    return (
      <div class="tooltip-text">
        {children}
        <div class="tooltip">
          <img class="tooltip-img" src="/img/commerce/qrcode.png" />
          <div class="tooltip-hit">微信扫码 联系客服</div>
        </div>
      </div>
    );
  }
}

class ProductPage extends React.Component {
  render() {
    return (
      <div class="product-page-container">
        <Main />
        <CustomerService translator={translator} />
        <InjectScript />
      </div>
    );
  }
}

module.exports = ProductPage;

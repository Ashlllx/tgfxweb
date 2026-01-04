const React = require('react');
const InjectScript = require(`${process.cwd()}/core/InjectScript.js`);
const CustomerService = require(`${process.cwd()}/core/CustomerService.js`);
const translator = require(`${process.cwd()}/core/translator.js`);

translator.initialize('zh-CN');
const t = translator.t;

const comparisonConfig = translator.comparisonConfig;
const featureConfig = translator.featureConfig;

function generateUUID() {
  let d = new Date().getTime();
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

class Main extends React.Component {
  render() {
    const featureGroups = [];
    for (let i = 0; i < featureConfig.features.length; i++) {
      const feature = featureConfig.features[i];
      const group = featureGroups.find((group) => group.name === feature.group);
      if (!group) {
        const current = featureConfig.groups.find((group) => group.name === feature.group);
        if (!current) {
          console.error(`group ${feature.group} not found`);
          continue;
        }
        featureGroups.push({
          name: feature.group,
          enName: featureConfig.groups.find((group) => group.name === feature.group).enName,
          features: [feature],
        });
      } else {
        group.features.push(feature);
      }
    }
    featureGroups.sort(
      (a, b) =>
        featureConfig.groups.find((group) => group.name === a.name).id -
        featureConfig.groups.find((group) => group.name === b.name).id
    );

    const comparisonGroups = [];
    for (let i = 0; i < comparisonConfig.features.length; i++) {
      const feature = comparisonConfig.features[i];
      const group = comparisonGroups.find((group) => group.name === feature.group);
      if (!group) {
        comparisonGroups.push({
          name: feature.group,
          features: [Object.assign(feature, { id: generateUUID() })],
        });
      } else {
        group.features.push(Object.assign(feature, { id: generateUUID() }));
      }
    }

    // mobileModal
    const modalDataList = featureConfig.features.filter(
      (feature) => typeof feature.desc === 'string' && feature.desc.length > 0
    );

    const comparisonModalDataList = comparisonConfig.features.filter(
      (feature) => typeof feature.desc === 'string' && feature.desc.length > 0
    );

    return (
      <div class="feature-main">
        <div class="section-one">
          <div class="banner">
            <ProductNav
              title={t('showcaseTitle.comparison')}
              linkId="comparison"
              cls="product-nav active"
              id="comparison-feature-table-nav"
            />
            <ProductNav title={t('showcaseTitle.aeList')} linkId="ae" cls="product-nav" id="ae-feature-table-nav" />
          </div>
          <div class="banner-bg"></div>
        </div>
        <div class="feature-table feature-table-comparison" id="comparison-feature-table">
          <div className="anchor" id="comparison"></div>
          <div class="feature-table-header">
            <div class="logo">
              <div class="left-line"></div>
              <div class="title">{t('showcaseTitle.comparison')}</div>
              <div class="right-line"></div>
            </div>
          </div>
          <div className="feature-table-content" id="comparison-feature-table-content">
            <div class="table-header" id="comparison-fixed-header">
              <div class="table-header-title table-header-name-title">
                <div class="table-title"></div>
              </div>
              <div class="table-header-title">{t('tableHeaderText.communityEdition')}</div>
              <div class="table-header-title">
                {t('tableHeaderText.enterprise')}
                <br />
                {t('tableHeaderText.subscription')}
              </div>
              <div class="table-header-title">
                {t('tableHeaderText.enterprise')}
                <br />
                {t('tableHeaderText.advanced')}
              </div>
              <div class="table-header-title">
                {t('tableHeaderText.enterprise')}
                <br />
                {t('tableHeaderText.editionCustom')}
              </div>
            </div>
            <div class="feature-table-body">
              {comparisonGroups.map((group) => (
                <TableGroup
                  name={group.name}
                  features={group.features}
                  attrs={[
                    'support.openSource',
                    'support.enterprise',
                    'support.enterprisePlus',
                    'support.enterpriseCustom',
                  ]}
                />
              ))}
              <div class="table-row table-row-every">
                <div class="table-row-item table-row-name-item">
                  <div class="table-row-item-title">
                    <span class="table-row-item-title-cn">{t('tableHeaderText.price')}</span>
                  </div>
                </div>
                <div class="table-row-item">{t('free')}</div>
                <div class="table-row-item">
                  <a
                    target={'_blank'}
                    href="https://work.weixin.qq.com/kfid/kfc239fa6001ff703c3"
                    class="table-row-item-link"
                  >
                    {t('tableFooterText')}
                  </a>
                </div>
                <div class="table-row-item">
                  <a
                    target={'_blank'}
                    href="https://work.weixin.qq.com/kfid/kfc239fa6001ff703c3"
                    class="table-row-item-link"
                  >
                    {t('tableFooterText')}
                  </a>
                </div>
                <div class="table-row-item">
                  <a
                    target={'_blank'}
                    href="https://work.weixin.qq.com/kfid/kfc239fa6001ff703c3"
                    class="table-row-item-link"
                  >
                    {t('tableFooterText')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="feature-table feature-table-ae" id="ae-feature-table">
          <div className="anchor" id="ae"></div>
          <div class="feature-table-header">
            <div class="logo">
              <div class="left-line"></div>
              <div class="title">{t('showcaseTitle.aeList')}</div>
              <div class="right-line"></div>
            </div>
          </div>
          <div className="feature-table-content" id="ae-feature-table-content">
            <div class="table-header" id="ae-fixed-header">
              <div class="table-header-title table-header-name-title">
                <div class="table-title"></div>
              </div>
              <div class="table-header-title">{t('tableHeaderText.supportedVersion')}</div>
              <div class="table-header-title">{t('tableHeaderText.communityEdition')}</div>
              <div class="table-header-title">{t('tableHeaderText.enterpriseEdition')}</div>
            </div>
            <div class="feature-table-body">
              {featureGroups.map((group) => (
                <TableGroup
                  key={group.name}
                  name={group.name}
                  enName={group.enName}
                  features={group.features}
                  attrs={['version', 'support.openSource', 'support.enterprise']}
                />
              ))}
            </div>
          </div>
        </div>
        {[...modalDataList, ...comparisonModalDataList].map((modalData) => {
          return (
            <MobileTipModal
              name={
                modalData.enName ? `${modalData.enName.replace(new RegExp(' ', 'g'), '').toLowerCase()}` : modalData.id
              }
              desc={modalData.desc}
            ></MobileTipModal>
          );
        })}
      </div>
    );
  }
}

class ProductNav extends React.Component {
  render() {
    const { title, linkId, cls, id } = this.props;
    const className = 'rectangle' + (cls ? ' ' + cls : '');
    return (
      <div class={className} data-link-id={linkId} id={id}>
        <div class="title">
          <p>{title}</p>
        </div>
        <div class="divider"></div>
      </div>
    );
  }
}

class TableGroup extends React.Component {
  render() {
    const { name, enName, features, attrs } = this.props;
    return (
      <React.Fragment>
        <div class="table-group-header table-row-every">
          <div class="table-group-header-item table-group-header-name-item">
            <Icon name="icon_more" className="table-group-header-item-icon" />
            <div class="table-group-header-item-title">{name}</div>
            <span class="table-group-header-item-title-en">{enName ? `(${enName})` : ''}</span>
          </div>
          <div class="table-group-header-item "></div>
          <div class="table-group-header-item"></div>
          <div class="table-group-header-item"></div>
        </div>
        {features.map((feature, idx) => (
          <TableRow key={idx} feature={feature} attrs={attrs} />
        ))}
      </React.Fragment>
    );
  }
}

function isChineseCharacter(char) {
  const pattern = /[\u4e00-\u9fa5]/;
  return pattern.test(char);
}

function getStringWidth(text) {
  // 假设每个字符都有相同的宽度
  const cnCharWidth = 11; // 假设每个字符宽度为 10 像素
  const enCharWidth = 10; // 假设每个字符宽度为 10 像素
  // 计算字符串的总宽度
  let width = 0;
  for (let i = 0; i < text.length; i++) {
    if (isChineseCharacter(text[i])) {
      width += cnCharWidth;
    } else {
      width += enCharWidth;
    }
  }
  // 返回字符串的总宽度
  return width;
}

// 参数总的字符串长度, 每一行最长430, 求最大行数
function getLineCount(str) {
  const strWidth = getStringWidth(str);
  const lineCount = Math.ceil(strWidth / 430);
  return lineCount;
}

class TableRow extends React.Component {
  render() {
    const { feature, attrs } = this.props;
    return (
      <div class="table-row table-row-every">
        <div class="table-row-item table-row-name-item">
          <div class="table-row-item-title">
            <span class="table-row-item-title-cn">
              {`${feature.name}`}
              {feature.desc && (
                <Icon
                  id={'table-row-item-icon-mobile'}
                  className={'table-row-item-icon-mobile'}
                  name={'icon_desc'}
                  data={`${
                    feature.enName ? feature.enName.replace(new RegExp(' ', 'g'), '').toLowerCase() : feature.id
                  }`}
                />
              )}
            </span>
            {feature.enName && <span class="table-row-item-title-en">{`(${feature.enName})`}</span>}
          </div>
          {feature.desc && (
            <Tooltip title={feature.desc}>
              <Icon name={'icon_desc'} />
            </Tooltip>
          )}
          {feature.descList && (
            <ComplexTooltip title={feature.desc} descList={feature.descList}>
              <Icon name={'icon_desc'} />
            </ComplexTooltip>
          )}
        </div>
        {attrs.map((attr) => {
          if (attr.indexOf('support.') !== -1) {
            const supportAttr = attr.split('.')[1];
            if (typeof feature.support[supportAttr] === 'boolean') {
              return (
                <div class="table-row-item">
                  {feature.support[supportAttr] ? <Icon name={'icon_support'} /> : <Icon name={'icon_no_support'} />}
                </div>
              );
            }
            return <div class="table-row-item">{feature.support[supportAttr]}</div>;
          }
          return <div class="table-row-item">{feature.version}</div>;
        })}
      </div>
    );
  }
}

class Tooltip extends React.Component {
  render() {
    const { title, children } = this.props;
    const lineCount = getLineCount(title);

    if (lineCount > 1) {
      const tooltipLineHeight = 22;
      const tooltipMaxWidth = 430;

      let tooltipWidth = lineCount > 1 ? tooltipMaxWidth : tooltipMaxWidth;
      let tooltipHeight = lineCount * tooltipLineHeight + 40;
      let tooltipTop = -(tooltipHeight / 2 - 10);

      const breakCount = (title.match(/\n/g) || []).length;
      if (breakCount > 0) {
        tooltipHeight = (breakCount + 1) * tooltipLineHeight + 36;
        tooltipTop = -(tooltipHeight / 2 - 10);
        return (
          <div class="tooltip-text">
            {children}
            <div class="arrowLeft"></div>
            <div class="tooltip tooltipList" data-tooltip={title} style={{ height: tooltipHeight, top: tooltipTop }}>
              {title.split('\n').map((item) => {
                const [firstChinese, ...rest] = item.split(' ');
                return (
                  <div class="tooltip-content" data-tooltip={item}>
                    <div class="tooltip-title">{firstChinese}</div>
                    <div class="tooltip-desc">{rest.join(' ')}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
      return (
        <div class="tooltip-text">
          {children}
          <div class="arrowLeft"></div>
          <div class="tooltip" style={{ width: tooltipWidth, height: 57, top: tooltipTop }}>
            <span class="tooltip-desc">{title}</span>
          </div>
        </div>
      );
    } else {
      let tooltipHeight = 57;
      let tooltipTop = -(tooltipHeight / 2 - 10);
      return (
        <div class="tooltip-text">
          {children}
          <div class="arrowLeft"></div>
          <div class="tooltip" style={{ height: tooltipHeight, top: tooltipTop }}>
            <div class="tooltip-desc">{title}</div>
          </div>
        </div>
      );
    }
  }
}
class ComplexTooltip extends React.Component {
  render() {
    const { descList, children } = this.props;

    const lineCount = descList.length;
    const tooltipLineHeight = 22;
    let tooltipHeight = lineCount * tooltipLineHeight + 40;
    let tooltipTop = -(tooltipHeight / 2 - 10);

    if (descList) {
      return (
        <div class="tooltip-text">
          {children}
          <div class="arrowLeft"></div>
          <div class="tooltip complexTooltip"  style={{ width: 330, top: tooltipTop }}>
            {descList.map((descItem) => {
              const { title, enTitle, content } = descItem;
              return (
                <div>
                  <div class="tooltip-content">
                    <div class="tooltip-title">{title}</div>
                    <div class="tooltip-desc">{enTitle}</div>
                  </div>
                  <div class="tooltip-desc">{content}</div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }
}
class Icon extends React.Component {
  render() {
    const { name, className, id, data = '' } = this.props;
    return (
      <div class={`table-icon ${className || ''}`} id={id} data-mobile-modal={data}>
        <img class="table-icon-img" src={`https://pag.qq.com/img/commerce/${name}.png`} />
      </div>
    );
  }
}

class MobileTipModal extends React.Component {
  render() {
    const { name, desc } = this.props;
    const hasTitle = desc.indexOf('\n') > -1;
    if (hasTitle) {
      return (
        <div id={`mobile-tip-${name}-modal`} className="mobile-tip-module">
          <div className="background"></div>
          <div className="tip-box">
            <div class="tip-context">
              {desc.split('\n').map((item) => {
                const [firstChinese, ...rest] = item.split(' ');
                return (
                  <div class="tip-row">
                    <span class="tip-title">{firstChinese}</span>
                    <span class="tip-desc">{rest.join(' ')}</span>
                  </div>
                );
              })}
            </div>
            <button id="mobile-tip-confirm" className="tip-confirm" data-mobile-modal={name}>
              {t('mobileAlert.confirm')}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div id={`mobile-tip-${name}-modal`} className="mobile-tip-module">
        <div className="background"></div>
        <div className="tip-box">
          <div className="tip-context">
            <span className="tip-desc">{desc}</span>
          </div>
          <button id="mobile-tip-confirm" className="tip-confirm" data-mobile-modal={name}>
            {t('mobileAlert.confirm')}
          </button>
        </div>
      </div>
    );
  }
}

class FeaturePage extends React.Component {
  render() {
    return (
      <div class="feature-page-container">
        <Main />
        <CustomerService translator={translator} />
        <InjectScript />
      </div>
    );
  }
}

module.exports = FeaturePage;

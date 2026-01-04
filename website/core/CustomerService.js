const React = require('react');

function imgUrl(img) {
  return `https://pag.qq.com/img/${img}`;
}

class CustomerService extends React.Component {
  render() {
    const translator =  this.props.translator;
    const t = translator.t;
    return (
      <div class="customer-service">
        <div class="panel" id="js_cs_popup">
          <div class="title">{t('customerService.title')}</div>
          <div class="content">
            {t('customerService.content')}
          </div>
          <div class="questions">
            <div class="q-wrap">
              {t('faq').map((unit) => {
                let realLink = unit.link;
                if (unit.link) {
                  if (unit.link.startsWith('https') || unit.link === '/player.html') {
                    realLink = unit.link;
                  } else if (unit.link.includes('docs')) {
                    realLink = `/docs/${translator.language}` + unit.link.substring(unit.link.indexOf('docs') + 4);
                  } else {
                    realLink = `/${translator.language}` + unit.link;
                  }
                }
                return (
                  <div class="unit">
                    <div class="unit-wrap">
                      <a href={realLink}>Q ：{unit.issue}</a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div class="more">
            {t('customerService.noSuitableAnswer')}
            <br />
            {t('customerService.goToDocs')}
            <span class="strong">
              {' '}
              <a href={`/docs/${translator.language}/faq.html`}>{t('customerService.documentation')}</a>{' '}
            </span>{' '}
            {t('customerService.or')}{' '}
            <span class="strong">
              {' '}
              <a class="js_bbs">{t('customerService.contactUs')}</a>{' '}
            </span>
          </div>
        </div>
        <img id="js_cs" src={imgUrl('new_official_website/cs.png')} />
      </div>
    );
  }
}

module.exports = CustomerService;

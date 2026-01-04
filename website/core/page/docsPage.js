import { isMobile, isPage, isDocPage, getCurrentLanguage } from './utils.js';

function fitFrame() {
  if (isPage('apis-android') || isPage('apis-ios') || isPage('apis-web')) {
    var iframe = document.getElementsByTagName('iframe')[0];
    let width = window.innerWidth;
    let height = window.innerHeight;
    if (isMobile()) {
      iframe.style = `width: ${width}px; height: ${height}px; background-color: white; padding: 80px 0; position: fixed; top: 0; left: 0; margin-top: 50px; z-index: 9999`;
      return;
    }
    iframe.style = `width: ${width}px; height: ${height}px; background-color: white; padding: 80px 160px 0 160px; position: fixed; top: 0; left: 0; z-index: 9999`;
  }
}

function insertLanguageIntoHref(href, language) {
  if (href.includes(`/en/`) || href.includes(`/zh-CN/`)) {
    return href;
  }
  const basePath = '/docs/';
  const newPath = `${basePath}${language}/`;

  return href.replace(basePath, newPath);
}

function scrollContainer() {
  var scrollContainer = document.getElementById('docsNav');
  if (!scrollContainer) return;
  const links = document.querySelectorAll('.navGroup .navItem');
  for (var i = 0; i < links.length; i++) {
    if (links[i].getAttribute('href') === window.location.pathname) {
      var targetPosition = links[i].parentNode.parentNode.parentNode.offsetTop;
      let rect = links[i].getBoundingClientRect();
      if (rect.top < 0 || rect.bottom > window.innerHeight) {
        scrollContainer.scrollTop = targetPosition;
      }
      break;
    }
  }
}

function rightPageNav() {
  let pgnav = document.getElementsByClassName('onPageNav')[0];
  let mainContainer = document.getElementsByClassName('mainContainer')[0];
  if (mainContainer) {
    const rect = mainContainer.getBoundingClientRect();
    pgnav.style.left = `${rect.right}px`;
    pgnav.style.display = `block`;
  }
}

function initDocsPage() {
  if (!isDocPage()) {
    return;
  }
  fitFrame();

  scrollContainer();

  rightPageNav();

  // 文档页面滚动条
  const docsNavContainer = document.querySelector('.docsNavContainer');
  docsNavContainer.addEventListener('scroll', () => {
    docsNavContainer.classList.add('scrolling');
    clearTimeout(docsNavContainer.scrollTimeout);
    docsNavContainer.scrollTimeout = setTimeout(() => {
      docsNavContainer.classList.remove('scrolling');
    }, 800);
  });

  const links = document.querySelectorAll('.docsContainer .wrapper .post a');
  const language = getCurrentLanguage();
  if (language === 'zh-CN') {
    return;
  }
  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      const originalHref = link.getAttribute('href');
      if (originalHref) {
        const newHref = insertLanguageIntoHref(originalHref, language);
        window.location.href = newHref;
      }
    });
  });
}

export default initDocsPage;

// TGFX Website JavaScript

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function getCurrentLanguage() {
  const pathname = location.pathname;
  if (pathname.startsWith('/en/') || pathname.startsWith('/docs/en/')) {
    return 'en';
  }
  return 'zh-CN';
}

function isEnglish() {
  return getCurrentLanguage() === 'en';
}

function cssHandle() {
  if (isMobile()) {
    var pcCss = document.getElementById('pc-css');
    if (pcCss) pcCss.disabled = true;
  } else {
    var mobileCss = document.getElementById('mobile-css');
    if (mobileCss) mobileCss.disabled = true;
  }
}

function setDynamicFontSize() {
  var html = document.getElementsByTagName('html')[0];
  if (isMobile()) {
    html.style.fontSize = Math.min((document.documentElement.clientWidth / 375) * 75, 80) + 'px';
  } else {
    html.classList.add('pc');
  }
}

const navLinkTranslations = {
  '首页': 'Home',
  '文档': 'Docs',
  'API 参考': 'API Reference',
  '案例': 'Showcase',
  'GitHub': 'GitHub',
  '论坛交流': 'Discussions',
  'Github': 'Github',
};

function createLanguageSwitcher() {
  if (isMobile()) {
    return;
  }
  
  var existingSwitcher = document.getElementById('tgfx-lang-switcher');
  if (existingSwitcher) {
    return;
  }
  
  var nav = document.querySelector('.nav-site.nav-site-internal');
  if (!nav) {
    return;
  }
  
  var language = getCurrentLanguage();
  var isEn = language === 'en';
  
  var langLi = document.createElement('li');
  langLi.className = 'tgfx-lang-li';
  
  var langBtn = document.createElement('div');
  langBtn.id = 'tgfx-lang-switcher';
  langBtn.className = 'tgfx-lang-button';
  
  langBtn.innerHTML = `
    <img class="lang-icon" src="/img/tgfximg/lang-globe.svg" alt="language" />
    <span class="lang-text">${isEn ? 'EN' : 'CN'}</span>
    <img class="lang-arrow" src="/img/tgfximg/lang-arrow.svg" alt="dropdown" />
  `;
  
  var dropdown = document.createElement('div');
  dropdown.id = 'tgfx-lang-dropdown';
  dropdown.className = 'tgfx-lang-dropdown';
  
  var enItem = document.createElement('div');
  enItem.className = 'tgfx-lang-item' + (isEn ? ' active' : '');
  enItem.setAttribute('data-lang', 'en');
  enItem.innerHTML = `
    <span class="lang-code">EN</span>
    <span class="lang-divider"></span>
    <span class="lang-name">English</span>
  `;
  
  var cnItem = document.createElement('div');
  cnItem.className = 'tgfx-lang-item' + (!isEn ? ' active' : '');
  cnItem.setAttribute('data-lang', 'zh-CN');
  cnItem.innerHTML = `
    <span class="lang-code">CN</span>
    <span class="lang-divider"></span>
    <span class="lang-name">简体中文</span>
  `;
  
  dropdown.appendChild(enItem);
  dropdown.appendChild(cnItem);
  langLi.appendChild(langBtn);
  langLi.appendChild(dropdown);
  
  var githubLi = nav.children[4];
  if (githubLi) {
    nav.insertBefore(langLi, githubLi);
  } else {
    nav.appendChild(langLi);
  }
  
  langBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdown.classList.toggle('show');
  });
  
  [enItem, cnItem].forEach(function(item) {
    item.addEventListener('click', function(e) {
      e.stopPropagation();
      var nextLang = this.getAttribute('data-lang');
      var currentLang = getCurrentLanguage();
      
      if (nextLang === currentLang) {
        dropdown.classList.remove('show');
        return;
      }
      
      var newPath = location.pathname;
      if (nextLang === 'zh-CN') {
        if (newPath.startsWith('/en/')) {
          newPath = newPath.replace(/^\/en\//, '/');
        } else if (newPath.startsWith('/docs/en/')) {
          newPath = newPath.replace(/^\/docs\/en\//, '/docs/');
        }
        if (newPath === '' || newPath === '/en') newPath = '/';
      } else {
        if (newPath.startsWith('/docs/') && !newPath.includes('/en/')) {
          newPath = newPath.replace('/docs/', '/docs/en/');
        } else if (!newPath.startsWith('/en/') && !newPath.startsWith('/docs/')) {
          newPath = '/en' + (newPath === '/' ? '/' : newPath);
        }
      }
      
      location.replace(newPath);
    });
  });
  
  document.addEventListener('click', function(e) {
    if (!langLi.contains(e.target)) {
      dropdown.classList.remove('show');
    }
  });
}

function i18n() {
  var language = getCurrentLanguage();
  var isEn = language === 'en';
  
  var targetElement = document.querySelector('.nav-site.nav-site-internal');
  if (!targetElement) {
    return;
  }

  var listItems = targetElement.querySelectorAll(':scope > li');
  
  listItems.forEach(function(li, index) {
    var anchor = li.querySelector('a');
    if (!anchor) return;
    
    var text = anchor.innerText.trim();
    var href = anchor.getAttribute('href');
    
    var excludedLinks = ['https://github.com/Tencent/tgfx', 'https://github.com/Tencent/tgfx/discussions', 'https://tgfx.org/api-docs/'];

    if (isEn && navLinkTranslations[text]) {
      anchor.innerText = navLinkTranslations[text];
    }

    if (isEn && !excludedLinks.includes(href) && href && !href.startsWith('http')) {
      if (text === '文档' || text === 'Docs') {
        anchor.href = '/docs/en/home.html';
      } else if (text === 'API 参考' || text === 'API Reference') {
        anchor.href = '/docs/en/api.html';
      } else if (href === '/') {
        anchor.href = '/en/';
      } else if (!href.includes('/en/') && !href.includes('/zh-CN/')) {
        anchor.href = '/en' + href;
      }
    } else if (!isEn && !excludedLinks.includes(href) && href && !href.startsWith('http')) {
      if (text === '文档' || text === 'Docs') {
        anchor.href = '/docs/zh-CN/home.html';
      } else if (text === 'API 参考' || text === 'API Reference') {
        anchor.href = '/docs/zh-CN/api.html';
      }
    }
  });

  targetElement.classList.add('ready');
}

function appendNav() {
  if (isMobile()) {
    var header = document.getElementsByClassName('fixedHeaderContainer')[0];
    if (!header || !header.children[0]) return;
    var node = document.createElement('div');
    node.id = 'js_nav';
    node.className = 'nav-icon';
    header.children[0].appendChild(node);
    document.getElementById('js_nav').onclick = function () {
      let close = node.classList.contains('expand');
      if (close) {
        node.classList.remove('expand');
      } else {
        node.classList.add('expand');
      }
      var menu = document.getElementsByClassName('nav-site-internal')[0];
      var box = document.getElementsByClassName('slidingNav')[0];
      var headerEl = document.getElementsByClassName('fixedHeaderContainer')[0];
      var nav = document.getElementsByClassName('nav-site')[0];
      if (headerEl) headerEl.style.backdropFilter = close ? 'saturate(180%) blur(20px)' : 'none';
      if (nav) nav.style.backdropFilter = close ? 'none' : 'saturate(180%) blur(20px)';
      if (box) box.style.height = close ? '0' : window.innerHeight + 'px';
      if (menu) menu.style.display = close ? 'none' : 'block';
    };
  }
}

function appendMenuAndMeta() {
  if (isMobile()) {
    var oMeta = document.createElement('meta');
    oMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0, user-scalable=0';
    oMeta.name = 'viewport';
    document.getElementsByTagName('head')[0].appendChild(oMeta);
  }
}

function hideOriginalLanguageElements() {
  var langMenu = document.getElementById('languages-menu');
  if (langMenu) {
    langMenu.style.display = 'none';
  }
  
  var langDropdown = document.getElementById('languages-dropdown');
  if (langDropdown) {
    langDropdown.style.display = 'none';
  }
  
  var navSite = document.querySelector('.nav-site.nav-site-internal');
  if (navSite) {
    var spans = navSite.querySelectorAll(':scope > span');
    spans.forEach(function(span) {
      span.style.display = 'none';
    });
  }
}

function docReady(fn) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(fn, 1);
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

docReady(function() {
  setDynamicFontSize();
  cssHandle();
  appendNav();
  hideOriginalLanguageElements();
  i18n();
  createLanguageSwitcher();
  appendMenuAndMeta();

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (!href || href === '#') return;
      if (href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        try {
          var target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        } catch (err) {
          // console.log('Invalid selector:', href);
        }
      }
    });
  });

  var header = document.querySelector('.fixedHeaderContainer');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  var lazyImages = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window) {
    var imageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.src = image.dataset.src;
          image.removeAttribute('data-src');
          imageObserver.unobserve(image);
        }
      });
    });

    lazyImages.forEach(function (image) {
      imageObserver.observe(image);
    });
  }

  var animateElements = document.querySelectorAll('.tgfx-feature-item, .tgfx-case-card, .tgfx-user-item');
  if ('IntersectionObserver' in window) {
    var animateObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    animateElements.forEach(function (el) {
      animateObserver.observe(el);
    });
  }
});

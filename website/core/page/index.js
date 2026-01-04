import { isMobile, isPage, getCurrentLanguage, isEnglish } from './utils.js';
import initCasePage from './casePage.js';
import initIndexPage from './indexPage.js';
import initProductPage from './productPage.js';
import initFeaturePage from './featurePage.js';
import initDocsPage from './docsPage.js';
import i18n, { initializeLanguage } from './language.js';

const addDragListener = () => {
  document.addEventListener('dragenter', (ev) => {
    if (ev.dataTransfer.items.length > 0) {
      if (ev.dataTransfer.items[0].kind === 'file') {
        location.replace(`${location.origin}/player.html`);
      }
    }
  });
};

const drawLogo = async () => {
  const canvas = document.getElementById('logo-l-pag');
  if (!canvas) {
    return;
  }
  const { PAGInit } = window.libpag;
  const PAG = await PAGInit();
  const buffer = await fetch('/pag/PAG_LOGO.pag').then((res) => res.arrayBuffer());
  const pagFile = await PAG.PAGFile.load(buffer);
  const pagView = await PAG.PAGView.init(pagFile, canvas);
  pagView.setRepeatCount(0);
  pagView.play().then(() => {
    document.getElementById('logo-l').style.display = 'none';
  });
};

const loadBaiduHM = () => {
  var _hmt = _hmt || [];
  (function () {
    var hm = document.createElement('script');
    hm.src = 'https://hm.baidu.com/hm.js?1d6991470bc370252acef8a8c1387440';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(hm, s);
  })();
};

function handlePageSpecificTasks() {
  var pathname = location.pathname;
  if (isPage('')) {
    document.getElementsByClassName('nav-site')[0].children[0].classList.add('active');
  } else if (pathname.indexOf('/docs/') == 0) {
    document.getElementsByClassName('nav-site')[0].children[3].classList.add('active');
  } else if (isPage('product')) {
    document.getElementsByClassName('nav-site')[0].children[1].classList.add('active');
  } else if (isPage('feature')) {
    document.getElementsByClassName('nav-site')[0].children[2].classList.add('active');
  } else if (isPage('case')) {
    document.getElementsByClassName('nav-site')[0].children[4].classList.add('active');
  } else if (isPage('faq')) {
    document.getElementsByClassName('nav-site')[0].children[3].classList.add('active');
    if (isMobile()) {
      document.getElementById('faq').style = `width: inherit; margin: 0`;
      document.getElementsByClassName('docMainWrapper')[0].style.width = `${window.innerWidth}px`;
    }
  }
  if (isPage('pag-spec')) {
    let script = document.createElement('script');
    script.src = 'https://cdn.bootcdn.net/ajax/libs/axios/0.26.1/axios.min.js';
    script.defer = 'defer';
    document.getElementsByTagName('head')[0].appendChild(script);

    document.getElementById('pdfDownload').onclick = function () {
      const url = isEnglish() ?  '/file/pag_codec_en_V1.1.2.pdf' : '/file/pag_codec_V1.1.2.pdf' 
      axios({
        method: 'get',
        url,
        responseType: 'blob',
      }).then(function (response) {
        const link = document.createElement('a');
        let blob = new Blob([response.data], { type: response.data.type });
        let url = URL.createObjectURL(blob);
        link.href = url;
        link.download = 'pag文件格式规范.pdf';
        link.click();
      });
    };
  }
  if (isPage('pag-lvs')) {
    let script = document.createElement('script');
    script.src = 'https://cdn.bootcdn.net/ajax/libs/axios/0.26.1/axios.min.js';
    script.defer = 'defer';
    document.getElementsByTagName('head')[0].appendChild(script);

    document.getElementById('pdfDownload').onclick = function () {
      axios({
        method: 'get',
        url: '/file/live_video_stack.pdf',
        responseType: 'blob',
      }).then(function (response) {
        const link = document.createElement('a');
        let blob = new Blob([response.data], { type: response.data.type });
        let url = URL.createObjectURL(blob);
        link.href = url;
        link.download = 'live_video_stack.pdf';
        link.click();
      });
    };
  }
  if (isPage('apis-android') || isPage('apis-ios') || isPage('apis-web')) {
    var iframe = document.getElementsByTagName('iframe')[0];
    iframe.style = `width: ${window.innerWidth}px; height: ${window.innerHeight}px; background-color: white; padding: 80px 160px 0 160px; position: fixed; top: 0; left: 0; z-index: 9`;
  }
}

function appendAegis() {
  let init = document.createElement('script');
  init.innerHTML =
    "const aegis = new Aegis({ id: 'DvVmPUEQywon6Zw4dp', uin: 'xxx', reportApiSpeed: true, reportAssetSpeed: true, spa: true});";
  document.getElementsByTagName('head')[0].appendChild(init);
}

function changeDocumentTitle(title) {
  let titleElement = document.querySelector('title');
  if (titleElement) {
    titleElement.innerHTML = title;
  }
  document.title = title;
}

function changeDocumentDesc(desc) {
  document.getElementsByTagName('meta').namedItem('description').setAttribute('content', desc);
}

function addKeywords(content) {
  var SEOMeta = document.createElement('meta');
  SEOMeta.name = 'keywords';
  SEOMeta.content = content;
  document.getElementsByTagName('head')[0].appendChild(SEOMeta);
}

function appendSEOMetaByPage() {
  const pathname = location.pathname;
  const pageConfigs = [
    {
      path: '/',
      title: 'PAG官网 | PAG动效',
      description:
        'PAG动效组件可以降低或消除动效相关的研发成本，接入SDK后，设计师可通过PAGExpoter、PAGViewer等工具，一键将设计师在 AE 中制作的动效内容导出成素材文件，并快速上线应用于几乎所有的主流平台，涵盖网页动效、视频动效、游戏动效、界面动效、直播动效到广告动效等。',
      keywords:
        'ae动效设计,app动效设计,h5网页动效设计,ui动效设计,安卓动效设计,IOS动效设计,视频动效设计,直播动效设计,视频模板设计,照片模板设计,贴纸花字设计',
    },
    {
      path: '/docs/install.html',
      title: '设计师教程 | PAG官网',
      keywords:
        '安装PAGViewer,安装PAGExporter,如何导出PAG文件,BMP预合成,PAG素材优化,PAG教程，PAG支持AE特性,PAG预览工具,PAG填充模式,PAG导出错误码',
      description: '指导设计师如何使用PAG完成动效素材上线',
    },
    {
      path: '/docs/sdk.html',
      title: '开发者教程 | PAG官网',
      keywords: 'PAG SDK接入,PAG API文档,PAG文件格式规范,Lottie格式转化PAG,PAG SDK迁移',
      description: '指导开发者如何接入PAG SDK',
    },
    {
      path: '/case.html',
      title: '动效案例 | PAG官网',
      keywords: 'PAG动效,PAG动效案例,PAG动效案例,PAG ui动效,PAG app动效,PAG视频模板,PAG游戏战报',
      description: 'PAG 服务的主要业务场景',
    },
    {
      path: '/docs/faq.html',
      title: '常见问题 | PAG官网',
      keywords:
        'PAG费用,PAG支持平台,PAG源码编译报错,PAG支持模拟器吗,PAG支持Flutter,PAG与视频编辑的关系,PAG文件播放声音,PAG加载网络文件,PAG支持AE表达式,PAG优化建议',
      description: 'PAG使用的常见问题解答',
    },
    {
      path: '/product.html',
      title: '动效产品 | PAG官网',
      keywords: 'PAG社区版,PAG企业版,TAVMedia,动效素材,技术支持,视频替换,视频导出,SDK开源',
      description: 'PAG 的产品矩阵',
    },
    {
      path: '/feature.html',
      title: '动效功能 | PAG官网',
      keywords:
        'PAG各版本功能对比,AE特性支持列表,技术能力,高阶AE特性,服务支持,性能优化指导，长期有效License，AE特性定制，最佳实践指导',
      description: 'PAG 不同版本的差异以及AE特性支持的详细信息',
    },
  ];
  const pageConfig = pageConfigs.find((item) => item.path === pathname);
  if (pageConfig) {
    changeDocumentTitle(pageConfig.title);
    changeDocumentDesc(pageConfig.description);
    addKeywords(pageConfig.keywords);
  }
}

function appendBottomNav() {
  var privacyBtn = document.getElementsByClassName('privacy-policy');
  var bbsBtn = document.getElementsByClassName('js_bbs');
  var qqGroupBtn = document.getElementsByClassName('qq-group');
  for (var i = 0; i < privacyBtn.length; i++) {
    privacyBtn[i].onclick = function () {
      window.open('https://privacy.qq.com/document/preview/01e79d0cc7a2427ba774b88c6beff0fd');
    };
  }
  for (var i = 0; i < bbsBtn.length; i++) {
    bbsBtn[i].onclick = function () {
      window.open('https://github.com/Tencent/libpag/discussions');
    };
  }
  for (var i = 0; i < qqGroupBtn.length; i++) {
    qqGroupBtn[i].onclick = function () {
      window.open('https://qm.qq.com/cgi-bin/qm/qr?k=Wa65DTnEKo2hnPsvY-1EgJOF8tvKQ-ZT&jump_from=webapi');
    };
  }
}

function cssHandle() {
  if (isMobile()) {
    document.getElementById('pc-css').disabled = true;
  } else {
    document.getElementById('mobile-css').disabled = true;
  }
}

function appendNav() {
  if (isMobile()) {
    var header = document.getElementsByClassName('fixedHeaderContainer')[0];
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
      var header = document.getElementsByClassName('fixedHeaderContainer')[0];
      var nav = document.getElementsByClassName('nav-site')[0];
      header.style.backdropFilter = close ? 'saturate(180%) blur(20px)' : 'none';
      nav.style.backdropFilter = close ? 'none' : 'saturate(180%) blur(20px)';
      box.style.height = close ? '0' : window.innerHeight + 'px';
      menu.style.display = close ? 'none' : 'block';
    };
  } else {
    var nav = document.getElementsByClassName('slidingNav')[0];
    nav.children[0].children[6].children[0].target = '_blank';
    nav.children[0].children[5].children[0].target = '_blank';
    nav.children[0].children[6].onmouseover = () => {
      nav.children[0].children[6].children[0].innerText = 'Star!';
    };
    nav.children[0].children[6].onmouseleave = () => {
      nav.children[0].children[6].children[0].innerText = 'GitHub';
    };
  }
}

function appendMenuAndMeta() {
  if (isMobile()) {
    function appendMeta() {
      var oMeta = document.createElement('meta');
      oMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0, user-scalable=0';
      oMeta.name = 'viewport';
      document.getElementsByTagName('head')[0].appendChild(oMeta);
    }
    function appendMenu() {
      var bottomBar = document.getElementsByClassName('docs-prevnext')[0];
      if (bottomBar) {
        var node = document.createElement('div');
        node.id = 'js_category';
        node.className = 'category-icon';
        bottomBar.appendChild(node);
        document.getElementById('js_category').onclick = function () {
          let docNav = document.getElementById('docsNav');
          let close = docNav.classList.contains('docsSliderActive');
          if (close) {
            docNav.classList.remove('docsSliderActive');
          } else {
            docNav.classList.add('docsSliderActive');
          }
        };
      }
    }
    appendMenu();
    appendMeta();
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


// 整个HTML文档解析完毕时触发DOMContentLoaded事件, 时机比window.onload早
function docReady(fn) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(fn, 1);
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

docReady(() => {
  setDynamicFontSize();
  cssHandle();

  // header nav customize
  appendNav();

  i18n();

  // init page
  initIndexPage();
  initCasePage();
  initDocsPage();
  initProductPage();
  initFeaturePage();

  // append git/QQ group icon
  appendBottomNav();

  // Special handling of special pages
  handlePageSpecificTasks();

  // Aegis
  appendAegis();

  // SEO
  appendSEOMetaByPage();
  appendMenuAndMeta();
});

// 当整个页面及所有依赖资源如样式表和图像都已完全加载完成时触发load事件
window.addEventListener('load', function () {
  loadBaiduHM();
  addDragListener();
  drawLogo();
});

window.addEventListener('resize', function () {
  initCasePage();
  initDocsPage();
});

initializeLanguage();

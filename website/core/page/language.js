import { getCurrentLanguage, isMobile, isDocPage } from './utils.js';

const navLinkTranslations = {
  首页: 'Home',
  产品: 'Product',
  功能: 'Feature',
  文档: 'Document',
  案例: 'Showcase',
  CN: 'EN',
  GitHub: 'GitHub',
  论坛交流: 'Discussions',
  免费下载: 'Download',

};

const docTitleTranslations = {
  快捷入口: 'Shortcut Entry',
  "了解 PAG": 'About PAG',
  "快速开始": 'Quick Start',
  导出插件: 'Export Plugin',
  预览工具: 'Preview Tool',
  移动端进阶: 'Mobile Advanced',
  Web进阶: 'Web Advanced',
  API参考: 'API Reference',
  性能优化: 'Performance Optimization',
  视频教程: 'Video Tutorial',
  资源下载: 'Resource Download',
  其他: 'Others',
 'Web 进阶': 'Web Advanced',
 'API 参考': 'API Reference',
 "TAVMedia": "TAVMedia"
};

const reversedDocTitleTranslations = {
  'Shortcut Entry': '快捷入口',
  'About PAG': '了解 PAG',
  'Quick Start': '快速开始',
  'Export Plugin': '导出插件',
  'Preview Tool': '预览工具',
  'Mobile Advanced': '移动端进阶',
  'Web Advanced': 'Web进阶',
  'API Reference': 'API参考',
  'Performance Optimization': '性能优化',
  'Video Tutorial': '视频教程',
  'Resource Download': '资源下载',
  'Others': '其他',
  "TAVMedia": "TAVMedia"
};

const reversedDocSubTitleTranslations = {
  "About PAG": "了解PAG",
  "Introduction": "PAG 简介",
  "FAQs": "常见问题",
  "Quick Start": "快速开始",
  "Install PAGViewer": "安装 PAGViewer",
  "Install PAGExporter": "安装 AE 导出插件",
  "Export PAG Files": "导出 PAG 文件",
  "SDK Integration": "SDK 快速接入",
  "Export Plugin": "导出插件",
  "Use Configuration Panel": "插件选项配置面板",
  "Use Exporting Panel": "导出面板使用指南",
  "Export BMP Compositions": "BMP 预合成导出",
  "Config Fill Modes": "PAG 填充模式",
  "Config Time Stretch Modes": "PAG 时间伸缩",
  "Exporting Shortcut Keys": "快捷键设置",
  "Error Code": "导出错误码说明",
  "Auto Detection Rules": "AE 导出检测规则",
  "Text Editing Rules": "文本制作规则",
  "Add Text Background": "添加文本背景",
  "Export Audio": "如何导出音频",
  "Preview Tool": "预览工具",
  "Preview Replacements": "编辑预览效果",
  "View File Structure": "查看 PAG 文件结构",
  "Preview Shortcut Keys": "快捷键列表",
  "Export Image Sequence": "导出图片序列",
  "Add Watermark": "素材加水印",
  "Upgrade to Beta Version": "切换 Beta 版本",
  "Performance Optimization": "性能优化",
  "Use Performance Panel": "使用性能监测面板",
  "PAG File Optimization": "PAG 素材优化指南",
  "Mobile Advance Guide": "移动端进阶",
  "Common API Overview": "常用 API 解读",
  "Use PAGImageView": "UI 及列表场景播放优化",
  "Video Replacement": "占位图替换视频",
  "Play Audio": "播放有声素材",
  "Export To Video": "渲染导出视频",
  "SDK Authentication": "企业版 SDK 鉴权",
  "Web Advance Guide": "Web 进阶",
  "SDK Installation": "SDK 安装",
  "Load PAG File": "加载 PAG 文件",
  "Play PAG File": "播放 PAG 文件",
  "Platform Capabilities": "平台特性说明",
  "API Reference": "API 参考",
  "API Document": "API 文档",
  "Text Layer Description": "文本图层说明",
  "iOS API ": "iOS API 文档",
  "Android API ": "Android API 文档",
  "Web API ": "Web API 文档",
  "macOS API ": "macOS API 文档",
  "Video Tutorials": "视频教程",
  "PAG Workflow": "PAG 使用流程",
  "File Optimization Best Practices": "PAG 性能优化分享",
  "Use PAGExporter Panel": "PAGExporter 面板分享",
  "PAG Online Q&A": "PAG 线上答疑",
  "Resource Download": "资源下载",
  "PAGViewer Installer": "PAGViewer 下载",
  "PAG Test Files": "PAG 测试素材下载",
  "PAG Demo Projects": "PAG Demo 工程下载",
  "China LiveVideoStackCon2022": "2022 音视频技术大会",
  "PAG Conversion Tool": "PAG 转换工具下载",
  "PAG File Format Spec": "PAG 文件格式规范",
  "Others": "其他",
  "PAG Dictionary": "专业词汇表",
  "From Lottie To PAG": "Lottie 迁移至 PAG",
  "Manually Install PAGExporter": "手动安装导出插件",
  "TAVMedia": "TAVMedia",
  "Introduction to TAVMedia": "TAVMedia 简介",
  "TAVMedia Quick access": "TAVMedia 快速入门"
}

function getLanguageDropdownHtml() {
  const currentLanguage = getCurrentLanguage();
  return `
  <div class="dropdownItem ${currentLanguage === 'en' ? 'active' : ''}" data-lang="en">
    <div class="title">EN</div>
    <div class="divider"></div>
    <div class="content">English</div>
    <div class="icon"></div>
  </div>
  <div class="dropdownItem ${currentLanguage === 'zh-CN' ? 'active' : ''}" data-lang="zh-CN">
    <div class="title">CN</div>
    <div class="divider"></div>
    <div class="content">简体中文</div>
    <div class="icon"></div>
  </div>`;
}

export const setLanguageAndRedirect = (mappedLanguage) => {
  const pathname = window.location.pathname;
  const hasZhCnPrefix = pathname.includes('/zh-CN/');
  const hasEnPrefix = pathname.includes('/en/');
  const isHomePage = pathname === '/';
  const isDocsPage = pathname.startsWith('/docs/');
  const isDocsPageWithoutLanguage = isDocsPage && !hasZhCnPrefix && !hasEnPrefix;

  // 如果是首页
  if (isHomePage) {
    // 如果上次是英文版，且当前不在英文版首页，跳转到英文版首页
    if (mappedLanguage === 'en' && !hasEnPrefix) {
      window.location.href = '/en/';
      return;
    }
    // 如果上次是中文版或者已经在正确的语言首页，不进行跳转
    return;
  }

  // 如果 URL 已经包含语言前缀，或者是文档页面且上次是中文版，则不进行跳转
  if (hasZhCnPrefix || (isDocsPage && mappedLanguage === 'zh-CN')) {
    return;
  }

  // 如果用户的语言设置为英文，并且访问的是没有语言前缀的文档链接，则跳转到英文版文档
  if (mappedLanguage === 'en' && isDocsPageWithoutLanguage) {
    const newPath = pathname.replace('/docs/', '/docs/en/');
    if (newPath !== pathname) {
      window.location.href = newPath;
    }
    return;
  }

  // 如果用户的语言设置为英文，但不是访问文档链接，则在路径前添加 /en/
  if (mappedLanguage === 'en' && !hasEnPrefix) {
    const newPath = `/en${pathname}`;
    if (newPath !== pathname) {
      window.location.href = newPath;
    }
  }
};

export const initializeLanguage = () => {
  const languageMapping = {
    'zh-CN': 'zh-CN',
    'en-US': 'en',
  };

  const lang = localStorage.getItem('docusaurus.lang');

  if (!lang) {
    const userLanguage = window.navigator.language;
    const mappedLanguage = languageMapping[userLanguage] || 'en';
    localStorage.setItem('docusaurus.lang', mappedLanguage);
    setLanguageAndRedirect(mappedLanguage);
  } else {
    setLanguageAndRedirect(lang);
  }
};

function translateAndUpdateElement(elements, translations, language) {
  elements.forEach((element) => {
    if (language === 'zh-CN') {
      let translatedText = translations[element.innerText];
      if (translatedText) {
        element.innerText = translatedText;
      }
    }
    element.classList.add('ready');
  });
}

function removeCN(elements, language) {
  elements.forEach((element) => {
    if (language === 'zh-CN') {
      const href = element.getAttribute('href');
      if (href) {
        element.href = href.replace('/zh-CN', '');
      }
    }
  });
}

function translateEnAndUpdateElement(elements, translations, language) {
  elements.forEach((element) => {
    if (language === 'en') {
      let translatedText = translations[element.innerText];
      if (translatedText) {
        element.innerText = translatedText;
      }
    }
    element.classList.add('ready');
  });
}

function i18n() {
  let language = getCurrentLanguage();
  let targetElement = document.querySelector('.nav-site.nav-site-internal');
  let listItems = targetElement.querySelectorAll(':scope > li');
  listItems.forEach((li) => {
    let anchor = li.querySelector('a');
    let text = anchor.innerText;
    const href = anchor.getAttribute('href');
    const excludedLinks = ['https://github.com/Tencent/libpag', 'https://github.com/Tencent/libpag/discussions', '/#download'];
    if (language === 'zh-CN') {
      return;
    }
    if (text === '文档') {
      anchor.href = `/docs/${language}/home.html`;
    } else if (!excludedLinks.includes(href)) {
      anchor.href = `/${language}${anchor.getAttribute('href')}`;
    }
    if (language === 'en') {
      let translatedText = navLinkTranslations[text];
      if (translatedText) {
        anchor.innerText = translatedText;
      }
    }
  });
  targetElement.classList.add('ready');

  if (isDocPage()) {
    let docTitleItems = document.querySelectorAll('.navGroupCategoryTitle');
    translateAndUpdateElement(docTitleItems, reversedDocTitleTranslations, language);
    translateEnAndUpdateElement(docTitleItems, docTitleTranslations, language);
  
    let docSubTitleItems = document.querySelectorAll('.navItem');
    translateAndUpdateElement(docSubTitleItems, reversedDocSubTitleTranslations, language);
    removeCN(docSubTitleItems, language);

    let prevItems = document.querySelectorAll('.docs-prev.button');
    let nextItems = document.querySelectorAll('.docs-next.button');
    removeCN([...prevItems, ...nextItems], language);

    let docTitleItem = document.getElementById('__docusaurus');
    translateAndUpdateElement([docTitleItem], reversedDocSubTitleTranslations, language);
  }

  var nav = document.getElementsByClassName('slidingNav')[0];
  if (isMobile()) {
    var header = document.getElementsByClassName('fixedHeaderContainer')[0];
    var languageNode = document.createElement('div');
    languageNode.id = 'js_language';
    languageNode.className = 'language-icon';
    languageNode.innerHTML = `
      <div class="icon-img"></div>
      <div class="label">${language === 'en' ? 'EN' : 'CN'}</div>
    `;
    const languageDropdown = document.createElement('div');
    languageDropdown.id = 'languageDropdown';
    languageDropdown.classList.add('languageDropdown');
    languageDropdown.innerHTML = getLanguageDropdownHtml();
    languageNode.appendChild(languageDropdown);
    header.children[0].appendChild(languageNode);
    document.getElementById('js_language').onclick = () => {
      const dropdown = document.querySelector('.languageDropdown');
      if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
      } else {
        dropdown.classList.add('show');
      }
    };
    if (language === 'en') {
      let cnFooterElement = document.querySelector('.nav-footer.mobile-footer .content.footer-cn');
      cnFooterElement.style.display = 'none';
    } else {
      let cnFooterElement = document.querySelector('.nav-footer.mobile-footer .content.footer-en');
      cnFooterElement.style.display = 'none';
    }
  } else {
    const languageSwitcher = nav.children[0].children[5];
    const languageDropdown = document.createElement('div');
    languageDropdown.id = 'languageDropdown';
    languageDropdown.classList.add('languageDropdown');
    languageDropdown.innerHTML = getLanguageDropdownHtml();
    languageSwitcher.children[0].appendChild(languageDropdown);
    languageSwitcher.onclick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const dropdown = document.querySelector('.languageDropdown');
      if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
      } else {
        dropdown.classList.add('show');
      }
    };
  }
  const dropdownItems = document.querySelectorAll('.dropdownItem');
  dropdownItems.forEach((item) => {
    item.addEventListener('click', function () {
      const currentLanguage = getCurrentLanguage();
      const nextLanguage = this.getAttribute('data-lang');
      if (currentLanguage === nextLanguage) return;
      localStorage.setItem('docusaurus.lang', nextLanguage);
  
      let newPath = location.pathname.replace(/^(\/(?:docs\/)?)(zh-CN\/|en\/)?/, (match, prefix, lang) => {
        if (nextLanguage === 'zh-CN') {
          return lang ? prefix : match;
        } else {
          return lang ? match.replace(lang, nextLanguage + '/') : prefix + nextLanguage + '/';
        }
      });
  
      location.href = newPath;
    });
  });
  if (language === 'en') {
    let cnFooterElement = document.querySelector('.nav-footer .content.footer-cn');
    cnFooterElement.style.display = 'none';
  } else {
    let cnFooterElement = document.querySelector('.nav-footer .content.footer-en');
    cnFooterElement.style.display = 'none';
  }

  let aTag = document.querySelector("body > div.fixedHeaderContainer > div > header > a");
  aTag.setAttribute("href", "/");
}

// ==================== 添加图标显示调试函数 ====================
function debugIconDisplay() {
  console.log('========== 图标显示调试信息 ==========');
  
  // 检查GitHub按钮
  const githubLi = document.querySelector('body .nav-site.nav-site-internal li:nth-child(6)');
  const githubA = githubLi ? githubLi.querySelector('a') : null;
  
  if (githubA) {
    const githubStyles = window.getComputedStyle(githubA);
    console.log('GitHub按钮样式:');
    console.log('  - width:', githubStyles.width);
    console.log('  - height:', githubStyles.height);
    console.log('  - background-image:', githubStyles.backgroundImage);
    console.log('  - background-size:', githubStyles.backgroundSize);
    console.log('  - background-position:', githubStyles.backgroundPosition);
    console.log('  - background-repeat:', githubStyles.backgroundRepeat);
    console.log('  - padding:', githubStyles.padding);
    console.log('  - display:', githubStyles.display);
    console.log('  - align-items:', githubStyles.alignItems);
  } else {
    console.log('❌ 未找到GitHub按钮元素');
  }
  
  // 检查论坛按钮
  const bbsLi = document.querySelector('body .nav-site.nav-site-internal li:nth-child(7)');
  const bbsA = bbsLi ? bbsLi.querySelector('a') : null;
  
  if (bbsA) {
    const bbsStyles = window.getComputedStyle(bbsA);
    console.log('论坛交流按钮样式:');
    console.log('  - width:', bbsStyles.width);
    console.log('  - height:', bbsStyles.height);
    console.log('  - background-image:', bbsStyles.backgroundImage);
    console.log('  - background-size:', bbsStyles.backgroundSize);
    console.log('  - background-position:', bbsStyles.backgroundPosition);
    console.log('  - background-repeat:', bbsStyles.backgroundRepeat);
    console.log('  - padding:', bbsStyles.padding);
    console.log('  - display:', bbsStyles.display);
    console.log('  - align-items:', bbsStyles.alignItems);
  } else {
    console.log('❌ 未找到论坛交流按钮元素');
  }
  
  // 检查CSS文件是否加载
  const allStyleSheets = Array.from(document.styleSheets);
  console.log('已加载的CSS文件:');
  allStyleSheets.forEach((sheet, index) => {
    try {
      console.log(`  ${index + 1}. ${sheet.href || '(inline)'}`);
    } catch (e) {
      console.log(`  ${index + 1}. (无法访问)`);
    }
  });
  
  // 检查图标URL是否可访问
  const testImage = new Image();
  testImage.onload = () => {
    console.log('✅ GitHub图标URL可访问');
  };
  testImage.onerror = () => {
    console.log('❌ GitHub图标URL无法访问');
  };
  testImage.src = 'https://pag.qq.com/img/new_official_website/github_top.png';
  
  const testImage2 = new Image();
  testImage2.onload = () => {
    console.log('✅ 论坛图标URL可访问');
  };
  testImage2.onerror = () => {
    console.log('❌ 论坛图标URL无法访问');
  };
  testImage2.src = 'https://pag.qq.com/img/new_official_website/bbs.png';
  
  console.log('========================================');
}

// 在页面加载完成后执行调试
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(debugIconDisplay, 500);
  });
}

export default i18n;

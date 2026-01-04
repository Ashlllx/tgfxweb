import { isPage, isMobile, isEnglish } from './utils.js';

function isSafari() {
  const userAgent = navigator.userAgent;
  const isChrome = userAgent.indexOf('Chrome') > -1;
  const isSafari = userAgent.indexOf('Safari') > -1;

  return isSafari && !isChrome;
}


function getLineCount(str) {
  const strWidth = getStringWidth(str);
  const lineCount = Math.ceil(strWidth / 430);
  return lineCount;
}

let context = null;

function getContext() {
  if (!context) {
    // 创建一个离屏 canvas 元素以测量文本字符串的宽度和高度
    const canvas = document.createElement('canvas');
    context = canvas.getContext('2d');
    // 设置需要使用的字体样式
    context.font = '12px "PingFang SC", "Microsoft YaHei", "Heiti SC", "Heiti TC", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"';
  }
  return context;
}

function getStringWidth(str) {
  let currentContext = getContext();
  const width = currentContext.measureText(str).width;

  return isSafari() ? (width + 15) : width;
}

function onMouseOverTooltip(event) {
  const tooltipText = event.currentTarget;
  const tooltip = tooltipText.querySelector('.tooltip');
  const tooltipDesc = tooltipText.querySelector('.tooltip-desc');
  const tooltipLineHeight = 22;

  let tooltipWidth = 0;
  let tooltipHeight = 0;

  if (tooltip.classList.contains('complexTooltip')) {
    tooltip.style.visibility = 'visible';
    return;
  }
  
  if (tooltip.classList.contains('tooltipList')) {
    const tooltipData = tooltip.getAttribute('data-tooltip');
    const tooltipList = tooltipData.split('\n');
    let maxWidth = 0;

    for (let i = 0; i < tooltipList.length; i++) {
      const textContentWidth = getStringWidth(tooltipList[i]);
      maxWidth = Math.max(maxWidth, textContentWidth);
    }

    tooltipWidth = maxWidth + 15;
    tooltipHeight = tooltipLineHeight * tooltipList.length + 40;
  } else {
    // 计算文本渲染的宽度和高度
    const textContentWidth = getStringWidth(tooltipDesc.textContent);
    const lineCount = (getLineCount = Math.ceil(textContentWidth / 430));
    tooltipWidth = lineCount > 1 ? 430 : textContentWidth;
    tooltipHeight = lineCount * tooltipLineHeight + 40;
  }
  if (!isEnglish()) {
    tooltipWidth = tooltipWidth + 15;
  }
  tooltip.style.width = `${tooltipWidth + 40}px`;
  tooltip.style.height = `${tooltipHeight}px`;
  tooltip.style.top = `-${tooltipHeight / 2  - 10}px`;

  // 显示 tooltip
  tooltip.style.visibility = 'visible';
}

function onMouseOutTooltip(event) {
  const tooltipText = event.currentTarget;
  const tooltip = tooltipText.querySelector('.tooltip');

  // 隐藏 tooltip
  tooltip.style.visibility = 'hidden';
}

function scrollTable() {
  const fixedHeaderContainer = document.querySelector('.fixedHeaderContainer');
  const headerHeight = fixedHeaderContainer ? fixedHeaderContainer.offsetHeight : 0;
  const bannerContainer = document.querySelector('.section-one');
  const bannerHeight = bannerContainer ? bannerContainer.offsetHeight : 0;

  
  const comparisonTable = document.getElementById('comparison-feature-table-content');
  const comparisonTableHeight = comparisonTable ? comparisonTable.offsetHeight : 0;
  const comparisonHeaderEl = document.querySelector('#comparison-fixed-header');
  const comparisonHeaderElHeight = comparisonHeaderEl ? comparisonHeaderEl.offsetHeight : 0;
  const comparisonHeaderElTop = comparisonHeaderEl.offsetTop + bannerHeight;
  const comparisonTableAnchor =
    comparisonTableHeight + comparisonTable.offsetTop + bannerHeight - 72 - comparisonHeaderElHeight;
  const aeTableContainer = document.getElementById('ae-feature-table');
  const aeHeaderEl = document.querySelector('#ae-fixed-header');
  const aeHeaderElTop = aeHeaderEl.offsetTop + aeTableContainer.offsetTop;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop <= comparisonTableAnchor) {
      comparisonHeaderEl.classList.remove('sticky');
      comparisonHeaderEl.style.top = 'auto';

      aeHeaderEl.classList.remove('sticky');
      aeHeaderEl.style.top = 'auto';
    }

    if (scrollTop >= comparisonHeaderElTop) {
      comparisonHeaderEl.classList.add('sticky');
      comparisonHeaderEl.style.top = headerHeight + 'px';
    }
    if (scrollTop >= comparisonTableAnchor) {
      comparisonHeaderEl.classList.remove('sticky');
      comparisonHeaderEl.style.top = 'auto';
    }

    if (scrollTop >= aeHeaderElTop) {
      aeHeaderEl.classList.add('sticky');
      aeHeaderEl.style.top = headerHeight + 'px';
    } else {
      aeHeaderEl.classList.remove('sticky');
      aeHeaderEl.style.top = 'auto';
    }
  });
}

function initFeaturePage() {
  if (isPage('feature')) {
    if (isMobile()) {
      const showFeatureModal = (name, show = true) => {
        const id = `mobile-tip-${name}-modal`;
        const visibility = show ? 'visible' : 'hidden';
        document.getElementById(id).style.visibility = visibility;
      };
      const iconList = document.querySelectorAll('#table-row-item-icon-mobile');
      if (iconList && iconList.length > 0) {
        iconList.forEach((icon) => {
          const name = icon.dataset.mobileModal;
          icon.addEventListener('click', () => {
            showFeatureModal(name, true);
          });
        });
      }

      const btnList = document.querySelectorAll('#mobile-tip-confirm');
      if (btnList && btnList.length > 0) {
        btnList.forEach((btn) => {
          const name = btn.dataset.mobileModal;
          btn.addEventListener('click', () => {
            showFeatureModal(name, false);
          });
        });
      }

      setTimeout(() => {
        scrollTable()
      }, 1000)
    } else {
      const tooltipTextElements = document.querySelectorAll('.tooltip-text');

      tooltipTextElements.forEach((tooltipText) => {
        tooltipText.addEventListener('mouseover', onMouseOverTooltip);
        tooltipText.addEventListener('mouseout', onMouseOutTooltip);
      });

      scrollTable()
    }

    const productNavElements = document.querySelectorAll('.product-nav');
    for (var i = 0; i <= productNavElements.length - 1; i++) {
      productNavElements[i].onclick = function (e) {
        const id = this.getAttribute('data-link-id');
        const anchorElement = document.getElementById(id);
        window.location.hash = id;
        anchorElement?.scrollIntoView({ behavior: 'auto' });
      };
    }

    const targetHash = window.location.hash;
    if (targetHash) {
      const anchorElement = document.querySelector(targetHash);
      if (anchorElement) {
        setTimeout(() => {
          anchorElement?.scrollIntoView({ behavior: 'auto' });
        }, 0);
      }
    }


  }
}

export default initFeaturePage;

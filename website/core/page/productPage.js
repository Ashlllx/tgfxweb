
import { isPage, isMobile, isEnglish } from './utils.js';

const initProductPage = () => {
  if (!isPage('product')) return;
  const jumpToBuy = () => {
    const url = 'https://work.weixin.qq.com/kfid/kfc239fa6001ff703c3';
    window.open(url);
  };
  const jumpToEmail = () => {
    var email = 'libpag@tencent.com';
    window.open("mailto:" + email);
  };
  if (isMobile() || isEnglish()) {
    const btnList = document.querySelectorAll('.product-buy-btn');
    if (btnList && btnList.length > 0) {
      btnList.forEach((btn) => {
        btn.addEventListener('click', () => {
          if (isEnglish()) {
            jumpToEmail();
          } else {
            jumpToBuy();
          }
        });
      });
    }
  }
  const productNavElements = document.querySelectorAll('.product-nav');
  for (var i = 0; i <= productNavElements.length - 1; i++) {
    productNavElements[i].onclick = function () {
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
};

export default initProductPage;

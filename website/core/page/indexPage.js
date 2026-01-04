import { isMobile } from './utils.js';

let isIndexPage = () =>
  location.pathname === '/' ||
  location.pathname === '/index' ||
  location.pathname === '' ||
  location.pathname === '/en' ||
  location.pathname === '/zh-CN' ||
  location.pathname === '/en/' ||
  location.pathname === '/zh-CN/';

function addDownloadBtn() {
  const downloadLink = document.querySelector('a[href="/#download"]');
  downloadLink.classList.add('download-btn');
  downloadLink.addEventListener('click', function(e) {
    e.preventDefault();
  });
  var btns = document.getElementsByClassName('download-btn');
  for (var i = 0; i < btns.length; i++) {
    btns[i].onclick = function () {
      var pkg = document.getElementsByClassName('pkg-download')[0];
      pkg.scrollIntoView();
    };
  }
}

const initIndexPage = () => {
  if (!isIndexPage()) return;

  if (isMobile()) {
    document.body.style.backgroundImage = "url('https://pag.qq.com/img/new_official_website/bg_m.png')";
    // remove href and popup alert
    function disableDownloadBtn() {
      var downloadBtn = document.getElementsByClassName('download-package-btn');
      for (var i = 0; i < downloadBtn.length; i++) {
        downloadBtn[i].ontouchstart = function () {
          document.getElementById('mobile-alert-modal').style.visibility = 'initial';
          return false;
        };
        downloadBtn[i].href = 'javascript:void(0)';
      }
      var modalConfirmBtn = document.getElementById('mobile-alert-modal-confirm');
      modalConfirmBtn.ontouchstart = function () {
        document.getElementById('mobile-alert-modal').style.visibility = 'hidden';
        return false;
      };
    }
    disableDownloadBtn();
  } else {
    document.body.style.backgroundImage = "url('https://pag.qq.com/img/new_official_website/fill1.png')";
  }

  addDownloadBtn();
};

export default initIndexPage;

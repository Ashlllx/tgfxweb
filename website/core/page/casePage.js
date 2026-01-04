import { isEnglish, isMobile, isPage, isWeChat } from './utils.js';

const caseBox = {
  HEIGHT_PC: 1300,
  HEIGHT_MB: 920,
  WIDTH: 460,
};

var fixBg = false;
var lastIdx = 0;
var skipping = false;

function skipTo(idx) {
  let anchorPoint = Number(idx * caseBox.HEIGHT_PC);
  window.scrollTo({
    top: anchorPoint + 0,
    left: 0,
    behavior: 'smooth',
  });
}

function updateBg(fixBg) {
  let idx = 0;
  if (fixBg) {
    return;
  }
  if (isMobile()) {
    idx = parseInt(document.documentElement.scrollTop / caseBox.HEIGHT_MB, 10);
  } else {
    idx = parseInt(document.documentElement.scrollTop / caseBox.HEIGHT_PC, 10);
  }

  if (idx >= 2 && !fixBg) {
    fixBg = true;
  }
  if (!fixBg && !isMobile()) {
    let offsetX = window.innerWidth * 0.35;
    let offsetY = window.innerHeight * 0.25;
    document.getElementById(
      'wallpaper'
    ).style = `transform: scale(1.62) translate(${offsetX}px, ${offsetY}px); transition: all 1.6s cubic-bezier(.645,.045,.355,1);`;
  } else if (!fixBg && isMobile()) {
    let scale = 616 / window.innerWidth;
    document.getElementById('wallpaper').style = `transform: scale(${scale}) translateY(1.2rem)`;
  }
  fixBg = true;
}

function changeStyle(action) {
  let videos = document.getElementsByClassName('video');
  for (let i = 0; i < videos.length; i++) {
    switch (action) {
      case 'add':
        let caseWrappers = document.getElementsByClassName('caseWrapper');
        for (let j = 0; j < caseWrappers.length; j++) {
          caseWrappers[j].style.margin = 'calc(50vh - 250px) auto 0 auto';
        }
        document.getElementById('arrowTip').style.display = 'block';
        videos[i].classList.add('wechat');
        break;
      case 'remove':
        videos[i].classList.remove('wechat');
        videos[i].style = 'transition: all 2.8s cubic-bezier(.645,.045,.355,1)';
        setTimeout(() => {
          document.getElementById('arrowTip').style.display = 'none';
        }, 500);
        break;
    }
  }
}

function updateText(titles) {
  let idx, titleOffset;

  if (isMobile()) {
    idx = parseInt(document.documentElement.scrollTop / caseBox.HEIGHT_MB, 10);
    titleOffset = titles[idx].getBoundingClientRect().top - 70;
  } else {
    idx = parseInt(document.documentElement.scrollTop / caseBox.HEIGHT_PC, 10);
    titleOffset = titles[idx].getBoundingClientRect().top - 110;
  }

  if (titleOffset < 0) {
    titles[idx].style = `opacity: ${1 + 0.012 * titleOffset}`;
  } else {
    titles[idx].style = 'opacity: 1';
  }
}

function updateProgressBar(marks) {
  if (isMobile()) {
    return;
  }
  let idx = parseInt((document.documentElement.scrollTop + window.innerHeight / 2 - 100) / caseBox.HEIGHT_PC, 10);

  for (let i = 0; i < marks.length; i++) {
    if (i === idx) {
      marks[idx].className = 'mark active';
      if (idx > 0) marks[idx - 1].className = 'mark near';
    } else {
      marks[i].className = 'mark';
    }
  }
}

function initCasePage() {
  if (!isPage('case')) {
    return;
  }
  if (isWeChat()) {
    changeStyle('add');
  }
  document.addEventListener(
    'touchstart',
    function () {
      playVideo();
    },
    false
  );
  let titles = document.getElementsByClassName('titleBox');
  let marks = document.getElementsByClassName('mark');
  let progressBar = document.getElementById('progressBox');

  if (isMobile() || window.innerWidth - 980 < 80) {
    progressBar.style.display = 'none';
  } else {
    if (isEnglish()) {
      progressBar.style.display = 'block';
      var caseWrapperEl = document.querySelector('.caseWrapper');
      var position = caseWrapperEl.getBoundingClientRect();
      var distanceFromLeft = position.left;
      progressBar.style.left = `${distanceFromLeft - 380 - 20}px`;
    } else {
      progressBar.style.display = 'block';
      progressBar.style.left = `${(window.innerWidth - 980) / 2}px`;
    }
  }
  marks[0].className = 'mark active';

  window.addEventListener(
    'scroll',
    function (e) {
      // 进度条更新
      updateProgressBar(marks);
      // 背景更新
      updateBg(fixBg);
      // 标题渐隐
      // updateText(titles);
      // 视频可见
      if (isWeChat()) {
        changeStyle('remove');
      }
    },
    { passive: false }
  );

  document.getElementById('progressUl').addEventListener('click', (e) => {
    let index = Number(e.target.getAttribute('idx'));
    console.log('index:' + index);
    // 点击进度条进行跳转时，避免吸附效果
    skipping = true;
    skipTo(index);
    setTimeout(() => {
      skipping = false;
    }, 1000);
  });
}

export default initCasePage;

let PAG;
let pagView;
let pagFile;
let hadPAGView = false;
let playerCanvas;

const performanceData = {
  PAGFileDecodeTime: 0,
  PAGViewInitTime: 0,
  renderingTime: 0,
  imageDecodingTime: 0,
  presentingTime: 0,
};
let fpsBuffer = [];

class Translator {
  constructor() {
    this.language = 'en';
    this.translations = null;
  }

  initialize = (language) => {
    this.language = language;
    const translationsZH = {
      uploadOrDropPAG: "点击上传或拖拽一个PAG文件到此处预览",
      pagPerformanceMetrics: "PAG 性能指标",
      pagInitSuccess: "PAG 初始化成功：",
      pagInitFailSupport: "PAG 初始化失败，如需技术支持可到 https://github.com/Tencent/libpag/discussions 提问",
      firefoxDecoder: "Firefox 浏览器加载 ffavc 软件解码器",
      decoderSuccess: "加载 ffavc 软件解码器成功",
      insertPAG: "请放入PAG文件进行预览！",
      pagFileDecodeTime: "PAGFile解码耗时:",
      pagViewInitTime: "PAGView初始化耗时",
    }
    const translationsEN = {
      uploadOrDropPAG: "Click to upload or drag and drop a PAG file here to preview",
      pagPerformanceMetrics: "PAG Performance Metrics",
      pagInitSuccess: "PAG initialization succeeded:",
      pagInitFailSupport: "PAG initialization failed, if you need technical support, you can ask questions at https://github.com/Tencent/libpag/discussions",
      firefoxDecoder: "Firefox browser loads ffavc software decoder",
      decoderSuccess: "Successfully loaded ffavc software decoder",
      insertPAG: "Please put in the PAG file for preview!",
      pagFileDecodeTime: "PAGFile decoding time:",
      pagViewInitTime: "PAGView initialization time:",
    };
    this.translations = language === 'zh-CN' ? translationsZH : translationsEN;
  };

  t = (key) => {
    const keys = key.split('.');
    let current = this.translations;
    for (let i = 0; i < keys.length; i++) {
      current = current[keys[i]];
    }
    return current;
  };
}

const translator = new Translator();
const lang = localStorage.getItem('docusaurus.lang') || 'en';
translator.initialize(lang);
const t = translator.t;

window.onload = async () => {
  document.querySelectorAll('.translate').forEach((el) => {
    const key = el.getAttribute('data-translate-id');
    el.innerText = t(key);
    el.classList.add('translated');
  });
  try {
    PAG = await window.libpag.PAGInit();
    console.log(t('pagInitSuccess'), PAG);
  } catch (e) {
    alert(t('pagInitFailSupport'));
    throw e;
  }
  if (/Firefox/i.test(navigator.userAgent)) {
    console.log(t('firefoxDecoder'));
    if (await loadJS("https://unpkg.com/ffavc@latest/lib/ffavc.min.js")) {
      const FFAVC = await window.ffavc.FFAVCInit();
      const ffavcDecoderFactory = new FFAVC.FFAVCDecoderFactory();
      PAG.registerSoftwareDecoderFactory(ffavcDecoderFactory);
      console.log(t('decoderSuccess'));
    } else {
      console.error("Load ffavc fail!");
    }
  }
  resizeCanvas();

  const player = document.getElementById("player");

  player.addEventListener("click", () => {
    document.getElementById("upload").click();
  });
  document.getElementById("upload").addEventListener("change", (event) => {
    if (event.target) {
      createPAGView(event.target.files[0]);
    }
  });

  document.addEventListener("dragover", (ev) => {
    ev.preventDefault();
  });
  document.addEventListener("drop", (ev) => {
    ev.preventDefault();
    if (ev.dataTransfer.files.length > 0) {
      if (/\.(pag)$/.test(ev.dataTransfer.files[0].name)) {
        createPAGView(ev.dataTransfer.files[0]);
        return;
      }
    }
    alert(t('insertPAG'));
  });

  const performanceBtn = document.getElementById("performance-btn");
  const performancePopover = document.getElementById("performance");
  performanceBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    performanceBtn.style.display = "none";
    performancePopover.style.display = "block";
  });
  performancePopover.addEventListener("click", (event) => {
    event.stopPropagation();
    performancePopover.style.display = "none";
    performanceBtn.style.display = "block";
  });

  const backgroundBtn = document.getElementById("background-btn");
  let isBackgroundZebra = true;
  backgroundBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    if (isBackgroundZebra) {
      player.classList.add("background-black");
      player.classList.remove("zebra");
    } else {
      player.classList.add("zebra");
      player.classList.remove("background-black");
    }
    isBackgroundZebra = !isBackgroundZebra;
  });

  const createPAGView = async (file) => {
    // 清除提示
    if (!hadPAGView) {
      hadPAGView = true;
      document.getElementById("box").style.display = "none";
      player.classList.add("zebra");
      performanceBtn.style.display = "block";
      backgroundBtn.style.display = "block";
    }
    // 清除上一个 PAG 相关的资源
    if (pagFile) pagFile.destroy();
    if (pagView) pagView.destroy();
    const decodeStartTime = performance.now();
    pagFile = await PAG.PAGFile.load(file);
    performanceData.PAGFileDecodeTime = performance.now() - decodeStartTime;
    const initStartTime = performance.now();
    pagView = await PAG.PAGView.init(pagFile, playerCanvas, {
      useScale: false,
      firstFrame: false,
    });
    performanceData.PAGViewInitTime = performance.now() - initStartTime;
    updatePerformance();
    pagView.addListener("onAnimationUpdate", () => {
      updatePerformance({
        renderingTime: pagView.player.renderingTime() / 1000,
        imageDecodingTime: pagView.player.imageDecodingTime() / 1000,
        presentingTime: pagView.player.presentingTime() / 1000,
      });
    });
    pagView.setRepeatCount(0);
    await pagView.play();
  };
};

let resizeCoolDown = null;

window.onresize = () => {
  if (resizeCoolDown) {
    clearTimeout(resizeCoolDown);
    resizeCoolDown = null;
  }
  resizeCoolDown = setTimeout(() => {
    resizeCanvas();
  }, 300);
};

const resizeCanvas = () => {
  if (!playerCanvas) {
    playerCanvas = document.getElementById("canvas");
  }
  const styleDeclaration = window.getComputedStyle(playerCanvas, null);
  playerCanvas.width =
    Number(styleDeclaration.width.replace("px", "")) * window.devicePixelRatio;
  playerCanvas.height =
    Number(styleDeclaration.height.replace("px", "")) * window.devicePixelRatio;
  if (pagView) {
    pagView.updateSize();
    pagView.flush();
  }
};

const loadJS = (url) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.onload = function () {
      resolve(true);
    };
    script.onerror = function () {
      resolve(true);
    };
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  });
};

const updatePerformance = (data = {}) => {
  Object.assign(performanceData, data);
  const now = performance.now();
  fpsBuffer = fpsBuffer.filter((item) => now - item < 1000);
  if (data.renderingTime) fpsBuffer.push(now);
  document.getElementById("performance-box").innerText = `
    ${t('pagFileDecodeTime')} ${performanceData.PAGFileDecodeTime.toFixed(2)}ms\n
    ${t('pagViewInitTime')} ${performanceData.PAGViewInitTime.toFixed(2)}ms\n
    FPS: ${fpsBuffer.length}\n
    RenderingTime: ${performanceData.renderingTime.toFixed(2)}ms\n
    ImageDecodingTime: ${performanceData.imageDecodingTime.toFixed(2)}ms\n
    PresentingTime: ${performanceData.presentingTime.toFixed(2)}ms\n
  `;
};

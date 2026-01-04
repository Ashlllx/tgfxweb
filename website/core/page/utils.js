export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function isPage(page) {
  const pattern = `^\/(?:docs\/)?(?:zh-CN|en)?\/?${page}(?:\\.html)?$`;
  return new RegExp(pattern).test(location.pathname);
}

export function isDocPage2(page) {
  const pathname = location.pathname;
  if (!(pathname.indexOf('/docs') == 0 && !isPage('faq'))) {
    return false;
  }
  return true
}

export function isDocPage(page) {
  const pathname = location.pathname;
  if (!pathname.indexOf('/docs') == 0) {
    return false;
  }
  return true
}

export function parseQueryString(url) {
  var queryStart = url.indexOf('?') + 1,
    queryEnd = url.indexOf('#') + 1 || url.length + 1,
    query = url.slice(queryStart, queryEnd - 1),
    pairs = query.split('&'),
    params = {},
    i,
    n,
    v,
    nv;

  if (query === url || query === '') {
    return params;
  }

  for (i = 0; i < pairs.length; i++) {
    nv = pairs[i].split('=');
    n = decodeURIComponent(nv[0]);
    v = decodeURIComponent(nv[1]);

    if (!params.hasOwnProperty(n)) {
      params[n] = [];
    }

    params[n].push(nv.length === 2 ? v : null);
  }

  return params;
}

export function isWeChat() {
  let ua = window.navigator.userAgent.toLowerCase();
  if (ua.indexOf('micromessenger') != -1) {
    return true;
  }
  return false;
}

export function getCurrentLanguage() {
  const languagePattern = /^\/(?:docs\/)?(zh-CN|en)\//;
  const match = location.pathname.match(languagePattern);

  if (match) {
    const language = match[1];
    return language;
  } else {
    return 'zh-CN';
  }
}

export function isEnglish() {
  return getCurrentLanguage() === 'en';
}
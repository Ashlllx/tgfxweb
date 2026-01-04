const users = [
  {
    caption: 'WeChat',
    image: 'https://pag.qq.com/img/wechat.png',
    infoLink: 'https://weixin.qq.com',
    pinned: true,
  },
  {
    caption: 'QQ',
    image: 'https://pag.qq.com/img/qq.png',
    infoLink: 'https://im.qq.com',
    pinned: true,
  },
  {
    caption: 'Honor of Kings',
    image: 'https://pag.qq.com/img/wangzhe.png',
    infoLink: 'https://pvp.qq.com',
    pinned: true,
  },
  {
    caption: 'Tencent Video',
    image: 'https://pag.qq.com/img/tencentvideo.png',
    infoLink: 'https://v.qq.com',
    pinned: true,
  },
  {
    caption: 'QQ Music',
    image: 'https://pag.qq.com/img/qqmusic.png',
    infoLink: 'https://y.qq.com/',
    pinned: true,
  },
  {
    caption: 'QQ Space',
    image: 'https://pag.qq.com/img/qzone.png',
    infoLink: 'https://qzone.qq.com/',
    pinned: true,
  },
  {
    caption: 'JD Finance',
    image: 'https://pag.qq.com/img/jingdongfinance.webp',
    infoLink: 'https://jr.jd.com/',
    pinned: true,
  },
  {
    caption: 'Tencent News',
    image: 'https://pag.qq.com/img/tencentnews.webp',
    infoLink: 'https://news.qq.com/',
    pinned: true,
  },
  {
    caption: 'Game for Peace',
    image: 'https://pag.qq.com/img/hepingjingying.webp',
    infoLink: 'https://gp.qq.com/',
    pinned: true,
  },
  {
    caption: 'RED (Little Red Book)',
    image: 'https://pag.qq.com/img/xiaohongshu.webp',
    infoLink: 'https://www.xiaohongshu.com/',
    pinned: true,
  },
  {
    caption: 'Zhihu',
    image: 'https://pag.qq.com/img/zhihu.webp',
    infoLink: 'https://www.zhihu.com/explore',
    pinned: true,
  },
  {
    caption: 'MOMO',
    image: 'https://pag.qq.com/img/momo.webp',
    infoLink: 'https://www.immomo.com/',
    pinned: true,
  },
  {
    caption: 'Tencent Sports',
    image: 'https://pag.qq.com/img/tengxuntiyu.webp',
    infoLink: 'https://v.qq.com/x/live/sport.html',
  },
  {
    caption: 'Tencent Maps',
    image: 'https://pag.qq.com/img/tencentmap.webp',
    infoLink: 'https://map.qq.com/mobile/',
  },
  {
    caption: 'Tencent Meeting',
    image: 'https://pag.qq.com/img/tencentmeeting.webp',
    infoLink: 'https://meeting.tencent.com/',
  },
  {
    caption: 'Douban',
    image: 'https://pag.qq.com/img/douban.webp',
    infoLink: 'https://www.douban.com/',
  },
  {
    caption: 'Bilibili',
    image: 'https://pag.qq.com/img/bilibili.webp',
    infoLink: 'https://www.bilibili.com/',
  },

  {
    caption: 'Huxiu',
    image: 'https://pag.qq.com/img/huxiu.webp',
    infoLink: 'https://www.huxiu.com/',
  },
  {
    caption: 'WeBank',
    image: 'https://pag.qq.com/img/weizhong.webp',
    infoLink: 'https://www.webank.com/#/home',
  },
  {
    caption: 'JD Content Assistant',
    image: 'https://pag.qq.com/img/jingdonglife.webp',
    infoLink: 'https://dr.jd.com/',
  },
  {
    caption: 'Huya',
    image: 'https://pag.qq.com/img/huya.webp',
    infoLink: 'https://www.huya.com/',
  },
  {
    caption: 'WeSing',
    image: 'https://pag.qq.com/img/kg.png',
    infoLink: 'https://kg.qq.com/index-pc.html',
  },
  {
    caption: 'TongCheng',
    image: 'https://pag.qq.com/img/tongcheng.webp',
    infoLink: 'https://www.ly.com/',
  },
  {
    caption: 'Thunder Live Streaming',
    image: 'https://pag.qq.com/img/xunleizhibo.webp',
    infoLink: 'https://live.xunlei.com/',
  },
  {
    caption: 'Tencent Cloud ',
    image: 'https://pag.qq.com/img/tencentcloud.png',
    infoLink: 'https://cloud.tencent.com/',
  },
  {
    caption: 'WeComics TH',
    image: 'https://pag.qq.com/img/dongman.png',
    infoLink: 'https://ac.qq.com',
  },
  {
    caption: 'Tencent Advertising',
    image: 'https://pag.qq.com/img/AMS.png',
    infoLink: 'https://e.qq.com/ads/',
  },
  {
    caption: 'HuYa Mobile Games',
    image: 'https://pag.qq.com/img/huayagames.webp',
    infoLink: 'https://hd.huya.com/h5/download_zs_sy/sy_android.html',
  },
  {
    caption: 'Zhenai',
    image: 'https://pag.qq.com/img/zhenai.webp',
    infoLink: 'https://www.zhenai.com/',
  },
  {
    caption: '58 Daojia',
    image: 'https://pag.qq.com/img/wuba.webp',
    infoLink: 'https://fangxin.58.com/',
  },
  {
    caption: 'NOW',
    image: 'https://pag.qq.com/img/now.png',
    infoLink: 'https://now.qq.com/',
  },
  {
    caption: 'zenvideo',
    image: 'https://pag.qq.com/img/zhiying.jpg',
    infoLink: 'https://zenvideo.qq.com/#/home',
  },
  {
    caption: 'Pitu',
    image: 'https://pag.qq.com/img/pitu.png',
    infoLink: 'https://tu.qq.com/',
  },
  {
    caption: 'QQ Reading',
    image: 'https://pag.qq.com/img/QQReader.png',
    infoLink: 'https://yuedu.reader.qq.com/common/common/down/dist/index.html?actid=11822',
  },
  {
    caption: 'WeSing',
    image: 'https://pag.qq.com/img/wesing.webp',
    infoLink: 'https://play.google.com/store/apps/details?id=com.tencent.wesing&hl=zh&gl=US',
  },
  {
    caption: 'LIZI',
    image: 'https://pag.qq.com/img/lizhi.webp',
    infoLink: 'https://www.lizhi.fm/',
  },
  {
    caption: 'Wesee',
    image: 'https://pag.qq.com/img/weishi.png',
    infoLink: 'https://weishi.qq.com/',
  },
  {
    caption: 'LOL Mobile',
    image: 'https://pag.qq.com/img/yingxionglianmeng.png',
    infoLink: 'https://lolm.qq.com/',
  },
  {
    caption: 'WebNovel',
    image: 'https://pag.qq.com/img/qidian.png',
    infoLink: 'https://www.qidian.com',
  },
  {
    caption: 'NowCoder',
    image: 'https://pag.qq.com/img/niuke.webp',
    infoLink: 'https://m.nowcoder.com/app',
  },
  {
    caption: 'CAMPS OF KINGS',
    image: 'https://pag.qq.com/img/wangzheyingdi.webp',
    infoLink: 'https://sj.qq.com/myapp/detail.htm?apkName=com.tencent.gamehelper.smoba',
  },
  {
    caption: 'TENCENT JOY CLUB',
    image: 'https://pag.qq.com/img/xinyue.webp',
    infoLink: 'https://xinyue.qq.com/beta/#/',
  },
  {
    caption: 'Great Wall Motor',
    image: 'https://pag.qq.com/img/changchengqiche.webp',
    infoLink:
      'https://apps.apple.com/cn/app/%E9%95%BF%E5%9F%8E%E6%B1%BD%E8%BD%A6-%E4%BE%BF%E6%90%BA%E5%BC%8F%E8%AF%8A%E6%96%AD%E5%B7%A5%E5%85%B7/id1460223651',
  },
  {
    caption: 'HongXiu',
    image: 'https://pag.qq.com/img/hongxiu.png',
    infoLink: 'https://www.hongxiu.com/',
  },
  {
    caption: 'China Media Group Mobile',
    image: 'https://pag.qq.com/img/yangvideo.png',
    infoLink: 'https://www.yangshipin.cn/',
  },
  {
    caption: 'Penguin Esports',
    image: 'https://pag.qq.com/img/qiedianjing.jpeg',
  },
  {
    caption: 'FotoPlay',
    image: 'https://pag.qq.com/img/fotoplay.webp',
    infoLink: 'https://fotoplayapp.com/',
  },
  {
    caption: 'Xiaoshuimian',
    image: 'https://pag.qq.com/img/xiaoshuimian.webp',
    infoLink: 'http://psy-1.com/',
  },
  {
    caption: 'Ejian',
    image: 'https://pag.qq.com/img/ejian.webp',
    infoLink: 'https://a.app.qq.com/o/simple.jsp?pkgname=com.tencent.vcut',
  },
  {
    caption: 'Tencent Intoo',
    image: 'https://pag.qq.com/img/yintu.webp',
    infoLink: 'https://intoo.qq.com/',
  },
  {
    caption: 'Pocket Rhythm',
    image: 'https://pag.qq.com/img/koudaijiezou.webp',
    infoLink: 'https://apps.apple.com/cn/app/%E5%8F%A3%E8%A2%8B%E8%8A%82%E5%A5%8F/id1552355503',
  },
  {
    caption: 'JOOX Music',
    image: 'https://pag.qq.com/img/joox.webp',
    infoLink: 'https://play.google.com/store/apps/details?id=com.tencent.ibg.joox&hl=zh&gl=US',
  },
  {
    caption: 'doX',
    image: 'https://pag.qq.com/img/dox.webp',
    infoLink:
      'https://apps.apple.com/cn/app/dox-%E5%8F%82%E4%B8%8E%E6%88%91%E4%BB%AC%E7%9A%84%E7%94%9F%E6%B4%BB/id1583688580',
  },
  {
    caption: 'TRTC',
    image: 'https://pag.qq.com/img/trtc.webp',
    infoLink: 'https://apps.apple.com/us/app/trtc/id1400663224',
  },
  {
    caption: 'Dingchao',
    image: 'https://pag.qq.com/img/dingchao.webp',
  },
  {
    caption: 'Hua Meng Novels',
    image: 'https://pag.qq.com/img/huameng.png',
    infoLink: 'https://huameng.qidian.com/',
  },
  {
    caption: 'Q Music Baby',
    image: 'https://pag.qq.com/img/qyingbaby.png',
  },
  {
    caption: 'Huanyu',
    image: 'https://pag.qq.com/img/huanyu.png',
  },
  {
    caption: 'Maohu',
    image: 'https://pag.qq.com/img/catcall.png',
  },
  {
    caption: 'Guess the Song Planet',
    image: 'https://pag.qq.com/img/caige.png',
  },
  {
    caption: 'Q Music Discover',
    image: 'https://pag.qq.com/img/tangge.png',
  },
  {
    caption: 'Album Keeper',
    image: 'https://pag.qq.com/img/xianchemanager.png',
  },
  {
    caption: 'Light Chat',
    image: 'https://pag.qq.com/img/qingliao.png',
  },
  {
    caption: 'Wave Planet',
    image: 'https://pag.qq.com/img/bodongxingqiu.png',
  },
];

module.exports = { users };

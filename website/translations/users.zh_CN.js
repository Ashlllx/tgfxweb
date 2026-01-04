const users = [
  {
    caption: '微信',
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
    caption: '王者荣耀',
    image: 'https://pag.qq.com/img/wangzhe.png',
    infoLink: 'https://pvp.qq.com',
    pinned: true,
  },
  {
    caption: '腾讯视频',
    image: 'https://pag.qq.com/img/tencentvideo.png',
    infoLink: 'https://v.qq.com',
    pinned: true,
  },
  {
    caption: 'QQ音乐',
    image: 'https://pag.qq.com/img/qqmusic.png',
    infoLink: 'https://y.qq.com/',
    pinned: true,
  },
  {
    caption: 'QQ空间',
    image: 'https://pag.qq.com/img/qzone.png',
    infoLink: 'https://qzone.qq.com/',
    pinned: true,
  },
  {
    caption: '京东金融',
    image: 'https://pag.qq.com/img/jingdongfinance.webp',
    infoLink: 'https://jr.jd.com/',
    pinned: true,
  },
  {
    caption: '腾讯新闻',
    image: 'https://pag.qq.com/img/tencentnews.webp',
    infoLink: 'https://news.qq.com/',
    pinned: true,
  },
  {
    caption: '和平精英',
    image: 'https://pag.qq.com/img/hepingjingying.webp',
    infoLink: 'https://gp.qq.com/',
    pinned: true,
  },
  {
    caption: '小红书',
    image: 'https://pag.qq.com/img/xiaohongshu.webp',
    infoLink: 'https://www.xiaohongshu.com/',
    pinned: true,
  },
  {
    caption: '知乎',
    image: 'https://pag.qq.com/img/zhihu.webp',
    infoLink: 'https://www.zhihu.com/explore',
    pinned: true,
  },
  {
    caption: 'MOMO陌陌',
    image: 'https://pag.qq.com/img/momo.webp',
    infoLink: 'https://www.immomo.com/',
    pinned: true,
  },
  {
    caption: '腾讯体育',
    image: 'https://pag.qq.com/img/tengxuntiyu.webp',
    infoLink: 'https://v.qq.com/x/live/sport.html',
  },
  {
    caption: '腾讯地图',
    image: 'https://pag.qq.com/img/tencentmap.webp',
    infoLink: 'https://map.qq.com/mobile/',
  },
  {
    caption: '腾讯会议',
    image: 'https://pag.qq.com/img/tencentmeeting.webp',
    infoLink: 'https://meeting.tencent.com/',
  },
  {
    caption: '豆瓣',
    image: 'https://pag.qq.com/img/douban.webp',
    infoLink: 'https://www.douban.com/',
  },
  {
    caption: '哔哩哔哩',
    image: 'https://pag.qq.com/img/bilibili.webp',
    infoLink: 'https://www.bilibili.com/',
  },
  {
    caption: '虎嗅',
    image: 'https://pag.qq.com/img/huxiu.webp',
    infoLink: 'https://www.huxiu.com/',
  },
  {
    caption: '微众银行',
    image: 'https://pag.qq.com/img/weizhong.webp',
    infoLink: 'https://www.webank.com/#/home',
  },
  {
    caption: '京东内容助手',
    image: 'https://pag.qq.com/img/jingdonglife.webp',
    infoLink: 'https://dr.jd.com/',
  },
  {
    caption: '虎牙直播',
    image: 'https://pag.qq.com/img/huya.webp',
    infoLink: 'https://www.huya.com/',
  },
  {
    caption: '全民K歌',
    image: 'https://pag.qq.com/img/kg.png',
    infoLink: 'https://kg.qq.com/index-pc.html',
  },
  {
    caption: '同程旅行',
    image: 'https://pag.qq.com/img/tongcheng.webp',
    infoLink: 'https://www.ly.com/',
  },
  {
    caption: '迅雷直播',
    image: 'https://pag.qq.com/img/xunleizhibo.webp',
    infoLink: 'https://live.xunlei.com/',
  },
  {
    caption: '腾讯云',
    image: 'https://pag.qq.com/img/tencentcloud.png',
    infoLink: 'https://cloud.tencent.com/',
  },
  {
    caption: '腾讯动漫',
    image: 'https://pag.qq.com/img/dongman.png',
    infoLink: 'https://ac.qq.com',
  },
  {
    caption: '腾讯广告',
    image: 'https://pag.qq.com/img/AMS.png',
    infoLink: 'https://e.qq.com/ads/',
  },
  {
    caption: '虎牙手游',
    image: 'https://pag.qq.com/img/huayagames.webp',
    infoLink: 'https://hd.huya.com/h5/download_zs_sy/sy_android.html',
  },
  {
    caption: '珍爱',
    image: 'https://pag.qq.com/img/zhenai.webp',
    infoLink: 'https://www.zhenai.com/',
  },
  {
    caption: '58到家',
    image: 'https://pag.qq.com/img/wuba.webp',
    infoLink: 'https://fangxin.58.com/',
  },
  {
    caption: 'NOW直播',
    image: 'https://pag.qq.com/img/now.png',
    infoLink: 'https://now.qq.com/',
  },
  {
    caption: '智影',
    image: 'https://pag.qq.com/img/zhiying.jpg',
    infoLink: 'https://zenvideo.qq.com/#/home',
  },
  {
    caption: '天天P图',
    image: 'https://pag.qq.com/img/pitu.png',
    infoLink: 'https://tu.qq.com/',
  },
  {
    caption: 'QQ阅读',
    image: 'https://pag.qq.com/img/QQReader.png',
    infoLink: 'https://yuedu.reader.qq.com/common/common/down/dist/index.html?actid=11822',
  },
  {
    caption: 'WeSing',
    image: 'https://pag.qq.com/img/wesing.webp',
    infoLink: 'https://play.google.com/store/apps/details?id=com.tencent.wesing&hl=zh&gl=US',
  },
  {
    caption: '荔枝',
    image: 'https://pag.qq.com/img/lizhi.webp',
    infoLink: 'https://www.lizhi.fm/',
  },
  {
    caption: '微视',
    image: 'https://pag.qq.com/img/weishi.png',
    infoLink: 'https://weishi.qq.com/',
  },
  {
    caption: '英雄联盟手游',
    image: 'https://pag.qq.com/img/yingxionglianmeng.png',
    infoLink: 'https://lolm.qq.com/',
  },
  {
    caption: '起点',
    image: 'https://pag.qq.com/img/qidian.png',
    infoLink: 'https://www.qidian.com',
  },
  {
    caption: '牛客APP',
    image: 'https://pag.qq.com/img/niuke.webp',
    infoLink: 'https://m.nowcoder.com/app',
  },
  {
    caption: '王者营地',
    image: 'https://pag.qq.com/img/wangzheyingdi.webp',
    infoLink: 'https://sj.qq.com/myapp/detail.htm?apkName=com.tencent.gamehelper.smoba',
  },
  {
    caption: '心悦俱乐部',
    image: 'https://pag.qq.com/img/xinyue.webp',
    infoLink: 'https://xinyue.qq.com/beta/#/',
  },
  {
    caption: '长城汽车',
    image: 'https://pag.qq.com/img/changchengqiche.webp',
    infoLink:
      'https://apps.apple.com/cn/app/%E9%95%BF%E5%9F%8E%E6%B1%BD%E8%BD%A6-%E4%BE%BF%E6%90%BA%E5%BC%8F%E8%AF%8A%E6%96%AD%E5%B7%A5%E5%85%B7/id1460223651',
  },
  {
    caption: '红袖添香',
    image: 'https://pag.qq.com/img/hongxiu.png',
    infoLink: 'https://www.hongxiu.com/',
  },
  {
    caption: '央视频',
    image: 'https://pag.qq.com/img/yangvideo.png',
    infoLink: 'https://www.yangshipin.cn/',
  },
  {
    caption: '企鹅电竞',
    image: 'https://pag.qq.com/img/qiedianjing.jpeg',
  },
  {
    caption: 'FotoPlay',
    image: 'https://pag.qq.com/img/fotoplay.webp',
    infoLink: 'https://fotoplayapp.com/',
  },
  {
    caption: '小睡眠',
    image: 'https://pag.qq.com/img/xiaoshuimian.webp',
    infoLink: 'http://psy-1.com/',
  },
  {
    caption: '鹅剪',
    image: 'https://pag.qq.com/img/ejian.webp',
    infoLink: 'https://a.app.qq.com/o/simple.jsp?pkgname=com.tencent.vcut',
  },
  {
    caption: '腾讯音兔',
    image: 'https://pag.qq.com/img/yintu.webp',
    infoLink: 'https://intoo.qq.com/',
  },
  {
    caption: '口袋节奏',
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
    caption: '盯潮',
    image: 'https://pag.qq.com/img/dingchao.webp',
  },
  {
    caption: '话萌小说',
    image: 'https://pag.qq.com/img/huameng.png',
    infoLink: 'https://huameng.qidian.com/',
  },
  {
    caption: 'Q音宝贝',
    image: 'https://pag.qq.com/img/qyingbaby.png',
  },
  {
    caption: '欢遇',
    image: 'https://pag.qq.com/img/huanyu.png',
  },
  {
    caption: '猫呼',
    image: 'https://pag.qq.com/img/catcall.png',
  },
  {
    caption: '猜歌星球',
    image: 'https://pag.qq.com/img/caige.png',
  },
  {
    caption: 'Q音探歌',
    image: 'https://pag.qq.com/img/tangge.png',
  },
  {
    caption: '相册管家',
    image: 'https://pag.qq.com/img/xianchemanager.png',
  },
  {
    caption: '轻聊',
    image: 'https://pag.qq.com/img/qingliao.png',
  },
  {
    caption: '波动星球',
    image: 'https://pag.qq.com/img/bodongxingqiu.png',
  },
];

module.exports = { users };

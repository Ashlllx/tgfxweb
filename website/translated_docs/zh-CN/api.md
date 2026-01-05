---
id: api
title: API 参考
---

  <div class="titleContainer pc">
    <div class="titleContainerTitle">
        <div class="titleContainerTitleText">API 参考</div>
    </div>
  </div>

  <div class="titleContainer mobile">
    <div class="titleContainerTitle">
      <div class="titleContainerTitleText">API 参考</div>
    </div>
    <div class="titleContainerTitleContent">
        TGFX API 参考文档正在编写中，敬请期待！
    </div>
  </div>
  
  <div class="designWrapper">
    <div class="wrapperTitle">
      <img src="/img/tgfximg/develop.png" />
      <div class="wrapperTitleText">计划内容</div>
    </div>
    <div class="designContainer">
      <div class="firstItem">
        <div class="linkItem">
          <div class="linkItemTitle">核心 API</div>
          <a href="#">Surface 管理</a><br />
          <a href="#">Canvas 绘制</a><br />
          <a href="#">图像处理</a><br />
          <a href="#">文本渲染</a><br />
        </div>
        <div class="linkItem">
          <div class="linkItemTitle">图形 API</div>
          <a href="#">Path 路径</a><br />
          <a href="#">Paint 画笔</a><br />
          <a href="#">Shader 着色器</a><br />
          <a href="#">Filter 滤镜</a><br />
        </div>
        <div class="linkItem">
          <div class="linkItemTitle">资源管理</div>
          <a href="#">Image 图像</a><br />
          <a href="#">Typeface 字体</a><br />
          <a href="#">Bitmap 位图</a><br />
          <a href="#">Data 数据</a><br />
        </div>
      </div>
    </div>
  </div>
  <div class="designWrapper developerWrapper">
    <div class="wrapperTitle">
      <img src="/img/tgfximg/design.png" />
      <div class="wrapperTitleText">临时资源</div>
    </div>
    <div class="developerContainer designContainer">
      <div class="firstItem">
        <div class="linkItem">
          <div class="linkItemTitle">在完整文档发布前</div>
          <a href="https://github.com/Tencent/tgfx">GitHub 仓库</a><br />
          <a href="https://github.com/Tencent/tgfx/tree/main/include">头文件目录</a><br />
        </div>
        <div class="linkItem">
          <div class="linkItemTitle">联系我们</div>
          <a href="https://github.com/Tencent/tgfx/issues">GitHub Issues</a><br />
          <a href="https://github.com/Tencent/tgfx/discussions">GitHub Discussions</a><br />
        </div>
      </div>
    </div>
  </div>

<script>
    var element = document.getElementById("__docusaurus");
    if (element) {
      element.style.display = "none";
    }
    let items = document.querySelectorAll(".item");
    for (let i = 0; i < items.length; i++) {
      items[i].style.border = "none";
    }
    var navPusher = document.querySelector('.navPusher');
    if (navPusher) {
        navPusher.classList.add('homePageNavPusher');
    }
</script>

---
id: home
title: TGFX 简介
---

  <div class="titleContainer pc">
    <div class="titleContainerTitle">
        <div class="titleContainerTitleText">TGFX 简介</div>
    </div>
  </div>

  <div class="titleContainer mobile">
    <div class="titleContainerTitle">
      <div class="titleContainerTitleText">TGFX 简介</div>
    </div>
    <div class="titleContainerTitleContent">
        TGFX 是一款轻量级的 2D 图形库，专为渲染文本、几何图形和图像而设计。它提供了一套跨平台 API，可以在 iOS、Android、macOS、Windows、Linux 和 Web 平台上使用。文档内容正在准备中，敬请期待。
    </div>
  </div>
  
  <div class="designWrapper">
    <div class="wrapperTitle">
      <img src="/img/tgfximg/develop.png" />
      <div class="wrapperTitleText">文档中心</div>
    </div>
    <div class="designContainer">
      <div class="firstItem">
        <div class="linkItem">
          <div class="linkItemTitle">内容正在准备中</div>
          <a href="#">快速开始指南</a><br />
          <a href="#">核心概念详解</a><br />
          <a href="#">完整接口参考</a><br />
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
          <div class="linkItemTitle">官方资源</div>
          <a href="https://github.com/Tencent/tgfx">GitHub 仓库</a><br />
          <a href="https://github.com/Tencent/tgfx/discussions">论坛交流</a><br />
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

---
id: home
title: Introduction
---

  <div class="titleContainer pc">
    <div class="titleContainerTitle">
        <div class="titleContainerTitleText">Introduction</div>
    </div>
  </div>

  <div class="titleContainer mobile">
    <div class="titleContainerTitle">
      <div class="titleContainerTitleText">Introduction</div>
    </div>
    <div class="titleContainerTitleContent">
        TGFX is a lightweight 2D graphics library designed for rendering text, geometry, and images. It provides a cross-platform API that works on iOS, Android, macOS, Windows, Linux, and Web platforms. Documentation content is currently being prepared, please stay tuned.
    </div>
  </div>
  
  <div class="designWrapper">
    <div class="wrapperTitle">
      <img src="/img/docs/home/develop.png" />
      <div class="wrapperTitleText">Documentation Center</div>
    </div>
    <div class="designContainer">
      <div class="firstItem">
        <div class="linkItem">
          <div class="linkItemTitle">Content in Preparation</div>
          <a href="#">Quick Start Guide</a><br />
          <a href="#">Core Concepts</a><br />
          <a href="#">Complete API Reference</a><br />
        </div>
      </div>
    </div>
  </div>
  <div class="designWrapper developerWrapper">
    <div class="wrapperTitle">
      <img src="/img/docs/home/design.png" />
      <div class="wrapperTitleText">Temporary Resources</div>
    </div>
    <div class="developerContainer designContainer">
      <div class="firstItem">
        <div class="linkItem">
          <div class="linkItemTitle">Official Resources</div>
          <a href="https://github.com/Tencent/tgfx">GitHub Repository</a><br />
          <a href="https://github.com/Tencent/tgfx/discussions">Forum Discussion</a><br />
        </div>
        <div class="linkItem">
          <div class="linkItemTitle">Contact Us</div>
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

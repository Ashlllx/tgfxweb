---
id: api
title: API Reference
---

  <div class="titleContainer pc">
    <div class="titleContainerTitle">
        <div class="titleContainerTitleText">API Reference</div>
    </div>
  </div>

  <div class="titleContainer mobile">
    <div class="titleContainerTitle">
      <div class="titleContainerTitleText">API Reference</div>
    </div>
    <div class="titleContainerTitleContent">
        The TGFX API reference documentation is currently being prepared. Stay tuned!
    </div>
  </div>
  
  <div class="designWrapper">
    <div class="wrapperTitle">
      <img src="/img/docs/home/develop.png" />
      <div class="wrapperTitleText">Planned Content</div>
    </div>
    <div class="designContainer">
      <div class="firstItem">
        <div class="linkItem">
          <div class="linkItemTitle">Core API</div>
          <a href="#">Surface Management</a><br />
          <a href="#">Canvas Drawing</a><br />
          <a href="#">Image Processing</a><br />
          <a href="#">Text Rendering</a><br />
        </div>
        <div class="linkItem">
          <div class="linkItemTitle">Graphics API</div>
          <a href="#">Path</a><br />
          <a href="#">Paint</a><br />
          <a href="#">Shader</a><br />
          <a href="#">Filter</a><br />
        </div>
        <div class="linkItem">
          <div class="linkItemTitle">Resource Management</div>
          <a href="#">Image</a><br />
          <a href="#">Typeface</a><br />
          <a href="#">Bitmap</a><br />
          <a href="#">Data</a><br />
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
          <div class="linkItemTitle">Before Complete Documentation</div>
          <a href="https://github.com/Tencent/tgfx">GitHub Repository</a><br />
          <a href="https://github.com/Tencent/tgfx/tree/main/include">Header Files Directory</a><br />
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

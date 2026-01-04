# TGFX 官网

本网站基于 [Docusaurus 1.x](https://docusaurus.io/) 构建。

## 🚀 5分钟快速开始

### 环境要求
- **Node.js**: >= 12.0.0
- **npm** 或 **yarn**: 最新版本

### 安装与运行步骤

1. **进入网站目录**
   打开终端，切换到 `website` 文件夹：
   ```bash
   cd website
   ```

2. **安装依赖**
   使用 npm：
   ```bash
   npm install
   ```
   使用 yarn：
   ```bash
   yarn install
   ```

3. **启动开发服务器**
   使用 npm：
   ```bash
   npm start
   ```
   使用 yarn：
   ```bash
   yarn start
   ```

4. **访问网站**
   开发服务器启动后，可以通过以下 URL 访问不同语言版本：
   - **中文版**: [http://localhost:3000/zh-CN/](http://localhost:3000/zh-CN/)
   - **英文版**: [http://localhost:3000/en/](http://localhost:3000/en/)

   ⚠️ **重要提示**: 在开发过程中，请务必带上语言前缀访问，以确保路由和多语言逻辑正常工作。

## 📁 目录结构

```
tgfxweb/
  docs/                  # 文档源文件 (Markdown)
  website/
    pages/
      en/                # 英文页面组件
      zh-CN/             # 中文页面组件
    static/
      css/               # 样式表 (tgfx.css, pc.css 等)
      img/               # 图片和资源文件
      javascript/        # 脚本文件 (tgfx.js 等)
    package.json         # 项目依赖和脚本配置
    siteConfig.js        # 网站核心配置文件
    README.md            # 英文开发指南
    README-zh-CN.md      # 中文开发指南
```

## 📝 内容编辑

### 编辑文档
进入 `docs/` 目录，修改对应的 Markdown 文件即可。

### 编辑页面
页面采用 React 组件构建，分别位于 `website/pages/en/` 和 `website/pages/zh-CN/` 目录下。

## 🌐 多语言支持工作原理
本站使用 URL 路径前缀（`/en/` 和 `/zh-CN/`）来区分语言版本。导航栏中的语言切换按钮负责在这些路径之间进行跳转。

## 🏗 生成生产版本
如果需要构建用于部署的静态文件：
```bash
cd website
npm run build # 或使用 yarn build
```
构建结果将输出到 `website/build/` 目录。

## 📖 完整文档
关于 Docusaurus 的更多高级用法，请参阅[官方文档](https://docusaurus.io/)。

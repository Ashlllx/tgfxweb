# TGFX Website

This website was created with [Docusaurus 1.x](https://docusaurus.io/).

## 🚀 Get Started in 5 Minutes

### Prerequisites
- **Node.js**: >= 12.0.0
- **npm** or **yarn**: latest version

### Installation and Running

1. **Navigate to the website directory**
   ```bash
   cd website
   ```

2. **Install dependencies**
   Using npm:
   ```bash
   npm install
   ```
   Using yarn:
   ```bash
   yarn install
   ```

3. **Start the development server**
   Using npm:
   ```bash
   npm start
   ```
   Using yarn:
   ```bash
   yarn start
   ```

4. **Access the website**
   Once the server starts, you can access the site at the following URLs:
   - **English Version**: [http://localhost:3000/en/](http://localhost:3000/en/)
   - **Chinese Version**: [http://localhost:3000/zh-CN/](http://localhost:3000/zh-CN/)

   ⚠️ **Note**: Please use the language prefixes to access the site during development to ensure proper routing.

## 📁 Directory Structure

```
tgfxweb/
  docs/                  # Documentation source files (Markdown)
  website/
    pages/
      en/                # English page components
      zh-CN/             # Chinese page components
    static/
      css/               # Stylesheets (tgfx.css, pc.css, etc.)
      img/               # Images and assets
      javascript/        # Scripts (tgfx.js, etc.)
    package.json         # Build scripts and dependencies
    siteConfig.js        # Website configuration
    README.md            # English guide
    README-zh-CN.md      # Chinese guide
```

## 📝 Editing Content

### Editing Docs
Navigate to the `docs/` folder and edit the corresponding Markdown files.

### Editing Pages
React components for pages are located in `website/pages/en/` and `website/pages/zh-CN/`.

## 🌐 Multi-language Support
The site uses URL prefixes (`/en/` and `/zh-CN/`) to switch between languages. The language switcher in the header handles the redirection between these paths.

## 🏗 Build for Production
To generate a production build:
```bash
cd website
npm run build # or yarn build
```
The output will be in the `website/build/` directory.

## 📖 Full Documentation
Full documentation for Docusaurus can be found on their [official website](https://docusaurus.io/).

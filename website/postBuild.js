const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const glob = require('glob');
const siteConfig = require('./siteConfig');

const htmlFiles = glob.sync(path.join(__dirname, `build/${siteConfig.projectName}/zh-CN/*.html`));

htmlFiles.forEach((file) => {
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace('<html lang="en">', '<html lang="zh-CN">');
  fs.writeFileSync(file, html);
});

const sourceDir = path.join(__dirname, `build/${siteConfig.projectName}/docs/zh-CN/`);
const targetDir = path.join(__dirname, `build/${siteConfig.projectName}/docs/`);

fsExtra.copySync(sourceDir, targetDir, { overwrite: true });


const sourceDir2 = path.join(__dirname, `build/${siteConfig.projectName}/zh-CN/`);
const targetDir2 = path.join(__dirname, `build/${siteConfig.projectName}/`);

fsExtra.copySync(sourceDir2, targetDir2, { overwrite: true });
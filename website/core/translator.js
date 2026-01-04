const featureConfigZH = require(`${process.cwd()}/translations/featureConfig.zh_CN.js`);
const featureConfigEN = require(`${process.cwd()}/translations/featureConfig.en.js`);
const comparisonConfigZH = require(`${process.cwd()}/translations/comparisonConfig.zh_CN.js`);
const comparisonConfigEN = require(`${process.cwd()}/translations/comparisonConfig.en.js`);
const translationsZH = require(`${process.cwd()}/translations/pages.zh_CN.json`);
const translationsEN = require(`${process.cwd()}/translations/pages.en.json`);
const usersZH = require(`${process.cwd()}/translations/users.zh_CN.js`);
const usersEN = require(`${process.cwd()}/translations/users.en.js`);

class Translator {
  constructor() {
    this.language = 'en';
    this.translations = null;
    this.comparisonConfig = null;
    this.featureConfig = null;
  }

  initialize = (language) => {
    this.language = language;
    this.comparisonConfig = language === 'zh-CN' ? comparisonConfigZH : comparisonConfigEN;
    this.featureConfig = language === 'zh-CN' ? featureConfigZH : featureConfigEN;
    this.translations = language === 'zh-CN' ? translationsZH : translationsEN;
    this.users = language === 'zh-CN' ? usersZH.users : usersEN.users;
  };

  t = (key) => {
    const keys = key.split('.');
    let current = this.translations;
    for (let i = 0; i < keys.length; i++) {
      current = current[keys[i]];
    }
    return current;
  };
}

module.exports = new Translator();
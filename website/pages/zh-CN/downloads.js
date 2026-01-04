const React = require('react');
const translator = require(`${process.cwd()}/core/translator.js`);
const sdkData = require(`${process.cwd()}/sdkData.json`);

translator.initialize('en');
const t = translator.t;

class SDKList extends React.Component {
  render() {
    const { sdkData } = this.props;

    return (
      <div class="sdk_list">
        <h2>
          <span class={`pid_ico ${sdkData.icon}`}></span>
          {sdkData.title}
        </h2>
        <ul class="list cl">
          {sdkData.items.map((item, index) => (
            <li key={index} class="sdk_info animated">
              <div class="sdk_info_content">
                <h3>
                  <span class="sdk_title">{item.title}</span>
                  <p class="sdk_item">版本: {item.version}</p>
                  <p class="sdk_item">更新时间：{item.updateDate}</p>
                  <p class="sdk_item">SDK介绍：{item.description}</p>
                </h3>
                <p class="sdk_item">更新日志：</p>
                <ol class="sdk_item">
                  {item.updateLog.map((log, i) => (
                    <li key={i}>{log}</li>
                  ))}
                </ol>

                <p class="sdk_item">服务提供方：{item.serviceProvider}</p>
                <div class="sdk_history">
                  {item.links.map((link, i) => (
                    <p key={i} class="sdk_item">
                      <a target="_blank" href={link.url}>
                        {link.text}
                      </a>
                    </p>
                  ))}
                </div>
              </div>
              <div class="download_btn">
                <a href={item.downloadUrl} class="animated">
                  <span class="download_ico animated"></span>下载
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

class Downloads extends React.Component {
  render() {
    return (
      <div class="downloads-container">
        <div class="downloads-container-content">
          <div class="sdk_content cl">
            {sdkData.map((data, index) => (
              <SDKList key={index} sdkData={data} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}


module.exports = Downloads;

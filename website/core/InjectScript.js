const React = require('react');

class InjectScript extends React.Component {
  render() {
    return (
      <script
        type="module"
        async
        dangerouslySetInnerHTML={{
          __html: `
              var csBtn = document.getElementById('js_cs');
              var popup = document.getElementById('js_cs_popup');
              csBtn.onclick = function(){
                var display = popup.style.display;
                popup.style.display = (!display || display == 'none')  ? 'block' : 'none'
              }
              `,
        }}
      />
    );
  }
}

module.exports = InjectScript;

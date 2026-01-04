const { uglify } = require('rollup-plugin-uglify');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  input: './core/page/index.js',
  output: {
    dir: './static/javascript/',
    format: 'es',
    entryFileNames: 'page.js',
    sourcemap: isDev,
  },
  plugins: [
    ...(isDev
      ? []
      : [
          uglify({
            sourcemap: isDev, // Enable source maps for the UglifyJS plugin only for 'dev' mode
          }),
        ]),
  ],
};
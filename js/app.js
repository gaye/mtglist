require.config({
  baseUrl: './build',
  paths: {
    babel: '../node_modules/babel',
    lodash: '../node_modules/lodash/index',
    react: '../node_modules/react/dist/react',
    router: '../node_modules/simplerouter/router'
  }
});

require([
  'babel/browser-polyfill',
  'main'
], (polyfill, main) => main());

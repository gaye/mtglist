(() => {
'use strict';

require.config({
  baseUrl: '/build',
  paths: {
    lodash: '/node_modules/lodash/index',
    react: '/node_modules/react/dist/react.min',
    router: '/node_modules/simplerouter/router'
  }
});

require([
  'react',
  'router'
], (React, Router) => {

let anchor = document.getElementsByClassName('anchor')[0];
let router = new Router({ anchorElement: anchor });

router.route = state => {
  // TODO
  return 'editor';
};

router.initView = (viewName, options) => {
  return new Promise((accept, reject) => {
    require(['view/' + viewName], viewClass => {
      let element = document.createElement('div');
      let reactElement = React.createElement(viewClass, options);
      React.render(reactElement, element);
      accept(element);
    }, reject);
  });
};

return router.start()
.then(() => {
  // TODO
});

});

})();

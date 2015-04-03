import React from 'react';
import Router from 'router';

export default async function main() {
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

  await router.start();
}

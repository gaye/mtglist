{
  baseUrl: 'build/',
  name: 'main',
  normalizeDirDefines: 'all',
  out: 'build/main.js',

  include: [
    'lodash',
    'mtgdb',
    'react',
    'router',
    'xhr',
    'view/card',
    'view/cardpool',
    'view/deck',
    'view/editor',
    'view/input_text',
    'view/text_area'
  ],

  paths: {
    babel: '../node_modules/babel',
    lodash: '../node_modules/lodash/index',
    react: '../node_modules/react/dist/react',
    router: '../node_modules/simplerouter/router'
  }
}

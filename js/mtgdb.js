define((require, exports) => {
'use strict';

let _ = require('lodash');
let Xhr = require('./xhr');

const BASE_URL = 'http://api.mtgdb.info';

exports.imageUrl = id => {
  return BASE_URL + '/content/card_images/' + id + '.jpeg';
};

exports.search = text => {
  console.log('Will search for card', text);
  let url = BASE_URL + '/search/' + text;
  let xhr = new Xhr();
  xhr.open('GET', url, true /* async */);
  return xhr.send().then(json => {
    let res = JSON.parse(json);
    let nameToCards = _.groupBy(res, 'name');
    _.forEach(nameToCards, (cards, name) => {
      nameToCards[name] = _.sortBy(cards, 'id')[0];
    });

    return _.values(nameToCards);
  });
};

});

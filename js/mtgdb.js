import * as _ from 'lodash';
import Xhr from './xhr';

const BASE_URL = 'http://api.mtgdb.info';

export async function getCard(id) {
  let url = BASE_URL + '/cards/' + id;
  let xhr = new Xhr();
  xhr.open('GET', url, true /* async */);
  let json = await xhr.send();
  return JSON.parse(json);
}

export function imageUrl(id) {
  return BASE_URL + '/content/card_images/' + id + '.jpeg';
}

export async function search(text) {
  let url = BASE_URL + '/search/' + text;
  let xhr = new Xhr();
  xhr.open('GET', url, true /* async */);
  let json = await xhr.send();
  let res = JSON.parse(json);
  let nameToCards = _.groupBy(res, 'name');
  _.forEach(nameToCards, (cards, name) => {
    nameToCards[name] = _.sortBy(cards, 'id')[0];
  });

  return _.values(nameToCards);
}

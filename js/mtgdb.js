import * as _ from 'lodash';
import Xhr from 'xhr';

const BASE_URL = 'http://api.mtgdb.info';

export async function getCard(id) {
  return await getJSON(`${BASE_URL}/cards/${id}`);
}

export function imageUrl(id) {
  return `${BASE_URL}/content/card_images/${id}.jpeg`;
}

export async function search(text) {
  let result = await getJSON(`${BASE_URL}/search/${text}`);
  let nameToCards = _.groupBy(result, 'name');
  return _.map(nameToCards, cards => _.sortBy(cards, 'id')[0]);
}

async function getJSON(url) {
  let xhr = new Xhr();
  xhr.open('GET', url, true /* async */);
  let json = await xhr.send();
  return JSON.parse(json);
}

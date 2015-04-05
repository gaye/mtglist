import * as _ from 'lodash';

/**
 * @param {Object} collection looks something like
 *
 *     {
 *       main: {
 *         id_1: {
 *           card: {},  // mtgdb card
 *           count: 3
 *         }
 *       },
 *       side: {
 *       }
 *     }
 */
export function encode(deck) {
  let result = '';
  let main = deck.main;
  let side = deck.side;
  _.forEach(main, item => {
    let card = item.card;
    let count = item.count;
    result += `${count} ${card.name}\n`;
  });

  _.forEach(side, item => {
    let card = item.card;
    let count = item.count;
    result += `SB: ${count} ${card.name}\n`;
  });

  result += '\n';

  return result;
}

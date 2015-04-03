define(require => {
'use strict';

var assert = require('chai').assert;
var mtgdb = require('mtgdb');

suite('mtgdb', function() {
  test('#getCard', function() {
    mtgdb.getCard(227676).then(card => {
      assert.equal(card.id, 227676);
      assert.equal(card.name, 'Snapcaster Mage');
    });
  });

  test('#search', function() {
    return mtgdb.search('Snapcaster Mage').then(res => {
      assert.lengthOf(res, 1);
      var card = res[0];
      assert.equal(card.id, 227676);
      assert.equal(card.name, 'Snapcaster Mage');
    });
  });
});

});

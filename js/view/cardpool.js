define((require, exports, module) => {
'use strict';

let _ = require('lodash');
let Card = require('./card');
let React = require('react');
let mtgdb = require('../mtgdb');

module.exports = React.createClass({
  getInitialState: function() {
    return { cards: [] };
  },

  componentWillReceiveProps: function(props) {
    let search = props.search;
    if (!search || search.length < 3) {
      return;
    }

    this._search(search);
  },

  render: function() {
    return (
      <div className="cardpool">
        {this.state.cards.map(card => <Card info={card} />)}
      </div>
    );
  },

  _search: _.debounce(function(name) {
    return mtgdb.search(name).then(res => this.setState({ cards: res }));
  }, 500)
});

});

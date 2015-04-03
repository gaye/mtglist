import * as _ from 'lodash';
import React from 'react';
import Card from './card';
import * as mtgdb from '../mtgdb';

export default React.createClass({
  getInitialState: function() {
    return { cards: [] };
  },

  componentWillReceiveProps: function(props) {
    let search = props.search;
    if (!search || search === this.props.search || search.length < 3) {
      return;
    }

    this._search(search);
  },

  render: function() {
    let cards = this.state.cards;
    return (
      <div className="cardpool">
        {cards.map(card => {
          return (
            <Card info={card}
                  increment={this.props.increment.bind(null, card)}
                  decrement={this.props.decrement.bind(null, card)} />
          );
        })}
      </div>
    );
  },

  _search: _.debounce(async function(name) {
    let res = await mtgdb.search(name);
    this.setState({ cards: res });
  }, 500)
});

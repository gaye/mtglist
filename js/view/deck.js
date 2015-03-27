define((require, exports, module) => {
'use strict';

let Card = require('./card');
let React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="cardpool">
        {this.state.cards.map(card => <Card info={card} />)}
      </div>
    );
  }
});

});

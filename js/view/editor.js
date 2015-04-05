import * as _ from 'lodash';
import Cardpool from './cardpool';
import Deck from './deck';
import InputText from './input_text';
import LabelCount from './label_count';
import React from 'react';
import TextArea from './text_area';
import * as dec from 'dec';

export default React.createClass({
  getInitialState: function() {
    return {
      deck: {
        metadata: { name: 'Untitled', format: 'Standard', notes: '' },
        main: {},
        side: {}
      },

      search: { card: '' }
    };
  },

  render: function() {
    let deck = this.state.deck;
    let metadata = deck.metadata;
    let search = this.state.search;
    return (
      <div className="editor">
        <Cardpool search={search.card}
                  increment={this._increment}
                  decrement={this._decrement} />
        <Deck main={deck.main}
              side={deck.side}
              increment={this._increment}
              decrement={this._decrement} />
        <div className="metadata">
          <form>
            <InputText inputId="nameInput"
                       inputLabel="Name"
                       value={metadata.name}
                       handleChange={this._onNameChange} />
            <InputText inputId="formatInput"
                       inputLabel="Format"
                       value={metadata.format}
                       handleChange={this._onFormatChange} />
            <TextArea textAreaId="notesInput"
                      textAreaLabel="Notes"
                      value={metadata.notes}
                      handleChange={this._onNotesChange} />
            <InputText inputId="cardInput"
                       inputLabel="Card Name"
                       handleChange={this._onCardChange} />
          </form>

          <div className="card-count-container">
            <LabelCount name="main"
                        count={this._mainCount()}
                        success={this._mainCount() >= 60} />
            <LabelCount name="side"
                        count={this._sideCount()}
                        success={this._sideCount() <= 15} />
          </div>

          <div className="actions-container">
            <a href={this._downloadUrl()} download={metadata.name + '.dec'}>
              <span className="glyphicon glyphicon-cloud-download" />
            </a>
          </div>
        </div>
      </div>
    );
  },

  _onNameChange: function(event) {
    let deck = this.state.deck;
    deck.metadata.name = event.target.value;
    this.setState({ deck: deck });
  },

  _onFormatChange: function(event) {
    let deck = this.state.deck;
    deck.metadata.format = event.target.value;
    this.setState({ deck: deck });
  },

  _onNotesChange: function(event) {
    let deck = this.state.deck;
    deck.metadata.notes = event.target.value;
    this.setState({ deck: deck });
  },

  _onCardChange: function(event) {
    let search = this.state.search;
    search.card = event.target.value;
    this.setState({ search: search });
  },

  _increment: function(card) {
    let id = card.id;
    let deck = this.state.deck;
    if (id in deck.main) {
      deck.main[id].count += 1;
    } else {
      deck.main[id] = { card: card, count: 1 };
    }

    this.setState({ deck: deck });
  },

  _decrement: function(card) {
    let id = card.id;
    let deck = this.state.deck;
    if (id in deck.main) {
      deck.main[id].count -= 1;
      if (deck.main[id].count <= 0) {
        delete deck.main[id];
      }

      this.setState({ deck: deck });
    }
  },

  _mainCount: function() {
    return cardCount(this.state.deck.main);
  },

  _sideCount: function() {
    return cardCount(this.state.deck.side);
  },

  _downloadUrl: function() {
    let deck = this.state.deck;
    let contents = dec.encode(deck);
    let blob = new Blob([contents], { type: 'text/plain' });
    return URL.createObjectURL(blob);
  }
});

function cardCount(collection) {
  if (_.isEmpty(collection)) {
    return 0;
  }

  return _.map(collection, value => value.count)
          .reduce((a, b) => a + b);
}

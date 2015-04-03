import React from 'react';
import Cardpool from './cardpool';
import Deck from './deck';
import InputText from './input_text';
import TextArea from './text_area';

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
        <div className="sidebar">
          <div className="metadata">
            <form>
              <InputText inputId="nameInput"
                         inputLabel="Name"
                         value={deck.name}
                         handleChange={this._onNameChange} />
              <InputText inputId="formatInput"
                         inputLabel="Format"
                         value={deck.format}
                         handleChange={this._onFormatChange} />
              <TextArea textAreaId="notesInput"
                        textAreaLabel="Notes"
                        value={deck.notes}
                        handleChange={this._onNotesChange} />
              <InputText inputId="cardInput"
                         inputLabel="Card Name"
                         handleChange={this._onCardChange} />
            </form>
          </div>
        </div>
      </div>
    );
  },

  _onNameChange: function(event) {
    let deck = this.state.deck;
    deck.name = event.target.value;
    this.setState({ deck: deck });
  },

  _onFormatChange: function(event) {
    let deck = this.state.deck;
    deck.format = event.target.value;
    this.setState({ deck: deck });
  },

  _onNotesChange: function(event) {
    let deck = this.state.deck;
    deck.notes = event.target.value;
    this.setState({ deck: deck });
  },

  _onCardChange: function(event) {
    let search = this.state.search;
    search.card = event.target.value;
    this.setState({ search: search });
  },

  _increment: function(card) {
    let id = card.id;
    let main = this.state.deck.main;
    if (id in main) {
      main[id].count += 1;
    } else {
      main[id] = { card: card, count: 1 };
    }

    this.setState({ deck: { main: main } });
  },

  _decrement: function(card) {
    let id = card.id;
    let main = this.state.deck.main;
    if (id in main) {
      main[id].count -= 1;
      if (main[id].count <= 0) {
        delete main[id];
      }

      this.setState({ deck: { main: main } });
    }
  }
});

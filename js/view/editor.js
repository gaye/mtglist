define((require, exports, module) => {
'use strict';

let Cardpool = require('./cardpool');
let InputText = require('./input_text');
let TextArea = require('./text_area');
let React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      deck: {
        name: 'Untitled',
        format: 'Standard',
        notes: '',
        main: '',
        side: {}
      },

      search: {
        card: ''
      }
    };
  },

  render: function() {
    return (
      <div className="editor">
        <Cardpool search={this.state.search.card} />
        <div className="metadata">
          <form>
            <InputText inputId="nameInput"
                       inputLabel="Name"
                       value={this.state.deck.name}
                       handleChange={this.onNameChange} />
            <InputText inputId="formatInput"
                       inputLabel="Format"
                       value={this.state.deck.format}
                       handleChange={this.onFormatChange} />
            <TextArea textAreaId="notesInput"
                      textAreaLabel="Notes"
                      value={this.state.deck.notes}
                      handleChange={this.onNotesChange} />
            <InputText inputId="cardInput"
                       inputLabel="Card Name"
                       handleChange={this.onCardChange} />
          </form>
        </div>
      </div>
    );
  },

  onNameChange: function(event) {
    this.setState({ deck: { name: event.target.value } });
  },

  onFormatChange: function(event) {
    this.setState({ deck: { format: event.target.value } });
  },

  onNotesChange: function(event) {
    this.setState({ deck: { notes: event.target.value } });
  },

  onCardChange: function(event) {
    this.setState({ search: { card: event.target.value } });
  }
});

});

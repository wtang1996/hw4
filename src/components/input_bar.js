import React, { Component } from 'react';

class InputBar extends Component {
  constructor(props) {
    super(props);

    this.state = { noteTitle: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.Submit = this.Submit.bind(this);
  }

  onInputChange(event) {
    this.setState({ noteTitle: event.target.value });
  }

  Submit(e) {
    e.preventDefault();
    this.props.addNote(this.state.noteTitle);
    this.setState({ noteTitle: '' });
  }

  render() {
    return (
      <form onSubmit={this.Submit}>
        <input onChange={this.onInputChange} value={this.state.noteTitle} />
        <button>Submit</button>
      </form>
    );
  }
}

export default InputBar;

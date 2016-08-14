import React, { Component } from 'react';
import NavBar from '../containers/navbar';

// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {};
  }

  render() {
    return (
      <div className="main">
        <NavBar />
        {this.props.children}
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';

class App extends Component{

  render() {
    return (
      <div className="App">
        <h1>Hello from React</h1>
      </div>

      // return Reach.createElement('div, {className: 'App'},
      // React.createElement('h1', null, 'Hello from React'))
    );
  }
}

export default App;

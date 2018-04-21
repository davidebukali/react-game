import React, { Component } from 'react';
import logo from './logo.svg';
//import HelloWorld from './HelloWorld';
import HelloWorldList from './HelloWorldList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HelloWorldList name="David"/>
      </div>
    );
  }
}

export default App;

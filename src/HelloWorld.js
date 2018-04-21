import React, { Component } from 'react';
import logo from './logo.svg';
import './HelloWorld.css';

class HelloWorld extends Component {
  constructor(props) {
    super(props);
    this.state = { greeting: 'Yo yo Hello Boss ' };
    this.frenchify = this.frenchify.bind(this);
  }

  frenchify() {
    this.setState({ greeting: 'Bonjour ' });
  }

  render() {
    return (
      <div className="HelloWorld">
        <header className="HelloWorld-header">
          <img src={logo} className="HelloWorld-logo" alt="logo" />
          <h1 className="HelloWorld-title">{this.state.greeting} {this.props.name}</h1>
        </header>
        <br/>
        <button onClick={this.frenchify}>Frenchify!</button>
      </div>
    );
  }
}

export default HelloWorld;

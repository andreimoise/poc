import React, { Component } from 'react';
import VerticalHeader from './vertical_header_component';
import Navigation from './navigation_component';
import Main from './main_component';

import './react-bootstrap-table-all.min.css';
import './App.css';

class App extends Component {

  render() {

    return (
      <div className="mainWrapper">
        <VerticalHeader/>
        <Navigation />
        <Main />
      </div>
    );
  }
}

export default App;

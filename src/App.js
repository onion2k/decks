import React, { Component } from "react";
import { Provider } from "mobx-react";

import "./App.css";

import UI from "./Components/UI";
import Record from "./Components/Record";
import ReactiveCSSVar from "./Components/ReactiveCSSVar";

import yt1210State from "./state/";

class App extends Component {

  render() {
    return (
      <Provider {...yt1210State}>
        <div className="App">
          <ReactiveCSSVar />
          <Record />
          <UI />
        </div>
      </Provider>
    );
  }
}

export default App;

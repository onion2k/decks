import React, { Component } from "react";
import { Provider } from "mobx-react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import Controls from "./Components/Controls";
import Playlist from "./Components/Playlist";
import Record from "./Components/Record";
import Nav from "./Components/Nav";
import About from "./Components/About";
import PlaylistManager from "./Components/PlaylistManager";
import ReactiveYouTube from "./Components/ReactiveYouTube";
import ReactiveCSSVar from "./Components/ReactiveCSSVar";

import Neon, { NeonColor } from "./Components/Neon";

import yt1210State from "./state/";

class App extends Component {

  render() {
    return (
      <Provider {...yt1210State}>
        <div className="App">
          <ReactiveCSSVar />
          <Record />
            <NeonColor>
              {(value) => (
              <div className="ui neon">
                <div className="titleControls">
                  <h1>Decks {value}</h1>
                  <Nav />
                </div>
                <Controls />
                <Switch>
                  <Route path="/about" component={About} />
                  <Route
                    path="/playlists"
                    component={() => {
                      return (
                        <PlaylistManager />
                      );
                    }}
                  />
                  <Route
                    component={() => {
                      return (
                        <Playlist />
                      );
                    }}
                  />
                </Switch>
                <ReactiveYouTube />
              </div>
              )}
            </NeonColor>
        </div>
      </Provider>
    );
  }
}

export default Neon(App);

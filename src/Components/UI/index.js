import React, { Component } from "react";
import { Provider } from "mobx-react";
import { Switch, Route } from "react-router-dom";
import "./UI.css";

import About from "../About";

import Controls from "../Controls";
import Playlist from "../Playlist";
import Nav from "../Nav";
import PlaylistManager from "../PlaylistManager";
import ReactiveYouTube from "../ReactiveYouTube";

import { Neon } from "../Neon";

class UI extends Component {

  render() {
    return (
      <Neon>
        {(color) => (
        <div className="ui neon {color}">
          <div className="titleControls">
            <h1>Decks</h1>
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
      </Neon>
    );
  }
}

export default UI;

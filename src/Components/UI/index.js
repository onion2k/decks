import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import withNeon, { fx } from "react-neon";
import "./UI.css";

import About from "../About";

import Controls from "../Controls";
import Playlist from "../Playlist";
import Nav from "../Nav";
import PlaylistManager from "../PlaylistManager";
import ReactiveYouTube from "../ReactiveYouTube";

const particles = new fx.Particles();

class UI extends Component {

  render() {
    return (
        <div className="ui">
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
    );
  }
}

export default withNeon(UI, particles);

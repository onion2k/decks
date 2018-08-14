import React, { Component } from "react";
import { Provider } from "mobx-react";
import { Switch, Route } from "react-router-dom";
import queryString from "query-string";

import "./App.css";

import Controls from "./Components/Controls";
import Playlist from "./Components/Playlist";
import Record from "./Components/Record";
import Nav from "./Components/Nav";
import About from "./Components/About";
import PlaylistManager from "./Components/PlaylistManager";
import ReactiveYouTube from "./Components/ReactiveYouTube";

import yt1210State from "./state/";

class App extends Component {

  render() {
    return (
      <Provider {...yt1210State}>
        <div className="App">
          <Record
            onTrack={this.onTrack}
            // vData={this.state.vData}
            // playing={this.state.playing}
            // tonearmPos={this.state.tonearmPos}
          />
          <div className="controls">
            <div className="titleControls">
              <h1>YT1210</h1>
              <Nav />
            </div>
            <ReactiveYouTube
              // onReady={this.onReady}
              // onPlay={this.onPlay}
              // onEnd={this.onEnd}
            />
            <Controls
              // onPlayVideo={this.onPlayVideo}
              // onPauseVideo={this.onPauseVideo}
              // onStopVideo={this.onStopVideo}
              // onChangeVideo={this.onChangeVideo}
            />
            <Switch>
              <Route path="/about" component={About} />
              <Route
                path="/playlists"
                component={() => {
                  return (
                    <PlaylistManager
                      // playList={this.playList}
                      // addList={this.addList}
                      // deleteList={this.deleteList}
                      // playlists={this.state.playlists}
                    />
                  );
                }}
              />
              <Route
                component={() => {
                  return (
                    <Playlist
                      // title={this.state.playlistTitle}
                      // playlist={this.state.playlist}
                      // trackData={this.state.trackData}
                      // playing={this.state.videoId}
                      // onClick={i => {
                      //   this.onChangeVideo(i);
                      // }}
                      // onDelete={i => {
                      //   this.onDeleteVideo(i);
                      // }}
                      // addTrack={videoId => {
                      //   this.addTrack(videoId);
                      // }}
                    />
                  );
                }}
              />
            </Switch>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;

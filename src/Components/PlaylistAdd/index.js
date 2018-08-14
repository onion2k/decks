import React, { Component } from "react";
import { inject, observer } from "mobx-react";

class PlaylistAdd extends Component {
  constructor() {
    super();
    this.state = { newtrack: "" };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ newtrack: event.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.playlistManager.playlistAddTrack(this.state.newtrack);
  }

  render() {
    return (
      <form className="NewTrack">
        <label>
          YouTube Link:
          <input type="text" value={this.state.newtrack} onChange={this.handleChange} />
        </label>
        <button onClick={this.onSubmit}>Add Track</button>
      </form>
    );
  }
}

export default inject("playlistManager")(observer(PlaylistAdd));

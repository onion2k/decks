import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from 'react-router-dom'

import PlaylistTitle from ".";

import yt1210PlaylistManager from "../../state/yt1210PlaylistManager.js"
const playlistManagerState = new yt1210PlaylistManager();

describe("Playlist Title", () => {
  const onClick = jest.fn();

  it("renders properly", () => {
    const playlistTitle = renderer
      .create(
        <PlaylistTitle playlistManager={playlistManagerState} />
      )
      .toJSON();
    expect(playlistTitle).toMatchSnapshot();
  });
});

import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from 'react-router-dom'
import PlaylistTracks from ".";
import localStorage from 'jest-localstorage-mock';

import yt1210PlaylistManager from "../../state/yt1210PlaylistManager"
const playlistManagerState = new yt1210PlaylistManager();

import yt1210Controls from "../../state/yt1210Controls"
const controlState = new yt1210Controls();

describe("Playlist Tracks", () => {
  const onClick = jest.fn();

  it("renders properly", () => {
    const tracks = renderer
      .create(
        <MemoryRouter>
          <PlaylistTracks playlistManager={playlistManagerState} playlistControls={controlState} />
        </MemoryRouter>
      )
      .toJSON();
    expect(tracks).toMatchSnapshot();
  });
});

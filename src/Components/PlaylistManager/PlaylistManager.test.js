import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from 'react-router-dom'

import PlaylistManager from ".";

import yt1210PlaylistManager from "../../state/yt1210PlaylistManager"
const playlistManagerState = new yt1210PlaylistManager();

describe("Playlist Manager", () => {
  const onClick = jest.fn();

  it("renders properly", () => {
    const playlistManager = renderer
      .create(
        <MemoryRouter>
          <PlaylistManager playlistManager={playlistManagerState} />
        </MemoryRouter>
      )
      .toJSON();
    expect(playlistManager).toMatchSnapshot();
  });
});

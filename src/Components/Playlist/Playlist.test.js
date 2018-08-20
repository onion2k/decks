import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "mobx-react";
import { MemoryRouter } from 'react-router-dom'
import localStorage from 'jest-localstorage-mock';

import Playlist from ".";

import yt1210PlaylistManager from "../../state/yt1210PlaylistManager"
const playlistManagerState = new yt1210PlaylistManager();

import yt1210Controls from "../../state/yt1210Controls"
const controlState = new yt1210Controls();

describe("Playlist", () => {
  const onClick = jest.fn();

  it("renders properly", () => {
    const playlist = renderer
      .create(
        <MemoryRouter>
          <Provider playlistManager={playlistManagerState} playlistControls={controlState}>
            <Playlist />
          </Provider> 
        </MemoryRouter>
      )
      .toJSON();
    expect(playlist).toMatchSnapshot();
  });
});

import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from 'react-router-dom'

import Record from ".";

import yt1210PlaylistManager from "../../state/yt1210PlaylistManager"
const playlistManagerState = new yt1210PlaylistManager();

import yt1210Controls from "../../state/yt1210Controls"
const controlState = new yt1210Controls();

describe("Record", () => {
  it("renders properly", () => {
    const tree = renderer.create(
    <Record playlistManager={playlistManagerState} playlistControls={controlState} />
  ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

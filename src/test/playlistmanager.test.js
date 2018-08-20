import React from "react";
import renderer from "react-test-renderer";

import PlaylistManager from "../Components/PlaylistManager";

describe("Playlist Manager", () => {
  const onClick = jest.fn();

  it("renders properly", () => {
    const playlistManager = renderer
      .create(
        <PlaylistManager />
      )
      .toJSON();
    expect(playlistManager).toMatchSnapshot();
  });
});

import React from "react";
import renderer from "react-test-renderer";

import PlaylistTitle from "../Components/PlaylistTitle";

describe("Playlist Title", () => {
  const onClick = jest.fn();

  it("renders properly", () => {
    const playlistTitle = renderer
      .create(
        <PlaylistTitle />
      )
      .toJSON();
    expect(playlistTitle).toMatchSnapshot();
  });
});

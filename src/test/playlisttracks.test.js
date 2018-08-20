import React from "react";
import renderer from "react-test-renderer";

import PlaylistTracks from "../Components/PlaylistTracks";

describe("Playlist Tracks", () => {
  const onClick = jest.fn();

  it("renders properly", () => {
    const tracks = renderer
      .create(
        <PlaylistTracks />
      )
      .toJSON();
    expect(tracks).toMatchSnapshot();
  });
});

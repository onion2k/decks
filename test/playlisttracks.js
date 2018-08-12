import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

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

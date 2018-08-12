import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

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

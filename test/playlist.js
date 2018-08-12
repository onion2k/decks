import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

describe("Playlist", () => {
  const onClick = jest.fn();

  it("renders properly", () => {
    const playlist = renderer
      .create(
        <Playlist />
      )
      .toJSON();
    expect(playlist).toMatchSnapshot();
  });
});

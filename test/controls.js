import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

describe("Playlist Controls", () => {
  const onClick = jest.fn();

  it("renders properly", () => {
    const controls = renderer
      .create(
        <PlaylistControls />
      )
      .toJSON();
    expect(controls).toMatchSnapshot();
  });

  it("should toggle options on click", () => {
    const controls = mount(
      <PlaylistControls />
    );

    expect(controls.find("button")).toHaveLength(8);
    controls
      .find("button")
      .first()
      .simulate("click");

  });
});

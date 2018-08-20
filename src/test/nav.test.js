import React from "react";
import renderer from "react-test-renderer";

import Nav from "../Components/Nav";

describe("Navigation", () => {
  const onClick = jest.fn();

  it("renders properly", () => {
    const nav = renderer
      .create(
        <Nav />
      )
      .toJSON();
    expect(nav).toMatchSnapshot();
  });
});

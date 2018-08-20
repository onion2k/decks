import React from "react";
import renderer from "react-test-renderer";

import About from "../Components/About";

describe("About", () => {
  const onClick = jest.fn();

  it("renders properly", () => {
    const about = renderer
      .create(
        <About />
      )
      .toJSON();
    expect(about).toMatchSnapshot();
  });
});

import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from 'react-router-dom'

import About from ".";

describe("About", () => {
  const onClick = jest.fn();

  it("renders properly", () => {
    const about = renderer
      .create(
        <MemoryRouter>
          <About />
        </MemoryRouter>
      )
      .toJSON();
    expect(about).toMatchSnapshot();
  });
});

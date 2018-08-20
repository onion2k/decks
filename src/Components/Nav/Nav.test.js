import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from 'react-router-dom'

import Nav from ".";

describe("Navigation", () => {
  const onClick = jest.fn();

  it("renders properly", () => {
    const nav = renderer
      .create(
        <MemoryRouter>
          <Nav />
        </MemoryRouter>
      )
      .toJSON();
    expect(nav).toMatchSnapshot();
  });
});

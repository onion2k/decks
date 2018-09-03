import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from 'react-router-dom'

import UI from ".";

describe("UI", () => {
  const onClick = jest.fn();

  it("renders properly", () => {
    const UI = renderer
      .create(
        <MemoryRouter>
          <UI />
        </MemoryRouter>
      )
      .toJSON();
    expect(UI).toMatchSnapshot();
  });
});

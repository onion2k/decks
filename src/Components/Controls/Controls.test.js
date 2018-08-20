import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from 'react-router-dom'
import Enzyme, { mount } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

import Controls from ".";

import yt1210Controls from "../../state/yt1210Controls"
const controlState = new yt1210Controls();

describe("Playlist Controls", () => {
  const onClick = jest.fn();

  it("renders properly", () => {
    const controls = renderer
      .create(
        <MemoryRouter>
          <Controls playlistControls={controlState} />
        </MemoryRouter>
      )
      .toJSON();
    expect(controls).toMatchSnapshot();
  });

  it("should toggle options on click", () => {
    const controls = mount(
      <MemoryRouter>
        <Controls playlistControls={controlState} />
      </MemoryRouter>
    );

    expect(controls.find(".buttons > .button")).toHaveLength(9);

  });
});

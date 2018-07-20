import React from "react";
import renderer from "react-test-renderer";
import Record from "./Record";

describe("Record", () => {
  it("renders properly", () => {
    const tree = renderer
      .create(<Record />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

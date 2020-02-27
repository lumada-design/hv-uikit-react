import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../Provider";
import Grid from "..";

window.matchMedia = jest.fn(() => ({
  matches: false,
  addListener: jest.fn(),
  removeListener: jest.fn()
}));

describe("Grid withStyles", () => {
  const wrapper = mount(
    <HvProvider>
      <Grid />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the Grid component", () => {
    const GridComponent = wrapper.find(Grid);
    expect(GridComponent.length).toBe(1);
  });
});

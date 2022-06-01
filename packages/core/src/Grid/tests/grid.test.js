import React from "react";
import { mount } from "enzyme";

import { HvGrid, HvProvider } from "../..";
import { Main } from "../stories/Grid.stories";

describe("Grid", () => {
  const wrapper = mount(
    <HvProvider disableCssBaseline>
      <Main />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvGrid)).toMatchSnapshot();
  });

  it("should render the Grid component", () => {
    const GridComponent = wrapper.find(HvGrid);
    expect(GridComponent.length).toBe(5);
  });
});

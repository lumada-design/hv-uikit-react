import React from "react";
import { mount } from "enzyme";

import { HvProvider } from "../..";
import { SimpleGrid } from "../stories/SimpleGrid.stories";

describe("Grid", () => {
  const wrapper = mount(
    <HvProvider>
      <SimpleGrid />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

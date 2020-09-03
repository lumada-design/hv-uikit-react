import React from "react";
import { mount } from "enzyme";
import { Main } from "../../stories/ActionBar.stories";
import { HvActionContainer, HvProvider } from "../../..";

describe("[v3] Action Bar", () => {
  const wrapper = mount(
    <HvProvider>
      <Main />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvActionContainer)).toMatchSnapshot();
  });
});

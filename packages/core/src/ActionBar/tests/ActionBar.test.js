import React from "react";
import { mount } from "enzyme";
import { Main } from "../stories/ActionBar.stories";
import { HvActionBar, HvProvider } from "../..";

describe("Action Bar", () => {
  const wrapper = mount(
    <HvProvider cssBaseline={false}>
      <Main />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvActionBar)).toMatchSnapshot();
  });
});

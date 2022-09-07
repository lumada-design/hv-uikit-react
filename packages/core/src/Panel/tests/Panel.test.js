/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { Main } from "../stories/Panel.stories";
import { HvProvider, HvPanel } from "../..";

describe("Panel", () => {
  let wrapper;

  it("should be defined", () => {
    wrapper = mount(
      <HvProvider cssBaseline={false}>
        <Main />
      </HvProvider>
    );
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvPanel)).toMatchSnapshot();
  });

  it("should render the Panel", () => {
    const component = wrapper.find(HvPanel);
    expect(component.length).toBe(1);
  });
});

/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { HvProvider, HvSwitch } from "../..";
import { Main } from "../stories/Switch.stories";

describe("[v3] Switch withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <Main />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvSwitch)).toMatchSnapshot();
  });

  it("should render the Switch components", () => {
    const buttonComponent = wrapper.find(HvSwitch);
    expect(buttonComponent.length).toBe(2);
  });
});

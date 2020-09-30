/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { Main } from "../stories/RadioGroup.stories";

import { HvRadioGroup, HvProvider } from "../..";

describe("CheckBoxGroup", () => {
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
    expect(wrapper.find(HvRadioGroup)).toMatchSnapshot();
  });

  it("should render the HvRadioGroup", () => {
    const component = wrapper.find(HvRadioGroup);
    expect(component.length).toBe(1);
  });
});

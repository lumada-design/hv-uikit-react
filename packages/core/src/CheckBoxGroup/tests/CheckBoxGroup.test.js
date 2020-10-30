/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { Main } from "../stories/CheckBoxGroup.stories";

import { HvCheckBoxGroup, HvProvider } from "../..";

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
    expect(wrapper.find(HvCheckBoxGroup)).toMatchSnapshot();
  });

  it("should render the HvCheckBoxGroup", () => {
    const component = wrapper.find(HvCheckBoxGroup);
    expect(component.length).toBe(1);
  });
});

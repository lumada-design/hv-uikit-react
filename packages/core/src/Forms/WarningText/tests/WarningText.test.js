/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { HvProvider, HvHelperText } from "../../..";

/* eslint-disable no-console */

describe("HelperText", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <HvHelperText id="base" notification="test">
          test
        </HvHelperText>
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvHelperText)).toMatchSnapshot();
  });

  it("should render the Input component", () => {
    const HvHelperTextComponent = wrapper.find(HvHelperText);
    expect(HvHelperTextComponent.length).toBe(1);
  });
});

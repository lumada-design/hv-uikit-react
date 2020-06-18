/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../../Provider";
import HelperText from "../HelperText";

/* eslint-disable no-console */

describe("HelperText", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <HelperText id="base" notification="test">
          test
        </HelperText>
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HelperText)).toMatchSnapshot();
  });

  it("should render the Input component", () => {
    const HvHelperTextComponent = wrapper.find(HelperText);
    expect(HvHelperTextComponent.length).toBe(1);
  });
});

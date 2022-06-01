/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { HvProvider, HvWarningText } from "../../..";

/* eslint-disable no-console */

describe("HelperText", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider disableCssBaseline>
        <HvWarningText id="base">test</HvWarningText>
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvWarningText)).toMatchSnapshot();
  });

  it("should render the helper text component", () => {
    const HvWarningTextComponent = wrapper.find(HvWarningText);
    expect(HvWarningTextComponent.length).toBe(1);
  });
});

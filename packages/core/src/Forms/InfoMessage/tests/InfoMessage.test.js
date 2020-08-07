/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { HvProvider, HvInfoMessage } from "../../..";

/* eslint-disable no-console */

describe("v3 InfoMessage", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <HvInfoMessage id="base">test</HvInfoMessage>
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvInfoMessage)).toMatchSnapshot();
  });

  it("should render the info message component", () => {
    const HvInfoMessageComponent = wrapper.find(HvInfoMessage);
    expect(HvInfoMessageComponent.length).toBe(1);
  });
});

/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { HvLabel } from "../../..";
import HvProvider from "../../../Provider";

/* eslint-disable no-console */

describe("Label", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider cssBaseline="none">
        <HvLabel label="description" />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvLabel)).toMatchSnapshot();
  });

  it("should render the Input component", () => {
    const infoTextComponent = wrapper.find(HvLabel);
    expect(infoTextComponent.length).toBe(1);
  });
});

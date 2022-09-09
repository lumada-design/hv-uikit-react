/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { HvProvider, HvCharCounter } from "../../..";

/* eslint-disable no-console */

describe("charCounter", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider cssBaseline="none">
        <HvCharCounter id="charCounter" currentCharQuantity={0} maxCharQuantity={1500} />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvCharCounter)).toMatchSnapshot();
  });

  it("should render the char counter component", () => {
    const HvInfoMessageComponent = wrapper.find(HvCharCounter);
    expect(HvInfoMessageComponent.length).toBe(1);
  });

  it("should render the char counter component overloaded", () => {
    const wrapperOverloaded = mount(
      <HvProvider cssBaseline="none">
        <HvCharCounter id="charCounter" currentCharQuantity={1600} maxCharQuantity={1500} />
      </HvProvider>
    );
    const HvInfoMessageComponent = wrapperOverloaded.find(HvCharCounter);
    expect(HvInfoMessageComponent.length).toBe(1);
  });
});

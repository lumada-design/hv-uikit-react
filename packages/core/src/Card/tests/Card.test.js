/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { HvActionsGeneric, HvCard, HvCheckBox, HvProvider } from "../..";
import { Main, AllComponents } from "../stories/Card.stories";

describe("Card", () => {
  let wrapper;

  it("should be able to render with every property defined", () => {
    wrapper = mount(
      <HvProvider cssBaseline="none">
        <Main />
      </HvProvider>
    );

    expect(wrapper.find(HvCard)).toMatchSnapshot();
  });

  it("should render all the card components", () => {
    wrapper = mount(
      <HvProvider cssBaseline="none">
        <AllComponents />
      </HvProvider>
    );

    expect(wrapper.find(HvCheckBox).length).toBe(1);
    expect(wrapper.find(HvActionsGeneric).length).toBe(1);
    expect(wrapper.text("Leaves appear wilted and scorched")).toBeDefined();
  });
});

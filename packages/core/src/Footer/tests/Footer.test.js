/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { Main } from "../stories/Footer.stories";
import { HvProvider, HvFooter } from "../..";

describe("Footer", () => {
  let wrapper;

  it("should be defined", () => {
    wrapper = mount(
      <HvProvider cssBaseline="none">
        <Main />
      </HvProvider>
    );
    expect(wrapper).toBeDefined();
  });

  it("should render the Footer", () => {
    const component = wrapper.find(HvFooter);
    expect(component.length).toBe(1);
  });
});

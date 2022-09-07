/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { Main } from "../stories/Suggestions.stories";
import { HvProvider, HvSuggestions } from "../../..";

describe("Suggestions", () => {
  let wrapper;

  it("should be defined", () => {
    wrapper = mount(
      <HvProvider cssBaseline={false}>
        <Main />
      </HvProvider>
    );
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvSuggestions)).toMatchSnapshot();
  });

  it("should render the Suggestions", () => {
    const component = wrapper.find(HvSuggestions);
    expect(component.length).toBe(1);
  });
});

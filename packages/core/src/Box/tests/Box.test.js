/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { Main } from "../stories/Box.stories";
import { HvProvider, HvBox } from "../..";

describe("Box", () => {
  let wrapper;

  it("should be defined", () => {
    wrapper = mount(
      <HvProvider>
        <Main />
      </HvProvider>
    );
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvBox)).toMatchSnapshot();
  });

  it("should render the Box", () => {
    const component = wrapper.find(HvBox);
    expect(component.length).toBe(1);
  });
});

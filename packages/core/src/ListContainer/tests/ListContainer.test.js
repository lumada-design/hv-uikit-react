/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { Main } from "../stories/ListContainer.stories";
import { HvProvider, HvListContainer } from "../..";

describe("ListContainer", () => {
  let wrapper;

  it("should be defined", () => {
    wrapper = mount(
      <HvProvider cssBaseline="none">
        <Main />
      </HvProvider>
    );
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvListContainer)).toMatchSnapshot();
  });

  it("should render the ListContainer", () => {
    const component = wrapper.find(HvListContainer);
    expect(component.length).toBe(1);
  });
});

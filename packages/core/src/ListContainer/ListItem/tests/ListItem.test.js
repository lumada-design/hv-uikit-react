/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { HvProvider, HvListItem } from "../../..";

describe("ListItem", () => {
  let wrapper;

  it("should be defined", () => {
    wrapper = mount(
      <HvProvider disableCssBaseline>
        <HvListItem />
      </HvProvider>
    );
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvListItem)).toMatchSnapshot();
  });

  it("should render the ListItem", () => {
    const component = wrapper.find(HvListItem);
    expect(component.length).toBe(1);
  });
});

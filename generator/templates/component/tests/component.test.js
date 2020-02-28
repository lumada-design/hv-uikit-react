/* eslint-env jest */

import React from "react";
import { shallow } from "enzyme";

import HvProvider from "../../Provider";
import Component from "..";

describe("Component withStyles", () => {
  let wrapper;

  it("should be defined", () => {
    wrapper = shallow(
      <HvProvider>
        <Component />
      </HvProvider>
    );
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the Component", () => {
    const component = wrapper.find(Component);
    expect(component.length).toBe(1);
  });
});

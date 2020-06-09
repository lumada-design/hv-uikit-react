/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../../Provider";
import ErrorText from "../ErrorText";

/* eslint-disable no-console */

describe("ErrorText", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <ErrorText id="base" errorTextStatus="valid" label="text" />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(ErrorText)).toMatchSnapshot();
  });

  it("should render the error component", () => {
    const errorTextComponent = wrapper.find(ErrorText);
    expect(errorTextComponent.length).toBe(1);
  });
});

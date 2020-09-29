/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../../Provider";
import BaseInput from "..";

const inputProps = {
  "aria-label": "Input Label",
};

describe("v3 Input", () => {
  let wrapper;

  const getInputProps = (ParentElement) => ParentElement.find(BaseInput).props();

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <BaseInput placeholder="test" inputProps={inputProps} />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(BaseInput)).toMatchSnapshot();
  });

  it("should render the Input component", () => {
    const inputComponent = wrapper.find(BaseInput);
    expect(inputComponent.length).toBe(1);
  });

  it("should disable the Base Input component", () => {
    wrapper = mount(
      <HvProvider>
        <BaseInput placeholder="test" disabled />
      </HvProvider>
    );
    expect(getInputProps(wrapper).disabled).toBe(true);
  });

  it("should render the Input component with the multiline style", () => {
    const wrapperTextArea = mount(
      <HvProvider>
        <BaseInput placeholder="test" multiline />
      </HvProvider>
    );
    expect(wrapperTextArea.find(BaseInput)).toMatchSnapshot();
  });
});

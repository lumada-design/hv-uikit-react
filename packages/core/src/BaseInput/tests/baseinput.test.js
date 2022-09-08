/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../Provider";
import BaseInput from "..";

const inputProps = {
  "aria-label": "Input Label",
};

describe("Input", () => {
  let wrapper;

  const getInputProps = (ParentElement) => ParentElement.find(BaseInput).props();

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider cssBaseline="none">
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
      <HvProvider cssBaseline="none">
        <BaseInput placeholder="test" disabled />
      </HvProvider>
    );

    // not using jest-dom yet
    // eslint-disable-next-line jest-dom/prefer-enabled-disabled
    expect(getInputProps(wrapper).disabled).toBe(true);
  });

  it("should render the Input component with the multiline style", () => {
    const wrapperTextArea = mount(
      <HvProvider cssBaseline="none">
        <BaseInput placeholder="test" multiline />
      </HvProvider>
    );
    expect(wrapperTextArea.find(BaseInput)).toMatchSnapshot();
  });
});

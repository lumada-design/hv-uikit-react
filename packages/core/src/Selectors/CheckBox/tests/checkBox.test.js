/* eslint-env jest */

// import { mount } from "enzyme";
import React from "react";
import { mount } from "enzyme";

import { Checkbox } from "@hv/uikit-react-icons";

import { HvCheckBox, HvProvider } from "../../..";
import labelPositions from "../../labelPositions";

import { Main, Disabled } from "../stories/CheckBox.stories";

describe("[v3] CheckBox", () => {
  let wrapper;

  const labelStartClassName = "labelStart";
  const labelEndClassName = "labelEnd";

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <Main />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvCheckBox)).toMatchSnapshot();
  });

  it("should render the Checkbox component", () => {
    const buttonComponent = wrapper.find(HvCheckBox);
    expect(buttonComponent.length).toBe(1);
  });

  it("should have an icon", () => {
    const component = wrapper.find(HvCheckBox);

    expect(component.find(Checkbox).length).toBe(1);
  });

  it("should have an icon when disabled", () => {
    wrapper = mount(
      <HvProvider>
        <Disabled />
      </HvProvider>
    );

    const component = wrapper.find(HvCheckBox);

    expect(component.find(Checkbox).length).toBe(1);
  });

  it("should apply the correct class name when there is a label at the start", () => {
    const mountWrapper = mount(
      <HvProvider>
        <HvCheckBox label="test" labelPlacement={labelPositions.start} />
      </HvProvider>
    ).find(HvCheckBox);
    expect(mountWrapper.html().includes(labelStartClassName)).toBe(true);
    expect(mountWrapper.html().includes(labelEndClassName)).toBe(false);
  });

  it("should apply the correct class name when there is a label at the end", () => {
    const mountWrapper = mount(
      <HvProvider>
        <HvCheckBox label="test" labelPlacement={labelPositions.end} />
      </HvProvider>
    ).find(HvCheckBox);
    expect(mountWrapper.html().includes(labelStartClassName)).toBe(false);
    expect(mountWrapper.html().includes(labelEndClassName)).toBe(true);
  });

  it("should not apply any class name when there is no label specified", () => {
    const mountWrapper = mount(
      <HvProvider>
        <HvCheckBox labelPlacement={labelPositions.start} />
      </HvProvider>
    ).find(HvCheckBox);
    expect(mountWrapper.html().includes(labelStartClassName)).toBe(false);
    expect(mountWrapper.html().includes(labelEndClassName)).toBe(false);
  });
});

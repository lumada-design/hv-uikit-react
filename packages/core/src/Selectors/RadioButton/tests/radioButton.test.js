/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { RadioButtonUnselected } from "@hitachivantara/uikit-react-icons";
import { HvProvider, HvRadio } from "../../..";
import labelPositions from "../../labelPositions";
import theme from "../../../theme";
import { Main, Disabled } from "../stories/RadioButton.stories";

describe("RadioButton", () => {
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
    expect(wrapper.find(HvRadio)).toMatchSnapshot();
  });

  it("should render the RadioButton component", () => {
    const buttonComponent = wrapper.find(HvRadio);
    expect(buttonComponent.length).toBe(1);
  });

  it("should have an icon", () => {
    const component = wrapper.find(HvRadio);
    const componentHtml = component.html();

    expect(component.find(RadioButtonUnselected).length).toBe(1);

    expect(componentHtml.includes(theme.hv.palette.atmosphere.atmo4)).toBe(false);
    expect(componentHtml.includes(theme.hv.palette.atmosphere.atmo6)).toBe(false);
  });

  it("should have an icon when disabled", () => {
    wrapper = mount(
      <HvProvider>
        <Disabled />
      </HvProvider>
    );

    const component = wrapper.find(HvRadio);
    const componentHtml = component.html();

    expect(component.find(RadioButtonUnselected).length).toBe(1);

    expect(componentHtml.includes(theme.hv.palette.atmosphere.atmo4)).toBe(true);
    expect(componentHtml.includes(theme.hv.palette.atmosphere.atmo6)).toBe(true);
  });

  it("should apply the correct class name when there is a label at the start", () => {
    const mountWrapper = mount(
      <HvProvider>
        <HvRadio label="test" labelPlacement={labelPositions.start} />
      </HvProvider>
    ).find(HvRadio);
    expect(mountWrapper.html().includes(labelStartClassName)).toBe(true);
    expect(mountWrapper.html().includes(labelEndClassName)).toBe(false);
  });

  it("should apply the correct class name when there is a label at the end", () => {
    const mountWrapper = mount(
      <HvProvider>
        <HvRadio label="test" labelPlacement={labelPositions.end} />
      </HvProvider>
    ).find(HvRadio);
    expect(mountWrapper.html().includes(labelStartClassName)).toBe(false);
    expect(mountWrapper.html().includes(labelEndClassName)).toBe(true);
  });

  it("should not apply any class name when there is no label specified", () => {
    const mountWrapper = mount(
      <HvProvider>
        <HvRadio labelPlacement={labelPositions.start} />
      </HvProvider>
    ).find(HvRadio);
    expect(mountWrapper.html().includes(labelStartClassName)).toBe(false);
    expect(mountWrapper.html().includes(labelEndClassName)).toBe(false);
  });
});

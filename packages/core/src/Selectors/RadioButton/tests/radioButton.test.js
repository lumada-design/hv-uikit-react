/* eslint-env jest */

import React from "react";
import { shallow, mount } from "enzyme";

import RadioButtonUnSelected from "@hv/uikit-react-icons/dist/RadioButtonUnselected";

import RadioButton from "..";
import labelPositions from "../../labelPositions";
import HvProvider from "../../../Provider";
import theme from "../../../theme";

describe("RadioButton withStyles", () => {
  let wrapper;

  const labelStartClassName = "labelStart";
  const labelEndClassName = "labelEnd";

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <RadioButton />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(RadioButton)).toMatchSnapshot();
  });

  it("should render the RadioButton component", () => {
    const mountWrapper = mount(
      <HvProvider>
        <RadioButton />
      </HvProvider>
    );
    const buttonComponent = mountWrapper.find(RadioButton);
    expect(buttonComponent.length).toBe(1);
  });

  it("should have an icon", () => {
    const mountWrapper = mount(
      <HvProvider>
        <RadioButton />
      </HvProvider>
    );

    const component = mountWrapper.find(RadioButton);
    const componentHtml = component.html();

    expect(component.find(RadioButtonUnSelected).length).toBe(1);

    expect(componentHtml.includes(theme.hv.palette.atmosphere.atmo4)).toBe(false);
    expect(componentHtml.includes(theme.hv.palette.atmosphere.atmo6)).toBe(false);
  });

  it("should have an icon when disabled", () => {
    const mountWrapper = mount(
      <HvProvider>
        <RadioButton disabled />
      </HvProvider>
    );

    const component = mountWrapper.find(RadioButton);
    const componentHtml = component.html();

    expect(component.find(RadioButtonUnSelected).length).toBe(1);

    expect(componentHtml.includes(theme.hv.palette.atmosphere.atmo4)).toBe(true);
    expect(componentHtml.includes(theme.hv.palette.atmosphere.atmo6)).toBe(true);
  });

  it("should apply the correct class name when there is a label at the start", () => {
    const mountWrapper = mount(
      <HvProvider>
        <RadioButton label="test" labelPlacement={labelPositions.start} />
      </HvProvider>
    ).find(RadioButton);
    expect(mountWrapper.html().includes(labelStartClassName)).toBe(true);
    expect(mountWrapper.html().includes(labelEndClassName)).toBe(false);
  });

  it("should apply the correct class name when there is a label at the end", () => {
    const mountWrapper = mount(
      <HvProvider>
        <RadioButton label="test" labelPlacement={labelPositions.end} />
      </HvProvider>
    ).find(RadioButton);
    expect(mountWrapper.html().includes(labelStartClassName)).toBe(false);
    expect(mountWrapper.html().includes(labelEndClassName)).toBe(true);
  });

  it("should not apply any class name when there is no label specified", () => {
    const mountWrapper = mount(
      <HvProvider>
        <RadioButton labelPlacement={labelPositions.start} />
      </HvProvider>
    ).find(RadioButton);
    expect(mountWrapper.html().includes(labelStartClassName)).toBe(false);
    expect(mountWrapper.html().includes(labelEndClassName)).toBe(false);
  });
});

/* eslint-env jest */

// import { mount } from "enzyme";
import React from "react";
import { shallow, mount } from "enzyme";

import CheckBoxIcon from "@hv/uikit-react-icons/dist/Checkbox";

import CheckBoxWithStyles from "../index";
import CheckBox from "../CheckBox";
import labelPositions from "../../labelPositions";
import HvProvider from "../../../Provider";
import theme from "../../../theme";

describe("CheckBox withStyles", () => {
  let wrapper;

  const labelStartClassName = "labelStart";
  const labelEndClassName = "labelEnd";

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <CheckBoxWithStyles />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the Checkbox component", () => {
    wrapper = mount(
      <HvProvider>
        <CheckBoxWithStyles />
      </HvProvider>
    );
    const buttonComponent = wrapper.find(CheckBox);
    expect(buttonComponent.length).toBe(1);
  });

  it("should have an icon", () => {
    const mountWrapper = mount(
      <HvProvider>
        <CheckBoxWithStyles />
      </HvProvider>
    );

    const component = mountWrapper.find(CheckBox);
    const componentHtml = component.html();

    expect(component.find(CheckBoxIcon).length).toBe(1);

    expect(componentHtml.includes(theme.hv.palette.atmosphere.atmo4)).toBe(false);
    expect(componentHtml.includes(theme.hv.palette.atmosphere.atmo6)).toBe(false);
  });

  it("should have an icon when disabled", () => {
    const mountWrapper = mount(
      <HvProvider>
        <CheckBoxWithStyles disabled />
      </HvProvider>
    );

    const component = mountWrapper.find(CheckBox);
    const componentHtml = component.html();

    expect(component.find(CheckBoxIcon).length).toBe(1);

    expect(componentHtml.includes(theme.hv.palette.atmosphere.atmo4)).toBe(true);
    expect(componentHtml.includes(theme.hv.palette.atmosphere.atmo6)).toBe(true);
  });

  it("should apply the correct class name when there is a label at the start", () => {
    const mountWrapper = mount(
      <HvProvider>
        <CheckBoxWithStyles label="test" labelPlacement={labelPositions.start} />
      </HvProvider>
    ).find(CheckBox);
    expect(mountWrapper.html().includes(labelStartClassName)).toBe(true);
    expect(mountWrapper.html().includes(labelEndClassName)).toBe(false);
  });

  it("should apply the correct class name when there is a label at the end", () => {
    const mountWrapper = mount(
      <HvProvider>
        <CheckBoxWithStyles label="test" labelPlacement={labelPositions.end} />
      </HvProvider>
    ).find(CheckBox);
    expect(mountWrapper.html().includes(labelStartClassName)).toBe(false);
    expect(mountWrapper.html().includes(labelEndClassName)).toBe(true);
  });

  it("should not apply any class name when there is no label specified", () => {
    const mountWrapper = mount(
      <HvProvider>
        <CheckBoxWithStyles labelPlacement={labelPositions.start} />
      </HvProvider>
    ).find(CheckBox);
    expect(mountWrapper.html().includes(labelStartClassName)).toBe(false);
    expect(mountWrapper.html().includes(labelEndClassName)).toBe(false);
  });
});

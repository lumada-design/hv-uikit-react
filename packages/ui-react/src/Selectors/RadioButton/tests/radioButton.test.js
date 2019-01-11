/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

/* eslint-env jest */

// import { mount } from "enzyme";
import React from "react";
import { shallow, mount } from "enzyme";

import RadioWithStyles from "../index";
import RadioButton from "../RadioButton";
import labelPositions from "../../labelPositions";

describe("RadioButton withStyles", () => {
  let wrapper;

  const getIconClassNames = ParentElement =>
    ParentElement.children()
      .children()
      .children()
      .props().control.props.icon.props.className;

  const getCheckedIconClassNames = ParentElement =>
    ParentElement.children()
      .children()
      .children()
      .props().control.props.checkedIcon.props.className;

  const getLabelPositionClassNames = ParentElement =>
    ParentElement.children()
      .children()
      .props().className;

  const emptyIconClassName = "iconEmpty";
  const fullIconClassName = "iconFull";
  const disableIconClassName = "iconDisable";
  const labelStartClassName = "labelStart";
  const labelEndClassName = "labelEnd";

  beforeEach(async () => {
    wrapper = shallow(<RadioWithStyles />);
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the RadioButton component", () => {
    const buttonComponent = wrapper.find(RadioButton);
    expect(buttonComponent.length).toBe(1);
  });

  it("should apply the correct icon", () => {
    const mountWrapper = mount(<RadioWithStyles />);
    expect(getIconClassNames(mountWrapper).includes(emptyIconClassName)).toBe(
      true
    );
    expect(
      getCheckedIconClassNames(mountWrapper).includes(fullIconClassName)
    ).toBe(true);
    expect(
      getCheckedIconClassNames(mountWrapper).includes(disableIconClassName)
    ).toBe(false);
    expect(getIconClassNames(mountWrapper).includes(disableIconClassName)).toBe(
      false
    );
  });

  it("should apply the correct icon when disabled", () => {
    const mountWrapper = mount(<RadioWithStyles disabled />);
    expect(getIconClassNames(mountWrapper).includes(emptyIconClassName)).toBe(
      false
    );
    expect(
      getCheckedIconClassNames(mountWrapper).includes(fullIconClassName)
    ).toBe(false);
    expect(
      getCheckedIconClassNames(mountWrapper).includes(disableIconClassName)
    ).toBe(true);
    expect(getIconClassNames(mountWrapper).includes(disableIconClassName)).toBe(
      true
    );
  });

  it("should apply the correct class name when there is a label at the start", () => {
    const mountWrapper = mount(
      <RadioWithStyles label="test" labelPlacement={labelPositions.start} />
    );
    expect(
      getLabelPositionClassNames(mountWrapper).includes(labelStartClassName)
    ).toBe(true);
    expect(
      getLabelPositionClassNames(mountWrapper).includes(labelEndClassName)
    ).toBe(false);
  });

  it("should apply the correct class name when there is a label at the end", () => {
    const mountWrapper = mount(
      <RadioWithStyles label="test" labelPlacement={labelPositions.end} />
    );
    expect(
      getLabelPositionClassNames(mountWrapper).includes(labelStartClassName)
    ).toBe(false);
    expect(
      getLabelPositionClassNames(mountWrapper).includes(labelEndClassName)
    ).toBe(true);
  });

  it("should not apply any class name when there is no label specified", () => {
    const mountWrapper = mount(
      <RadioWithStyles labelPlacement={labelPositions.start} />
    );
    expect(
      getLabelPositionClassNames(mountWrapper).includes(labelStartClassName)
    ).toBe(false);
    expect(
      getLabelPositionClassNames(mountWrapper).includes(labelEndClassName)
    ).toBe(false);
  });
});

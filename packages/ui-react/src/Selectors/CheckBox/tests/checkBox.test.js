/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-env jest */

// import { mount } from "enzyme";
import React from "react";
import { shallow, mount } from "enzyme";

import CheckBoxWithStyles from "../index";
import CheckBox from "../CheckBox";
import labelPositions from "../../labelPositions";
import HvProvider from "../../../Provider";

describe("CheckBox withStyles", () => {
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

  const getIndeterminateIconClassNames = ParentElement =>
    ParentElement.children()
      .children()
      .children()
      .props().control.props.indeterminateIcon.props.className;

  const getLabelPositionClassNames = ParentElement =>
    ParentElement.children()
      .children()
      .props().className;

  const emptyIconClassName = "iconEmpty";
  const fullIconClassName = "iconFull";
  const indeterminateIconClassName = "iconIndeterminate";
  const disableIconClassName = "iconDisable";
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

  it("should render the RadioButton component", () => {
    wrapper = mount(
      <HvProvider>
        <CheckBoxWithStyles />
      </HvProvider>
    );
    const buttonComponent = wrapper.find(CheckBox);
    expect(buttonComponent.length).toBe(1);
  });

  it("should apply the correct icon", () => {
    const mountWrapper = mount(
      <HvProvider>
        <CheckBoxWithStyles />
      </HvProvider>
    ).find(CheckBox);
    expect(getIconClassNames(mountWrapper).includes(emptyIconClassName)).toBe(
      true
    );
    expect(
      getCheckedIconClassNames(mountWrapper).includes(fullIconClassName)
    ).toBe(true);
    expect(
      getIndeterminateIconClassNames(mountWrapper).includes(
        indeterminateIconClassName
      )
    ).toBe(true);
    expect(
      getCheckedIconClassNames(mountWrapper).includes(disableIconClassName)
    ).toBe(false);
    expect(getIconClassNames(mountWrapper).includes(disableIconClassName)).toBe(
      false
    );
  });

  it("should apply the correct icon when disabled", () => {
    const mountWrapper = mount(
      <HvProvider>
        <CheckBoxWithStyles disabled />
      </HvProvider>
    ).find(CheckBox);
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
      <HvProvider>
        <CheckBoxWithStyles
          label="test"
          labelPlacement={labelPositions.start}
        />
      </HvProvider>
    ).find(CheckBox);
    expect(
      getLabelPositionClassNames(mountWrapper).includes(labelStartClassName)
    ).toBe(true);
    expect(
      getLabelPositionClassNames(mountWrapper).includes(labelEndClassName)
    ).toBe(false);
  });

  it("should apply the correct class name when there is a label at the end", () => {
    const mountWrapper = mount(
      <HvProvider>
        <CheckBoxWithStyles label="test" labelPlacement={labelPositions.end} />
      </HvProvider>
    ).find(CheckBox);
    expect(
      getLabelPositionClassNames(mountWrapper).includes(labelStartClassName)
    ).toBe(false);
    expect(
      getLabelPositionClassNames(mountWrapper).includes(labelEndClassName)
    ).toBe(true);
  });

  it("should not apply any class name when there is no label specified", () => {
    const mountWrapper = mount(
      <HvProvider>
        <CheckBoxWithStyles labelPlacement={labelPositions.start} />
      </HvProvider>
    ).find(CheckBox);
    expect(
      getLabelPositionClassNames(mountWrapper).includes(labelStartClassName)
    ).toBe(false);
    expect(
      getLabelPositionClassNames(mountWrapper).includes(labelEndClassName)
    ).toBe(false);
  });
});

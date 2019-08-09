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

import RadioButtonUnSelected from "@hv/uikit-react-icons/dist/RadioButtonUnselected.S";

import RadioWithStyles from "../index";
import RadioButton from "../RadioButton";
import labelPositions from "../../labelPositions";
import HvProvider from "../../../Provider";
import theme from "../../../theme";

describe("RadioButton withStyles", () => {
  let wrapper;

  const getLabelPositionClassNames = ParentElement =>
    ParentElement.children()
      .children()
      .props().className;

  const labelStartClassName = "labelStart";
  const labelEndClassName = "labelEnd";

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <RadioWithStyles />
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
    const mountWrapper = mount(
      <HvProvider>
        <RadioWithStyles />
      </HvProvider>
    );
    const buttonComponent = mountWrapper.find(RadioButton);
    expect(buttonComponent.length).toBe(1);
  });

  it("should have an icon", () => {
    const mountWrapper = mount(
      <HvProvider>
        <RadioWithStyles />
      </HvProvider>
    );

    const component = mountWrapper.find(RadioButton);
    const componentHtml = component.html();

    expect(component.find(RadioButtonUnSelected).length).toBe(1);

    expect(
      componentHtml.includes(theme.hv.palette.atmosphere.atmo4)
    ).toBe(false);
    expect(
      componentHtml.includes(theme.hv.palette.atmosphere.atmo6)
    ).toBe(false);
  });

  it("should have an icon when disabled", () => {
    const mountWrapper = mount(
      <HvProvider>
        <RadioWithStyles disabled />
      </HvProvider>
    );

    const component = mountWrapper.find(RadioButton);
    const componentHtml = component.html();

    expect(component.find(RadioButtonUnSelected).length).toBe(1);

    expect(
      componentHtml.includes(theme.hv.palette.atmosphere.atmo4)
    ).toBe(true);
    expect(
      componentHtml.includes(theme.hv.palette.atmosphere.atmo6)
    ).toBe(true);
  });

  it("should apply the correct class name when there is a label at the start", () => {
    const mountWrapper = mount(
      <HvProvider>
        <RadioWithStyles label="test" labelPlacement={labelPositions.start} />
      </HvProvider>
    ).find(RadioButton);
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
        <RadioWithStyles label="test" labelPlacement={labelPositions.end} />
      </HvProvider>
    ).find(RadioButton);
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
        <RadioWithStyles labelPlacement={labelPositions.start} />
      </HvProvider>
    ).find(RadioButton);
    expect(
      getLabelPositionClassNames(mountWrapper).includes(labelStartClassName)
    ).toBe(false);
    expect(
      getLabelPositionClassNames(mountWrapper).includes(labelEndClassName)
    ).toBe(false);
  });
});

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

import React from "react";
import { mount, shallow } from "enzyme";
import { axe, toHaveNoViolations } from "jest-axe";
import HvProvider from "../../../Provider";
import VerticalContainerWithStyles from "../index";
import VerticalContainer from "../VerticalContainer";

expect.extend(toHaveNoViolations);

const Content = <div id="test_div" />;

const setupComponent = (props = {}) =>
  mount(
    <HvProvider>
      <VerticalContainerWithStyles id="test" {...props}>
        {Content}
      </VerticalContainerWithStyles>
    </HvProvider>
  );

describe("VerticalContainer withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <VerticalContainerWithStyles>{Content}</VerticalContainerWithStyles>
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("VerticalContainer", () => {
  it("should render only the anchor bar", () => {
    const wrapper = setupComponent();

    const VerticalComponent = wrapper.find(VerticalContainer);
    expect(VerticalComponent.length).toBe(1);
    const AnchorBarComponent = wrapper.find("#test-anchor-bar");
    expect(AnchorBarComponent.length).toBe(1);
    const containerComponent = wrapper.find("#test-container");
    expect(containerComponent.length).toBe(0);
  });

  it("should render the anchor bar with vertical container", () => {
    const wrapper = setupComponent({ isOpen: true });

    const AnchorBarComponent = wrapper.find("#test-anchor-bar");
    expect(AnchorBarComponent.length).toBe(1);
    const containerComponent = wrapper.find("#test-container");
    expect(containerComponent.length).toBe(1);
  });

  it("should open the vertical container when anchor hamburger clicked", () => {
    const wrapper = setupComponent();

    let containerComponent = wrapper.find("#test-container");
    expect(containerComponent.length).toBe(0);

    const button = wrapper.find("#test-hamburger-button");
    button.at(0).simulate("click");

    containerComponent = wrapper.find("#test-container");
    expect(containerComponent.length).toBe(1);
  });

  it("should close the vertical container when anchor hamburger clicked", () => {
    const wrapper = setupComponent();

    let containerComponent = wrapper.find("#test-container");
    expect(containerComponent.length).toBe(0);

    let button = wrapper.find("#test-hamburger-button");
    button.at(0).simulate("click");

    containerComponent = wrapper.find("#test-container");
    expect(containerComponent.length).toBe(1);

    button = wrapper.find("#test-hamburger-button");
    button.at(0).simulate("click");

    containerComponent = wrapper.find("#test-container");
    expect(containerComponent.length).toBe(0);
  });

  it("should close the vertical container when anchor hamburger clicked and it was render open", () => {
    const wrapper = setupComponent({ isOpen: true });

    let containerComponent = wrapper.find("#test-container");
    expect(containerComponent.length).toBe(1);

    const button = wrapper.find("#test-hamburger-button");
    button.at(0).simulate("click");

    containerComponent = wrapper.find("#test-container");
    expect(containerComponent.length).toBe(0);
  });

  it("shouldn't render the anchor bar or the vertical container", () => {
    const wrapper = setupComponent({ isAnchorBarVisible: false });

    const AnchorBarComponent = wrapper.find("#test-anchor-bar");
    expect(AnchorBarComponent.length).toBe(0);
    const containerComponent = wrapper.find("#test-container");
    expect(containerComponent.length).toBe(0);
  });

  it("should render only the vertical container", () => {
    const wrapper = setupComponent({ isAnchorBarVisible: false, isOpen: true });

    const AnchorBarComponent = wrapper.find("#test-anchor-bar");
    expect(AnchorBarComponent.length).toBe(0);
    const containerComponent = wrapper.find("#test-container");
    expect(containerComponent.length).toBe(1);
  });
});

describe("VerticalContainerA11Y", () => {
  let wrapper;

  it("default state", async () => {
    wrapper = setupComponent();
    const results = await axe(wrapper.html());

    expect(results).toHaveNoViolations();
  });

  it("with disabled and single", async () => {
    wrapper = setupComponent({
      isOpen: true
    });
    const results = await axe(wrapper.html());

    expect(results).toHaveNoViolations();
  });
});

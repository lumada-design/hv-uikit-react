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

import ButtonWithStyles from "../index";
import Button from "../Button";
import buttonTypes from "../buttonTypes";
import materialButtonConfiguration from "../materialButtonConfiguration"

describe("Button withStyles", () => {
  let wrapper;

  const getMaterialButtonProps = (ParentElement) => ParentElement.children().children().props();

  beforeEach(async () => {
    wrapper = shallow(<ButtonWithStyles>Click!</ButtonWithStyles>);
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the Button component", () => {
    const buttonComponent = wrapper.find(Button);
    expect(buttonComponent.length).toBe(1);
  });

  it("should correctly map the primary type to the material ui configurations", () => {
    const mountWrapper = mount(<ButtonWithStyles colorType={buttonTypes.primary}>Click!</ButtonWithStyles>);
    expect(getMaterialButtonProps(mountWrapper).color).toEqual(materialButtonConfiguration.color.primary);
    expect(getMaterialButtonProps(mountWrapper).variant).toEqual(materialButtonConfiguration.variant.contained);
  });

  it("should correctly map the secondary type to the material ui configurations", () => {
    const mountWrapper = mount(<ButtonWithStyles colorType={buttonTypes.secondary}>Click!</ButtonWithStyles>);
    expect(getMaterialButtonProps(mountWrapper).color).toEqual(materialButtonConfiguration.color.primary);
    expect(getMaterialButtonProps(mountWrapper).variant).toEqual(materialButtonConfiguration.variant.outlined);
  });

  it("should correctly map the link type to the material ui configurations", () => {
    const mountWrapper = mount(<ButtonWithStyles colorType={buttonTypes.link}>Click!</ButtonWithStyles>);
    expect(getMaterialButtonProps(mountWrapper).color).toEqual(materialButtonConfiguration.color.primary);
    expect(getMaterialButtonProps(mountWrapper).variant).toEqual(materialButtonConfiguration.variant.text);
  });
});

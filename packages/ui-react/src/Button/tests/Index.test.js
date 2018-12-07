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
import { shallow } from "enzyme";

import ButtonWithStyles from "..";
import Button from "../Button";

describe("Button withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(<ButtonWithStyles>Click!</ButtonWithStyles>);
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render Button component", () => {
    const buttonComponent = wrapper.find(Button);
    expect(buttonComponent.length).toBe(1);
  });
});

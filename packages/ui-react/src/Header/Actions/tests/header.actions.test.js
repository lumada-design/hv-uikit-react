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

import React from "react";
import { mount } from "enzyme";

import Actions from "../index";
import ActionsComponent from "../Actions";
import HvProvider from "../../../Provider";

describe("Actions withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(<HvProvider><Actions itemActions={[<span />, <span />]} /></HvProvider>);
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render Action component", () => {
    const actionsComponent = wrapper.find(ActionsComponent);
    expect(actionsComponent.length).toBe(1);
  });

  it("should render passed actions", () => {
    const divWithoutDropDown = wrapper.find("span");
    expect(divWithoutDropDown.length).toBe(2);
  });
});

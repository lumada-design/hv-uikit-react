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
import { shallow } from "enzyme";

import MainWithStyles from "..";
import Main from "../Main";

describe("Header withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(<MainWithStyles />);
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render Menu component", () => {
    const userComponent = wrapper.find(Main);
    expect(userComponent.length).toBe(1);
  });
});

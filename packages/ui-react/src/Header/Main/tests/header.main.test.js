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
import { shallow, mount } from "enzyme";

import Settings from "@hv-ui/icons/core/S-icons/Settings16";
import MainWithStyles from "../index";
import Main from "../Main";
import Brand from "../../Brand";
import Navigation from "../../Navigation";
import User from "../../User";
import Actions from "../../Actions";

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

  it("should render Main component", () => {
    const mainComponent = wrapper.find(Main);
    expect(mainComponent.length).toBe(1);
  });

  it("should render the internal component", () => {
    wrapper = mount(
      <MainWithStyles
        productText="Maintenance Insights"
        // Navigation
        navigationData={[{ label: "label", path: "path" }]}
        selected={0}
        // User
        userIcon="Text"
        // Actions
        itemActions={[<Settings />]}
      />
    );
    const brandComponent = wrapper.exists("Brand");
    const navigationComponent = wrapper.exists("Navigation");
    const userComponent = wrapper.exists("User");
    const actionsComponent = wrapper.exists("Actions");


    expect(brandComponent).toBeTruthy();
    expect(navigationComponent).toBeTruthy();
    expect(userComponent).toBeTruthy();
    expect(actionsComponent).toBeTruthy();
  });
});

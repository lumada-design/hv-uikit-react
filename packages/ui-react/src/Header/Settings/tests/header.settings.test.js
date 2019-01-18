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

import Settings from "../index";
import SettingsComponent from "../Settings";

describe("Settings withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <Settings
        userData={{ name: "UserName", role: "UserRole" }}
        settingsData={[
          {
            label: "Event Settings",
            path: "/settings",
            isActive: true
          }
        ]}
      />
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render Settings component", () => {
    const settingsComponent = wrapper.find(SettingsComponent);
    expect(settingsComponent.length).toBe(1);
  });

  it("Styles are injected correctly and mandatoruy properties too", () => {
    const settingsComponent = wrapper.find(SettingsComponent);
    const settingsComponentProps = settingsComponent.props();

    expect(settingsComponentProps.theme).toBeDefined();
    expect(settingsComponentProps.classes).toBeDefined();
    expect(settingsComponentProps.classes.settings).toBeDefined();
    expect(settingsComponentProps.classes.settingsButton).toBeDefined();
    expect(settingsComponentProps.classes.settingsIcon).toBeDefined();
    expect(settingsComponentProps.classes.dropdown).toBeDefined();
    expect(settingsComponentProps.classes.menuList).toBeDefined();
    expect(settingsComponentProps.classes.menuItem).toBeDefined();
  });

  it("should render dropdown properly", () => {
    const divWithoutDropDown = wrapper.find("div");
    expect(divWithoutDropDown.length).toBe(1);

    wrapper = mount(
      <Settings
        userData={{ name: "UserName", role: "UserRole" }}
        dropDown={true}
        settingsData={[
          {
            label: "Event Settings",
            path: "/settings",
            isActive: true
          }
        ]}
      />
    );
    const divWithDropdown = wrapper.find("div");
    expect(divWithDropdown.length).toBe(3);
    expect(divWithDropdown.at(2).props().children).toBe("Event Settings");
  });
});

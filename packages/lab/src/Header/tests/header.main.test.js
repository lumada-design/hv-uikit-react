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

import Settings from "@hv/uikit-react-icons/dist/Settings.S";
import HvProvider from "@hv/uikit-react-core/dist/Provider";
import MenuS from "@hv/uikit-react-icons/dist/Menu.S";
import MainWithStyles from "../index";

describe("Header withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(<HvProvider><MainWithStyles /></HvProvider>);
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the internal component", () => {
    wrapper = mount(
      <HvProvider>
        <MainWithStyles
          label="Maintenance Insights"
          // Navigation
          navigationData={[{ label: "label", path: "path" }]}
          labels={{}}
          selected={0}
          // User
          userIcon="Text"
          // Actions
          itemActions={[{action: <Settings />, label: "Settings"}]}
        />
      </HvProvider>
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

  it("should show vertical nav on menu click", () => {
    wrapper = mount(
      <HvProvider>
        <MainWithStyles
          label="Maintenance Insights"
          // Navigation
          navigationData={[{ label: "label", path: "path" }]}
          labels={{}}
          selected={0}
          // User
          userIcon="Text"
          // Actions
          itemActions={[{action: <Settings />, label: "Settings"}]}
        />
      </HvProvider>
    );

    expect(wrapper.html().includes("showNav")).toBe(false);
    wrapper.find(MenuS).simulate("click");
    expect(wrapper.html().includes("showNav")).toBe(true);
  });
});

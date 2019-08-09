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
import MainWithStyles from "../index";
import Main from "../Header";
import HvProvider from "../../Provider";

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
          itemActions={[<Settings />]}
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
});

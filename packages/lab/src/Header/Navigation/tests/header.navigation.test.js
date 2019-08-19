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

import HvProvider from "@hv/uikit-react-core/dist/Provider";
import NavigationWithStyles from "../index";
import Navigation from "../Navigation";

describe("Menu withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <NavigationWithStyles basePath="basePath" useRouter />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the Navigation component", () => {
    wrapper = mount(
      <HvProvider>
        <NavigationWithStyles basePath="basePath" useRouter />
      </HvProvider>
    );
    const userComponent = wrapper.find(Navigation);
    expect(userComponent.length).toBe(1);
  });

  it("should render the Navigation list component", () => {
    const userComponent = mount(
      <HvProvider>
        <NavigationWithStyles
          basePath="basePath"
          useRouter={false}
          navigationData={[
            {
              label: "Overview",
              path: "/"
            },
            {
              label: "events",
              path: "/events"
            }
          ]}
          selected={0}
        />
      </HvProvider>
    ).find("a");
    expect(userComponent.length).toBe(2);
  });

  it("shouldn't render anything in the Navigation", () => {
    const childComponents = mount(
      <HvProvider>
        <NavigationWithStyles
          basePath="basePath"
          useRouter={false}
          selected={0}
        />
      </HvProvider>
    )
      .find(Navigation)
      .children();

    expect(childComponents.length).toBe(0);
  });
});

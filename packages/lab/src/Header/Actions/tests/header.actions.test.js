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
import { mount } from "enzyme";

import HvProvider from "@hv/uikit-react-core/dist/Provider";
import Actions from "../index";
import ActionsComponent from "../Actions";

describe("Actions withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    const itemActions = [
      {
        action: <span />,
        label: "item1"
      },
      {
        action: <span />,
        label: "item2"
      }
    ]
    wrapper = mount(
      <HvProvider>
        <Actions itemActions={itemActions} />
      </HvProvider>
    );
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

  it("should render vertical styles", () => {
    const itemActions = [
      {
        action: <span />,
        label: "item1"
      },
      {
        action: <span />,
        label: "item2"
      }
    ]
    wrapper = mount(
      <HvProvider>
        <Actions verticalStyles itemActions={itemActions} />
      </HvProvider>
    );
    
    expect(wrapper.text().includes(itemActions[0].label)).toBe(true)
    expect(wrapper.text().includes(itemActions[1].label)).toBe(true)
  })
});

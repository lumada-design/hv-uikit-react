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

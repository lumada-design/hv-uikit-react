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
import Lock from "@hv/uikit-react-icons/dist/DawnTheme/Lock.S";
import Unlock from "@hv/uikit-react-icons/dist/DawnTheme/Unlock.S";
import HvProvider from "../../Provider";
import ToggleButton from "../index";

let wrapper;

describe("ToggleButton withStyles", () => {
  wrapper = mount(
    <HvProvider>
      <ToggleButton notSelectedIcon={Unlock} />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the unselected icon", () => {
    const iconElement = wrapper.find(Unlock);
    expect(iconElement.length).toBe(1);
  });

  it("should respond to select value", () => {
    wrapper = mount(
      <HvProvider>
        <ToggleButton notSelectedIcon={Unlock} selectedIcon={Lock} selected />
      </HvProvider>
    );

    const selectIcon = wrapper.find(Lock);
    expect(selectIcon.length).toBe(1);
  });

  it("should call onClick", () => {
    const onClickMock = jest.fn(() => "mock");

    wrapper = mount(
      <HvProvider>
        <ToggleButton
          notSelectedIcon={Unlock}
          selectedIcon={Lock}
          onClick={onClickMock}
        />
      </HvProvider>
    );

    wrapper.find("div").simulate("click");

    expect(onClickMock.mock.calls.length).toBe(1);
  });

  it("should set the default class if animated", () => {
    wrapper = mount(
      <HvProvider>
        <ToggleButton notSelectedIcon={Unlock} animated />
      </HvProvider>
    );

    const selectIcon = wrapper.find(Unlock);

    expect(selectIcon.hasClass("default")).toBe(true);
  });

  it("should toggle the classes if animated", () => {
    wrapper = mount(
      <HvProvider>
        <ToggleButton notSelectedIcon={Unlock} animated />
      </HvProvider>
    );

    wrapper.find("div").simulate("click");

    let selectIcon = wrapper.find(Unlock);

    expect(selectIcon.hasClass("selected")).toBe(true);

    wrapper.find("div").simulate("click");

    selectIcon = wrapper.find(Unlock);

    expect(selectIcon.hasClass("notSelected")).toBe(true);
  });
});

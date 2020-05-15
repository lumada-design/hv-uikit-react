/*
 * Copyright 2020 Hitachi Vantara Corporation
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
import { Play, Stop } from "@hv/uikit-react-icons/dist/Generic";
import HvProvider from "../../../Provider";
import Options, { Option } from "../index";

describe("Options", () => {
  let wrapper;

  it("should be able to render", () => {
    wrapper = mount(
      <HvProvider>
        <Options>
          <Option label="Action 1" icon={<Play />} />
          <Option label="Action 2" />
          <Option label="Action 3" icon={<Stop />} />
        </Options>
      </HvProvider>
    );

    expect(wrapper.find(Options).length).toBe(1);
    expect(wrapper.find(Options).length).toBe(1);
  });

  it("should propagate onClick into the Options", () => {
    const mockFn = jest.fn();

    wrapper = mount(
      <HvProvider>
        <Options onClick={mockFn}>
          <Option label="Action 1" id="a1" icon={<Play />} />
          <Option label="Action 2" id="a2" />
          <Option label="Action 3" id="a3" icon={<Stop />} />
        </Options>
      </HvProvider>
    );

    wrapper.find('div[id="a1"]').simulate("click");
    wrapper.find('div[id="a2"]').simulate("click");
    wrapper.find('div[id="a3"]').simulate("click");
    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  it("should call onClick with keypress from options", () => {
    const mockFn = jest.fn();

    wrapper = mount(
      <HvProvider>
        <Options onClick={mockFn}>
          <Option label="Action 1" id="a1" icon={<Play />} />
          <Option label="Action 2" id="a2" />
          <Option label="Action 3" id="a3" icon={<Stop />} />
        </Options>
      </HvProvider>
    );

    wrapper
      .find('div[id="a1"]')
      .simulate("keydown", { key: "Space", keyCode: 32 });
    wrapper.find('div[id="a2"]').simulate("keydown", { key: "F", keyCode: 70 });
    wrapper
      .find('div[id="a3"]')
      .simulate("keydown", { key: "Enter", keyCode: 13 });
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it("should call onClick with keypress", () => {
    const mockOnClick = jest.fn();

    wrapper = mount(
      <HvProvider>
        <Options>
          <Option id="a1" label="option1" onClick={mockOnClick} />
        </Options>
      </HvProvider>
    );

    const instance = wrapper.find(Option).find('div[id="a1"]');

    instance.simulate("keydown", { key: "Enter", keyCode: 13 });
    instance.simulate("keydown", { key: "Enter", keyCode: 13 });

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});

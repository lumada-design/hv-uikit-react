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

import React from "react";
import { mount, shallow } from "enzyme";
import AlertS from "@hv/uikit-react-icons/dist/DawnTheme/Alert.S";
import HvProvider from "../../Provider";
import Typography from "../../Typography";
import Badge from "../index";

describe("Badge ", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <HvProvider>
        <Badge count={0} />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render correctly with showCount", () => {
    wrapper = mount(
      <HvProvider>
        <Badge count={12} showCount />
      </HvProvider>
    );
    const divs = wrapper.find("div");

    expect(divs.at(1).text()).toEqual("12");
  });

  it("should render correctly with maxCount", () => {
    wrapper = mount(
      <HvProvider>
        <Badge count={100} showCount />
      </HvProvider>
    );
    const divs = wrapper.find("div");

    expect(divs.at(1).text()).toEqual("99+");
  });

  it("should render correctly with text", () => {
    wrapper = mount(
      <HvProvider>
        <Badge count={100} showCount text="hello" textVariant="sTitle" />
      </HvProvider>
    );
    const text = wrapper.find(Typography);

    expect(text.length).toEqual(1);

    const divs = wrapper.find("div");

    expect(divs.at(1).text()).toEqual("99+");
  });

  it("should render correctly with svg", () => {
    wrapper = mount(
      <HvProvider>
        <Badge count={100} showCount icon={<AlertS />} />
      </HvProvider>
    );
    const icon = wrapper.find(AlertS);

    expect(icon.length).toEqual(1);

    const divs = wrapper.find("div");

    expect(divs.at(1).text()).toEqual("99+");
  });
});

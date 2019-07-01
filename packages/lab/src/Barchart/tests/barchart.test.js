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
import BarchartControlWithStyles from "../index";
import BarchartControl from "../BarchartControl";

describe("Barchart withStyles", () => {
  let wrapper;

  const trace1 = {
    x: [2300, 1000, 8500],
    y: ["January", "February", "March"],
    name: "Sales Target",
    type: "bar",
    orientation: "h",
    hoverinfo: "none"
  };

  const data = [trace1];
  const layout = {};

  beforeEach(() => {
    wrapper = shallow(
      <HvProvider>
        <BarchartControlWithStyles data={data} layout={layout} />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the Barchart", () => {
    wrapper = mount(
      <HvProvider>
        <BarchartControlWithStyles data={data} layout={layout} />
      </HvProvider>
    );
    const barchart = wrapper.find(BarchartControl);
    expect(barchart.length).toBe(1);
  });
});

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
import Barchart from "../Barchart";
import Tooltip from "../Tooltip/index";
import SingleTooltip from "../Tooltip/SingleTooltip";
import MultiTooltip from "../Tooltip/MultiTooltip";

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

  it("should render the BarchartControl", () => {
    wrapper = mount(
      <HvProvider>
        <BarchartControlWithStyles data={data} layout={layout} />
      </HvProvider>
    );
    const barchartControl = wrapper.find(BarchartControl);
    expect(barchartControl.length).toBe(1);
  });

  // Barchart testing
  it("should render the Barchart", () => {
    wrapper = mount(
      <HvProvider>
        <BarchartControlWithStyles data={data} layout={layout} />
      </HvProvider>
    );
    const barchart = wrapper.find(Barchart);
    expect(barchart.length).toBe(1);
  });

  it("should render a title", () => {
    wrapper = mount(
      <HvProvider>
        <BarchartControlWithStyles
          data={data}
          layout={layout}
          title="This is a title"
        />
      </HvProvider>
    );
    const title = wrapper.find("h3");
    expect(title.length).toBe(1);
  });

  it("should render a subtitle", () => {
    wrapper = mount(
      <HvProvider>
        <BarchartControlWithStyles
          data={data}
          layout={layout}
          title="This is a title"
          subtitle="This is a subtitle"
        />
      </HvProvider>
    );
    const subTitle = wrapper.find("p");
    expect(subTitle.length).toBe(1);
  });
});

describe("Tooltip withStyles", () => {
  let wrapper;
  const data = {};
  const coordinates = {};

  beforeEach(() => {
    wrapper = shallow(
      <HvProvider>
        <Tooltip data={data} coordinates={coordinates} />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render a singleTooltip", () => {
    const coord = { x: 1, y: 2 };
    const singleData = { title: "title", elements: [{ value: 22 }] };

    wrapper = mount(
      <HvProvider>
        <Tooltip data={singleData} coordinates={coord} useSingle />
      </HvProvider>
    );

    const singleTooltip = wrapper.find(SingleTooltip);
    expect(singleTooltip.length).toBe(1);
  });

  it("should render a multiTooltip", () => {
    const coord = { x: 1, y: 2 };
    const singleData = { title: "title", elements: [{ name: "name" }] };

    wrapper = mount(
      <HvProvider>
        <Tooltip data={singleData} coordinates={coord} />
      </HvProvider>
    );

    const multiTooltip = wrapper.find(MultiTooltip);
    expect(multiTooltip.length).toBe(1);
  });
});

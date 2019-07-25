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

import HvProvider from "../../Provider";
import LinechartWithStyles from "../index";
import Linechart from "../Linechart";
import plotlyOverrides from "../plotlyOverrides";

describe("Linechart withStyles", () => {
  let wrapper;

  const trace1 = {
    x: [2300, 1000, 8500],
    y: ["January", "February", "March"],
    name: "Sales Target"
  };

  const data = [trace1];
  const layout = {};

  beforeEach(() => {
    wrapper = shallow(
      <HvProvider>
        <LinechartWithStyles data={data} layout={layout} />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the Linechart", () => {
    wrapper = mount(
      <HvProvider>
        <LinechartWithStyles data={data} layout={layout} />
      </HvProvider>
    );
    const linechart = wrapper.find(Linechart);
    expect(linechart.length).toBe(1);
  });

  it("should set default data for area", () => {
    const traceTest = {
      x: [2300, 1000, 8500],
      y: ["January", "February", "March"],
      name: "Sales Target"
    };

    const overwrittenData = plotlyOverrides.setData([traceTest], "area");
    expect(overwrittenData[0].mode).toBe("lines");
    expect(overwrittenData[0].hoverinfo).toBe("none");
    expect(overwrittenData[0].fill).toBe("tonexty");
    expect(overwrittenData[0].type).toBe("scatter");
  });

  it("should set default data for line", () => {
    const traceTest = {
      x: [2300, 1000, 8500],
      y: ["January", "February", "March"],
      name: "Sales Target"
    };
    const overwrittenData = plotlyOverrides.setData([traceTest], "line");
    expect(overwrittenData[0].mode).toBe("lines");
    expect(overwrittenData[0].hoverinfo).toBe("none");
    expect(overwrittenData[0].type).toBe("line");
  });

  it("should set default data for stack", () => {
    const traceTest = {
      x: [2300, 1000, 8500],
      y: ["January", "February", "March"],
      name: "Sales Target"
    };
    const overwrittenData = plotlyOverrides.setData([traceTest], "stack");
    expect(overwrittenData[0].mode).toBe("lines");
    expect(overwrittenData[0].hoverinfo).toBe("none");
    expect(overwrittenData[0].fill).toBe("tonexty");
    expect(overwrittenData[0].type).toBe("scatter");
    expect(overwrittenData[0].stackgroup).toBe("one");
  });

  it("shouldn't override existing data", () => {
    const traceTest = { hoverinfo: "xx" };
    const overwrittenData = plotlyOverrides.setData([traceTest]);
    expect(overwrittenData[0].hoverinfo).toBe("xx");
  });
});

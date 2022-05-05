/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { HvProvider } from "@hitachivantara/uikit-react-core";

import { HvLinechart } from "../..";
import { applyDataDefaults } from "../lineChartPlotlyOverrides";
import { Main } from "../stories/Linechart.stories";

describe("Linechart", () => {
  let wrapper;

  const trace1 = {
    x: [2300, 1000, 8500],
    y: ["January", "February", "March"],
    name: "Sales Target",
  };

  const data = [trace1];
  const layout = {};

  beforeEach(() => {
    wrapper = mount(
      <HvProvider>
        <Main />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvLinechart)).toMatchSnapshot();
  });

  it("should render the Linechart", () => {
    wrapper = mount(
      <HvProvider>
        <HvLinechart data={data} layout={layout} />
      </HvProvider>
    );
    const linechart = wrapper.find(HvLinechart);
    expect(linechart.length).toBe(1);
  });

  it("should set default data for area", () => {
    const traceTest = {
      x: [2300, 1000, 8500],
      y: ["January", "February", "March"],
      name: "Sales Target",
    };

    const overwrittenData = applyDataDefaults([traceTest], "area");
    expect(overwrittenData[0].mode).toBe("lines");
    expect(overwrittenData[0].hoverinfo).toBe("none");
    expect(overwrittenData[0].fill).toBe("tonexty");
    expect(overwrittenData[0].type).toBe("scatter");
  });

  it("should set default data for line", () => {
    const traceTest = {
      x: [2300, 1000, 8500],
      y: ["January", "February", "March"],
      name: "Sales Target",
    };
    const overwrittenData = applyDataDefaults([traceTest], "line");
    expect(overwrittenData[0].mode).toBe("lines");
    expect(overwrittenData[0].hoverinfo).toBe("none");
    expect(overwrittenData[0].type).toBe("line");
  });

  it("should set default data for stack", () => {
    const traceTest = {
      x: [2300, 1000, 8500],
      y: ["January", "February", "March"],
      name: "Sales Target",
    };
    const overwrittenData = applyDataDefaults([traceTest], "stack");
    expect(overwrittenData[0].mode).toBe("lines");
    expect(overwrittenData[0].hoverinfo).toBe("none");
    expect(overwrittenData[0].fill).toBe("tonexty");
    expect(overwrittenData[0].type).toBe("scatter");
    expect(overwrittenData[0].stackgroup).toBe("one");
  });

  it("shouldn't override existing data", () => {
    const traceTest = { hoverinfo: "xx" };
    const overwrittenData = applyDataDefaults([traceTest]);
    expect(overwrittenData[0].hoverinfo).toBe("xx");
  });
});

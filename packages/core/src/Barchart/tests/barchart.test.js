/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { HvBarchart, HvProvider } from "../..";
import { applyDataDefaults, applyLayoutDefaults } from "../barchartPlotlyOverrides";

import { Main } from "../stories/Barchart.stories";

const data = [
  {
    x: [2300, 1000, 8500],
    y: ["January", "February", "March"],
    name: "Sales Target",
  },
];
const layout = {};

describe("Barchart", () => {
  const wrapper = mount(
    <HvProvider>
      <Main />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvBarchart)).toMatchSnapshot();
  });

  it("should render the Barchart", () => {
    const barchart = wrapper.find(HvBarchart);
    expect(barchart.length).toBe(1);
  });

  it("should set default data", () => {
    const overwrittenData = applyDataDefaults(data);
    expect(overwrittenData[0].type).toBe("bar");
    expect(overwrittenData[0].hoverinfo).toBe("none");
  });

  it("shouldn't override existing data", () => {
    const traceTest = { type: "xx" };
    const overwrittenData = applyDataDefaults([traceTest]);
    expect(overwrittenData[0].type).toBe("xx");
    expect(overwrittenData[0].hoverinfo).toBe("none");
  });

  it("should set default layout", () => {
    const overwrittenLayout = applyLayoutDefaults(layout);
    expect(overwrittenLayout.bargap).toBe(0.25);
    expect(overwrittenLayout.bargroupgap).toBe(0.25);
  });
});

/* eslint-env jest */

import React from "react";
import { mount, shallow } from "enzyme";

import HvProvider from "../../Provider";
import Barchart from "..";
import { applyDataDefaults, applyLayoutDefaults } from "../barchartPlotlyOverrides";

describe("Barchart withStyles", () => {
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
        <Barchart data={data} layout={layout} />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(Barchart)).toMatchSnapshot();
  });

  it("should render the Barchart", () => {
    wrapper = mount(
      <HvProvider>
        <Barchart data={data} layout={layout} />
      </HvProvider>
    );
    const barchart = wrapper.find(Barchart);
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

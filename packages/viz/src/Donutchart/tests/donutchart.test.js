/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { HvProvider } from "@hitachivantara/uikit-react-core";

import { HvDonutchart } from "../..";
import { applyDataDefaults } from "../donutchartPlotlyOverrides";

import { Main, DonutChartThin } from "../stories/Donutchart.stories";

const data = [
  {
    values: [250, 800],
    labels: ["Uploads", "Downloads"],
    name: "Music",
  },
];

describe("Donuchart", () => {
  describe("Regular", () => {
    const wrapper = mount(
      <HvProvider>
        <Main />
      </HvProvider>
    );

    it("should be defined", () => {
      expect(wrapper).toBeDefined();
    });

    it("should render correctly", () => {
      expect(wrapper.find(HvDonutchart)).toMatchSnapshot();
    });

    it("should render the Donuchart", () => {
      const donutchart = wrapper.find(HvDonutchart);
      expect(donutchart.length).toBe(1);
    });

    it("should set default data", () => {
      const overwrittenData = applyDataDefaults(data);
      expect(overwrittenData[0].type).toBe("pie");
      expect(overwrittenData[0].hoverinfo).toBe("none");
      expect(overwrittenData[0].hole).toBe("0.76");
    });

    it("shouldn't override existing data", () => {
      const traceTest = { type: "xx" };
      const overwrittenData = applyDataDefaults([traceTest]);
      expect(overwrittenData[0].type).toBe("xx");
      expect(overwrittenData[0].hoverinfo).toBe("none");
    });
  });

  describe("Thin", () => {
    const wrapper = mount(
      <HvProvider>
        <DonutChartThin />
      </HvProvider>
    );

    it("should be defined", () => {
      expect(wrapper).toBeDefined();
    });

    it("should render correctly", () => {
      expect(wrapper.find(HvDonutchart)).toMatchSnapshot();
    });

    it("should render the Donuchart", () => {
      const donutchart = wrapper.find(HvDonutchart);
      expect(donutchart.length).toBe(1);
      expect(donutchart.prop("type")).toBe("thin");
    });
  });
});

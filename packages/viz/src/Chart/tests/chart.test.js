/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { HvProvider } from "@hitachivantara/uikit-react-core";

import Chart from "..";
import Plot from "../Plot";
import Tooltip from "../Tooltip";
import SingleTooltip from "../Tooltip/SingleTooltip";
import MultiTooltip from "../Tooltip/MultiTooltip";

describe("Chart withStyles", () => {
  let wrapper;

  const trace1 = {
    x: [2300, 1000, 8500],
    y: ["January", "February", "March"],
    name: "Sales Target",
    type: "bar",
    orientation: "h",
    hoverinfo: "none",
  };

  const data = [trace1];
  const layout = {};

  beforeEach(() => {
    wrapper = mount(
      <HvProvider>
        <Chart data={data} layout={layout} />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(Chart)).toMatchSnapshot();
  });

  it("should render the Chart", () => {
    wrapper = mount(
      <HvProvider>
        <Chart data={data} layout={layout} />
      </HvProvider>
    );
    const chart = wrapper.find(Chart);
    expect(chart.length).toBe(1);
  });

  it("should render the Plot", () => {
    wrapper = mount(
      <HvProvider>
        <Chart data={data} layout={layout} />
      </HvProvider>
    );
    const plot = wrapper.find(Plot);
    expect(plot.length).toBe(1);
  });
});

describe("Tooltip withStyles", () => {
  let wrapper;
  const data = { title: "" };
  const coordinates = { x: 0, y: 0 };

  beforeEach(() => {
    wrapper = mount(
      <HvProvider>
        <Tooltip data={data} coordinates={coordinates} />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(Tooltip)).toMatchSnapshot();
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
    const singleData = { title: "title", elements: [{ name: "name", value: 22 }] };

    wrapper = mount(
      <HvProvider>
        <Tooltip data={singleData} coordinates={coord} />
      </HvProvider>
    );

    const multiTooltip = wrapper.find(MultiTooltip);
    expect(multiTooltip.length).toBe(1);
  });
});

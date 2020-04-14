/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../Provider";
import Kpi from "..";

const labels = {
  title: "Avg. service time",
  indicator: "8.85",
  unit: "MS",
  comparisonIndicatorInfo: "vs last 24h."
};

describe("Kpi", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <Kpi labels={labels} />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(Kpi)).toMatchSnapshot();
  });

  it("should render the Kpi component", () => {
    const KpiComponent = wrapper.find(Kpi);
    expect(KpiComponent.length).toBe(1);
  });
});

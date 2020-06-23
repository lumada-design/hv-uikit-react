/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { HvKpi, HvProvider } from "../..";
import { Main } from "../stories/Kpi.stories";

describe("Kpi", () => {
  let wrapper;

  beforeEach(async () => {
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
    expect(wrapper.find(HvKpi)).toMatchSnapshot();
  });

  it("should render the Kpi component", () => {
    const KpiComponent = wrapper.find(HvKpi);
    expect(KpiComponent.length).toBe(1);
  });
});

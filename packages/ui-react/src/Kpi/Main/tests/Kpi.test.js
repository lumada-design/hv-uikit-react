/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import KpiWithStyles from "../..";
import Kpi from "../Kpi";
import HvProvider from "../../../Provider";

const KpiTextConfiguration = {
  title: "Avg. service time",
  indicator: "8.85",
  unit: "MS",
  comparisonIndicatorInfo: "vs last 24h."
};

describe("Kpi withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <KpiWithStyles kpiTextConfiguration={KpiTextConfiguration} />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the Kpi component", () => {
    const KpiComponent = wrapper.find(Kpi);
    expect(KpiComponent.length).toBe(1);
  });
});

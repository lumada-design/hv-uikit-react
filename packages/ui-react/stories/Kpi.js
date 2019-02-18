import React from "react";
import { storiesOf } from "@storybook/react";
import { HvKpi, HvShowCase, HvShowCaseHeader } from "../src";

const disabled = true;
const value = 1;
const key = 0;

const KpiTextConfiguration = {
    title: "Avg. service time",
    indicator: "8.85",
    unit: "MS",
    comparisonIndicatorInfo: "vs last 24h.",
    comparisonIndicator: "10%",
}

  storiesOf("Kpi", module).add("KPI", () => (
    <>
      <HvShowCaseHeader reviewed date="2018/Dec/28" />

      <HvShowCase title="Kpi">
        <HvKpi kpiTextConfiguration={KpiTextConfiguration} />
      </HvShowCase>
    </>
  ));

import React from "react";
import { storiesOf } from "@storybook/react";
import HvKpi from "@hv-ui/react/core/Kpi";

storiesOf("Core", module).add("KPI", () => <HvKpi />, {
  title: "KPI - Key Performance Indicator ",
  description:
    "an indicator component that shows a value and accept any component(an Icon for example) to show a visual cue on it's meaning",
  designSystemLink: "https://10.76.48.133/hv-design-system/hv-design-system-specs/tree/master",
  usage: "import HvKpi from '@hv-ui/react/core/Kpi'",
  examples: [
    {
        title: "Simple Kpi",
        description: "a demostration of the most basic functionality of the kpi component",
        src: "core/kpi/kpiSimple"
    },
    {
      title: "KPI: Average service time",
      description: "a demostration of a kpi showing the average service time",
      src: "core/kpi/kpiAverage"
    },
    {
        title: "KPI: Total IOPS",
        description: "a demostration of a kpi showing the total IOPS",
        src: "core/kpi/kpiIOPS"
    },
    {
        title: "KPI: Total Throughput",
        description: "a demostration of a kpi showing the total IOPS",
        src: "core/kpi/kpiThroughput"
    },
    {
        title: "KPI: Storage output Throughput",
        description: "a demostration of a kpi of the number of storage arrays",
        src: "core/kpi/kpiStorageArray"
    }
  ]
});

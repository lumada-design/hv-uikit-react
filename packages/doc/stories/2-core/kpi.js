/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import { storiesOf } from "@storybook/react";
import HvKpi from "@hv/uikit-react-core/Kpi";

storiesOf("Core", module).add("KPI", () => <HvKpi />, {
  title: "KPI - Key Performance Indicator ",
  description:
    "an indicator component that shows a value and accept any component(an Icon for example) to show a visual cue on it's meaning",
  designSystemLink: "https://10.76.48.133/hv-design-system/hv-design-system-specs/tree/master",
  usage: "import HvKpi from '@hv/uikit-react-core/Kpi'",
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

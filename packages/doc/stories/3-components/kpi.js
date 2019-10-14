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
import HvKpi from "@hv/uikit-react-core/dist/Kpi";

storiesOf("Components/Visualization", module).add("KPI", () => <HvKpi />, {
  title: "KPI - Key Performance Indicator ",
  description:
    "An indicator component that shows a value and accept any component(an Icon for example) to show a visual cue on it's meaning",
  usage: "import HvKpi from '@hv/uikit-react-core/dist/Kpi'",
  examples: [
    {
      title: "1. Simple",
      description: "One of the most basic functionality of the kpi component",
      src: "components/kpi/kpiSimple"
    },
    {
      title: "2. Average service time",
      description: "A kpi showing the average service time",
      src: "components/kpi/kpiAverage"
    },
    {
      title: "3. Total IOPS",
      description: "A kpi showing the total IOPS",
      src: "components/kpi/kpiIOPS"
    },
    {
      title: "4. Total Throughput",
      description: "A kpi showing the total IOPS",
      src: "components/kpi/kpiThroughput"
    },
    {
      title: "5. Storage output Throughput",
      description: "A kpi of the number of storage arrays",
      src: "components/kpi/kpiStorageArray"
    },
    {
      title: "6. Nodes",
      description: "A kpi of the number nodes",
      src: "components/kpi/kpiNodes"
    }
  ]
});

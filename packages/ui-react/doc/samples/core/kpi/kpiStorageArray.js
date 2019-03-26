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
import { Typography } from "@material-ui/core";
import IconInvalid from "@hv-ui/icons/core/S-icons/Level5Unsuccess16Color";
import HvKpi from "@hv-ui/react/core/Kpi";

const StorageArrayKpiTextConfiguration = {
  title: "# of Storage arrays",
  indicator: "27",
  unit: "",
  comparisonIndicatorInfo: "vs last 24h.",
  comparisonIndicator: "-5 units"
};

const StorageArrayComparisonVisual = () => (
  <div
    style={{
      position: "relative"
    }}
  >
    <Typography
      style={{
        position: "relative",
        fontSize: "14px",
        fontWeight: "600",
        paddingBottom: "2px"
      }}
    >
      {StorageArrayKpiTextConfiguration.comparisonIndicator}
    </Typography>
  </div>
);

const invalidIcon = () => <IconInvalid />;

export default (
  <HvKpi
    kpiTextConfiguration={StorageArrayKpiTextConfiguration}
    visualIndicator={invalidIcon()}
    visualComparison={StorageArrayComparisonVisual()}
  />
);

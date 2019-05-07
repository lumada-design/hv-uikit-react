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
import HvCard from "@hv/uikit-react-core/dist/Card";
import FailureIcon from "@hv/uikit-react-icons/dist/Level5.sema6.S";
import IconInvalid from "@hv/uikit-react-icons/dist/Level2.sema3.S";
import WarningIcon from "@hv/uikit-react-icons/dist/Level4.sema5.S";
import Icon from "@hv/uikit-react-icons/dist/Tool.S";
import HvKpi from "@hv/uikit-react-core/dist/Kpi";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const kpiStyles = theme => ({
  content: {
    padding: `0 ${theme.hv.spacing.sm}px 0 ${theme.hv.spacing.sm}px`
  },
  item: {
    padding: `0 0 ${theme.hv.spacing.sm}px 0`
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
});

const data = {
  firstTitle: "Related assets",
  firstContent: "Primary asset to be worked on, other asset, other asset",
  secondTitle: "Description",
  secondContent:
    "Shaft may be bent, check for bends. Straighten if possible and replace shaft if necessary."
};

const ThroughputKpiTextConfiguration = score => ({
  title: "Confidence score",
  indicator: `${score}%`
});

/* eslint react/prop-types: 0 */
const Content = ({ classes, value, icon }) => (
  <div>
    <HvKpi
      kpiTextConfiguration={ThroughputKpiTextConfiguration(value)}
      visualIndicator={icon}
    />
    <div>
      <div>
        <HvTypography variant="highlightText">{data.firstTitle}</HvTypography>
      </div>
      <div>
        <HvTypography variant="infoText" className={kpiStyles.text}>
          {data.firstContent}
        </HvTypography>
      </div>
    </div>
    <div style={{ marginTop: "15px" }}>
      <div>
        <HvTypography variant="highlightText">{data.secondTitle}</HvTypography>
      </div>
      <div>
        <HvTypography variant="infoText" className={kpiStyles.text}>
          {data.secondContent}
        </HvTypography>
      </div>
    </div>
  </div>
);

const ContentWithStyles = withStyles(kpiStyles, {
  withTheme: true
})(Content);

export default (
  <>
    <div
      style={{
        display: "flex",
        width: "1000px",
        justifyContent: "space-evenly"
      }}
    >
      <div style={{ width: "280px" }}>
        <HvCard
          icon={<Icon />}
          headerTitle="Replace contaminated oil"
          innerCardContent={
            <ContentWithStyles value="85" icon={<IconInvalid />} />
          }
          semantic="sema2"
          isSelectable
          checkboxValue="value"
          onChange={event => console.log(`my value is ${event.target.value}`)}
        />
      </div>
      <div style={{ width: "280px" }}>
        <HvCard
          icon={<Icon />}
          headerTitle="Replace contaminated oil"
          innerCardContent={
            <ContentWithStyles value="45" icon={<WarningIcon />} />
          }
          semantic="sema3"
          isSelectable
          checkboxValue="value"
          onChange={event => console.log(`my value is ${event.target.value}`)}
        />
      </div>
      <div style={{ width: "280px" }}>
        <HvCard
          icon={<Icon />}
          headerTitle="Replace contaminated oil"
          innerCardContent={
            <ContentWithStyles value="19" icon={<FailureIcon />} />
          }
          semantic="sema5"
          isSelectable
          checkboxValue="value"
          onChange={event => console.log(`my value is ${event.target.value}`)}
        />
      </div>
    </div>
  </>
);

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
import FailureIcon from "@hv/uikit-react-icons/dist/Level5.S";
import IconInvalid from "@hv/uikit-react-icons/dist/Level2.S";
import WarningIcon from "@hv/uikit-react-icons/dist/Level4.S";
import Icon from "@hv/uikit-react-icons/dist/Tool.S";
import HvKpi from "@hv/uikit-react-core/dist/Kpi";
import Typography from "@material-ui/core/Typography";
import theme from "@hv/uikit-common-themes/dist/theme";

const kpiStyles = theme => ({
  content: {
    padding: `0 ${theme.hv.spacing.sm}px 0 ${theme.hv.spacing.sm}px`
  },
  item: {
    padding: `0 0 ${theme.hv.spacing.sm}px 0`
  },
  label: {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.subtitle2
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.body1
  },
  highlightText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.h3
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
const Content = ({ value, icon }) => (
  <div>
    <HvKpi
      kpiTextConfiguration={ThroughputKpiTextConfiguration(value)}
      visualIndicator={icon}
    />
    <div>
      <Typography semantic="body1" className={kpiStyles.label}>
        {data.firstTitle}
      </Typography>
      <Typography semantic="body2" className={kpiStyles.text}>
        {data.firstContent}
      </Typography>
    </div>
    <div style={{ marginTop: "15px" }}>
      <Typography semantic="body1" className={kpiStyles.label}>
        {data.secondTitle}
      </Typography>
      <Typography semantic="body2" className={kpiStyles.text}>
        {data.secondContent}
      </Typography>
    </div>
  </div>
);

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
          Icon={<Icon />}
          HeaderTitle="Replace contaminated oil"
          InnerCardContent={<Content value="85" icon={<IconInvalid color={["none", theme.palette.semantic.sema3]} />} />}
          semantic="sema2"
          isSelectable
          checkboxValue="value"
          onSelect={event => console.log(`my value is ${event.target.value}`)}
        />
      </div>
      <div style={{ width: "280px" }}>
        <HvCard
          Icon={<Icon />}
          HeaderTitle="Replace contaminated oil"
          InnerCardContent={<Content value="45" icon={<WarningIcon color={["none", theme.palette.semantic.sema5]} />} />}
          semantic="sema3"
          isSelectable
          checkboxValue="value"
          onSelect={event => console.log(`my value is ${event.target.value}`)}
        />
      </div>
      <div style={{ width: "280px" }}>
        <HvCard
          Icon={<Icon />}
          HeaderTitle="Replace contaminated oil"
          InnerCardContent={<Content value="19" icon={<FailureIcon color={["none", theme.palette.semantic.sema6]} />} />}
          semantic="sema5"
          isSelectable
          checkboxValue="value"
          onSelect={event => console.log(`my value is ${event.target.value}`)}
        />
      </div>
    </div>
  </>
);

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
import Tooltip from "@hv/uikit-react-core/dist/Tooltip";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import withStyles from "@material-ui/core/styles/withStyles";


/* ******************************************************************************
*  ******************************************************************************
*  ******************************************************************************
*
*
*  IMPORTANT - To ensure conformity with the design specs for this component, import
*   the styling provided with the component
*
** ******************************************************************************
* *******************************************************************************
* ***************************************************************************** */
import tooltipStyling from "@hv/uikit-react-core/dist/Tooltip/styles";

const styling = {
  placeholder: {
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
    paddingTop: 170
  },
  container: {
    width: 100,
    color: "#414141"
  },
  typographyAligner: {
    textAlign: "center"
  }
};

const TooltipContent = ({ classes }) => (
  <>
    <div className={classes.valueWrapper}>
      {tooltipData.elements.map(element => (
        <div key={element.name} className={classes.values}>
          <HvTypography variant="labelText">{element.name}</HvTypography>
          <div className={classes.separator} />
          <HvTypography variant="sText">{element.value}</HvTypography>
        </div>
      ))}
    </div>
  </>
);

const TooltipContentWithStyles = withStyles(tooltipStyling, {
  withTheme: true
})(TooltipContent);


const TooltipControl = (() => {
  return (
    <div tabIndex="0" style={styling.cotainer}>
      <div style={styling.typographyAligner}>
        <HvTypography variant="normalText">Hover here</HvTypography>
      </div>
    </div>
  );
})();

const tooltipData = {
  elements: [
    {
      name: "Status",
      value: "Open"
    },
    {
      name: "Date",
      value: "12/08/2018"
    },
    {
      name: "Assignee",
      value: "Management"
    },
    {
      name: "Approval",
      value: "Not yet requested"
    }
  ]
};

export default (
  <div style={styling.placeholder}>
    <>
      <Tooltip
        tooltipData={<TooltipContentWithStyles />}
        useSingle={false}
        tooltipAnchor={TooltipControl}
      />
    </>
  </div>
);

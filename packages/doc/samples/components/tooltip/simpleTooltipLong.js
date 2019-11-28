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

const styling = {
  outerDiv:{
    width: 100,
    cursor: "pointer",
  },
  placeholder: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 90
  },
  typographyAligner:{
    textAlign: "center"
  }
};

const TooltipControl = (() => {
  return (
    <div tabIndex="0" style={styling.outerDiv}>
      <div style={styling.typographyAligner}>
        <HvTypography variant="normalText">Hover here</HvTypography>
      </div>
    </div>
  );
})();

const data = (() => {
  return (
    <HvTypography variant="infoText">Tooltips can showcase truncated text. The text should be concise and not redundant.</HvTypography>
  );
})()

export default (
  <div style={styling.placeholder}>
    <>
      <Tooltip tooltipData={data} tooltipAnchor={TooltipControl} />
    </>
  </div>
);

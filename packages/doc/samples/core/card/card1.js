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
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import compressor from "./resources/compressor.png";

const styles = theme => ({
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
  firstTitle: "ID",
  firstContent: "2101cad3-7cd4-1000-bdp95-d8c497176e7c",
  secondTitle: "Last connected",
  secondContent: "Aug 30, 2017 12:27:53 PM"
};

const SingleContent = ({ classes }) => (
  <div>
    <div>
      <div>
        <HvTypography variant="highlightText">{data.firstTitle}</HvTypography>
      </div>
      <div>
        <HvTypography variant="infoText" className={classes.text}>
          {data.firstContent}
        </HvTypography>
      </div>
    </div>
    <div style={{ marginTop: "15px" }}>
      <div>
        <HvTypography variant="highlightText">{data.secondTitle}</HvTypography>
      </div>
      <div>
        <HvTypography variant="infoText" className={classes.text}>
          {data.secondContent}
        </HvTypography>
      </div>
    </div>
  </div>
);

export default (
  <div style={{ width: "500px" }}>
    <HvCard
      headerTitle="Asset Avatar L90"
      subheader="Compressor"
      id="test"
      innerCardContent={<SingleContent classes={styles}/>}
      mediaPath={compressor}
      mediaHeight={186}
    />
  </div>
);

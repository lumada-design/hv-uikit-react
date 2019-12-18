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

/* eslint-disable */
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Fail from "@hv/uikit-react-icons/dist/Generic/Fail";
import HvEmptyState from "../../EmptyState";

const styles = {
  root: {
    width: "32px",
    height: "32px"
  }
};

const StyledFail = withStyles(styles, { withTheme: true })(Fail);

const NoData = ({ classes, noDataMessage = " No data to display." }) => (
  <div className={classes.root}>
    <HvEmptyState message={noDataMessage} icon={<StyledFail />} />
  </div>
);

export default NoData;

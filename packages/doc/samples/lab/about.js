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
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  title: {
    ...theme.hv.typography.mTitle,
    marginBottom: 20
  },
  block1: {
    width: 700,
    ...theme.hv.typography.sTitle,
    marginBottom: 30,
    fontSize: 16,
    lineHeight: "26px"
  },
  block2: {
    width: 700,
    ...theme.hv.typography.sTitle,
    marginBottom: 30,
    fontSize: 16,
    lineHeight: "26px"
  },
  block3: {
    margin: "5px 0 0 20px"
  },
  span: {
    ...theme.hv.typography.mTitle,
    marginBottom: 30,
    fontSize: 16
  }
});

const About = ({ classes, config }) => (
  <>
    <div className={classes.title}>About lab</div>
    <div className={classes.block1}>
      This package hosts the incubator components that are not yet ready to move to the core.
    </div>


  </>
);

export default withStyles(styles, { withTheme: true })(About);

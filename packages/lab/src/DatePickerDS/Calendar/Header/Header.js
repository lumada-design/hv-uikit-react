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
import PropTypes from "prop-types";
import HvTypography from "@hv/uikit-react-core/dist/Typography";

const Navigation = ({ classes, topText, mainText }) => (
  <div className={classes.root}>
    <div className={classes.headerDayOfWeek}>
      <HvTypography variant="normalText">{topText}</HvTypography>
    </div>
    <div className={classes.headerDate}>
      <HvTypography variant="mTitle">{mainText}</HvTypography>
    </div>
  </div>
);

Navigation.propTypes = {
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * The text to be shown on the top part of the header.
   */
  topText: PropTypes.string,
  /**
   * The text to be shown on the main part of the header.
   */
  mainText: PropTypes.string
};

Navigation.defaultProps = {
  topText: "n/a",
  mainText: "n/a"
};

export default Navigation;

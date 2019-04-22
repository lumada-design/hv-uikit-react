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

const HvEmptyState = props => {
  const { title, message, icon, classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.iconContainer}>{icon}</div>
        <div className={classes.textContainer}>
          <HvTypography variant="sTitle">{title}</HvTypography>
          <HvTypography variant="normalText" className={classes.message}>
            {message}
          </HvTypography>
        </div>
      </div>
    </div>
  );
};

HvEmptyState.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the empty state component.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * The title to be shown.
   */
  title: PropTypes.string.isRequired,
  /**
   * The message to be shown.
   */
  message: PropTypes.string.isRequired,
  /**
   *  Icon to be presented.
   */
  icon: PropTypes.element.isRequired
};

export default HvEmptyState;

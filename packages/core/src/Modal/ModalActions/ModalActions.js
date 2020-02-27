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
import { DialogActions, withStyles } from "@material-ui/core";
import styles from "./styles";

/**
 * Actions of the modal.
 *
 * @param classes
 * @param children
 * @param others
 * @returns {*}
 * @constructor
 */
const HvModalActions = ({ classes, className, children, ...others }) => (
  <DialogActions
    classes={{
      root: classes.root,
      spacing: classes.spacing
    }}
    className={className}
    {...others}
  >
    {children}
  </DialogActions>
);

HvModalActions.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root of the component (container for the actions).
     */
    root: PropTypes.string,
  }).isRequired,
  /**
   * Actions of the modal.
   */
  children: PropTypes.node.isRequired
};

HvModalActions.defaultProps = {
  className: ""
};

export default withStyles(styles, { name: "HvModalActions" })(HvModalActions);

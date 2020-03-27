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
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";
import HvButton from "../../Button";

const Actions = ({
  id,
  classes,
  onCancel,
  onApply,
  cancelLabel,
  applyLabel
}) => (
  <div id={id} className={classes.root}>
    <HvButton
      id={`${id}-apply`}
      className={classes.button}
      onClick={onApply}
      category="ghost"
    >
      {applyLabel}
    </HvButton>
    <HvButton
      id={`${id}-cancel`}
      className={classes.button}
      onClick={onCancel}
      category="ghost"
    >
      {cancelLabel}
    </HvButton>
  </div>
);

Actions.propTypes = {
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string.isRequired,
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * A function to be executed whenever cancel action is triggered.
   */
  onCancel: PropTypes.func,
  /**
   * A function to be executed whenever apply action is triggered.
   */
  onApply: PropTypes.func,
  /**
   * Label for cancel button
   */
  cancelLabel: PropTypes.string,
  /**
   * Label for apply button
   */
  applyLabel: PropTypes.string
};

Actions.defaultProps = {
  onCancel() {},
  onApply() {},
  cancelLabel: "Cancel",
  applyLabel: "Apply"
};

export default withStyles(styles, { name: "HvDropDownActions" })(Actions);

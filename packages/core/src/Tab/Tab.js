/*
 * Copyright 2020 Hitachi Vantara Corporation
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
import Tab from "@material-ui/core/Tab";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";

const HvTab = ({ classes, ...others }) => (
  <Tab
    classes={{
      root: classes.root,
      selected: classes.selected,
      labelContainer: classes.labelContainer,
      disabled: classes.disabled
    }}
    disableRipple
    disableTouchRipple
    {...others}
  />
);

HvTab.propTypes = {
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root element.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the label container element if `label` is provided.
     */
    labelContainer: PropTypes.string,
    /**
     * Styles applied to the root element if `selected={true}` (controlled by the Tabs component).
     */
    selected: PropTypes.string,
    /**
     * Styles applied to the root element if `disabled={true}` (controlled by the Tabs component).
     */
    disabled: PropTypes.string
  }).isRequired,
  /**
   * If `true`, the tab will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * The icon element.
   */
  icon: PropTypes.node,
  /**
   * The label element.
   */
  label: PropTypes.node
};

HvTab.defaultProps = {
  disabled: false,
  icon: null,
  label: null
};

export default withStyles(styles, { name: "HvTab" })(HvTab);

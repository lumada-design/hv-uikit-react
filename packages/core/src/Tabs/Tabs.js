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
import Tabs from "@material-ui/core/Tabs";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";

const HvTabs = ({ classes, ...others }) => (
  <Tabs
    classes={{
      root: classes.root,
      flexContainer: classes.flexContainer,
      indicator: classes.indicator,
      scroller: classes.scroller
    }}
    {...others}
    TabIndicatorProps={{ children: <div /> }}
  />
);

HvTabs.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root element.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the flex container element.
     */
    flexContainer: PropTypes.string,
    /**
     * Styles applied to the `TabIndicator` component.
     */
    indicator: PropTypes.string,
    /**
     * Styles applied to the `TabIndicator` component.
     */
    scroller: PropTypes.string,
  }).isRequired,
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback
   * @param {number} value We default to the index of the child
   */
  onChange: PropTypes.func,
  /**
   * 	The value of the currently selected Tab. If you don't want any selected Tab, you can set this property to `false`.
   */
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any
};

HvTabs.defaultProps = {
  children: null,
  onChange: undefined,
  value: undefined
};

export default withStyles(styles, { name: "HvTabs" })(HvTabs);

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
import Tooltip from "@material-ui/core/Tooltip";
import Fade from "@material-ui/core/Fade";

const HvTooltip = ({
  theme,
  classes,
  open,
  enterDelay,
  placement,
  useSingle,
  tooltipAnchor,
  tooltipData,
  TransitionComponent,
  TransitionProps,
  ...others
}) => (
  <Tooltip
    open={open}
    enterDelay={enterDelay}
    placement={placement}
    TransitionComponent={TransitionComponent}
    TransitionProps={TransitionProps}
    classes={{
      tooltip: useSingle ? classes.tooltip : classes.multitooltip,
      popper: classes.popper
    }}
    title={tooltipData}
    {...others}
  >
    {tooltipAnchor}
  </Tooltip>
);

HvTooltip.propTypes = {
  /**
   * The object created by material to apply to the component.
   */
  theme: PropTypes.instanceOf(Object),
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the tooltip root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the tooltip class
     *  */
    tooltip: PropTypes.string,
    /**
     * Styles applied to the title.
     */
    title: PropTypes.string,
    /**
     * Styles applied to the values container.
     */
    valuesContainer: PropTypes.string,
    /**
     * Styles applied to the values.
     */
    values: PropTypes.string,
    /**
     * Styles applied to the color.
     */
    color: PropTypes.string,
    /**
     * Styles applied to the separator between color and title.
     */
    separatorColor: PropTypes.string,
    /**
     * Styles applied to the separator.
     */
    separator: PropTypes.string,
    /**
     * Styles applied to the values wrapper.
     */
    valueWrapper: PropTypes.string
  }).isRequired,
  /**
   * Values to display in tooltip.
   */
  tooltipData: PropTypes.node,
  /**
   * If true, the tooltip is shown.
   */
  open: PropTypes.bool,
  /**
   * Tooltip placement.
   */
  placement: PropTypes.node,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This property won't impact the enter touch delay (enterTouchDelay).
   */
  enterDelay: PropTypes.number,
  /**
   * Component to attach to.
   */
  tooltipAnchor: PropTypes.node,
  /**
   * The component used for the transition
   */
  // eslint-disable-next-line react/forbid-prop-types
  TransitionComponent: PropTypes.any,
  /**
   * Properties applied to the Transition element.
   */
  // eslint-disable-next-line react/forbid-prop-types
  TransitionProps: PropTypes.object,
  /**
   * Defines if should use a single or multiline tooltip.
   */
  useSingle: PropTypes.bool
};

HvTooltip.defaultProps = {
  theme: null,
  open: null,
  enterDelay: 300,
  placement: "top",
  useSingle: true,
  tooltipData: null,
  tooltipAnchor: null,
  TransitionComponent: Fade,
  TransitionProps: {
    timeout: 400
  }
};

export default HvTooltip;

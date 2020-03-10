import React from "react";
import PropTypes from "prop-types";
import { Fade, Tooltip } from "@material-ui/core";
import isNil from "lodash/isNil";
import withStyles from "../styles/withStyles";
import styles from "./styles";

const HvTooltip = ({
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
    open={(!isNil(open) && open) || undefined}
    enterDelay={enterDelay}
    placement={placement}
    TransitionComponent={TransitionComponent}
    TransitionProps={TransitionProps}
    classes={{
      tooltip: useSingle ? classes.tooltip : classes.tooltipMulti,
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
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the tooltip root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the tooltip class when it is single
     *  */
    tooltip: PropTypes.string,
    /**
     * Styles applied to the tooltip class when it is multi
     *  */
    tooltipMulti: PropTypes.string,
    /**
     * Styles applied to the popper component
     *  */
    popper: PropTypes.string,
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

export default withStyles(styles, { name: "HvTooltip" })(HvTooltip);

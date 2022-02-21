import React from "react";
import PropTypes from "prop-types";
import { Fade, Tooltip, withStyles } from "@material-ui/core";
import styles from "./styles";

/**
 * Tooltips display informative text when users hover over, focus on, or tap an element.
 */

const HvTooltip = React.forwardRef((props, ref) => {
  const {
    className,
    classes,
    open,
    enterDelay = 300,
    placement = "top",
    useSingle = true,
    children,
    title,
    TransitionComponent = Fade,
    TransitionProps = { timeout: 400 },
    ...others
  } = props;

  return (
    <Tooltip
      ref={ref}
      open={open ?? undefined}
      enterDelay={enterDelay}
      placement={placement}
      TransitionComponent={TransitionComponent}
      TransitionProps={TransitionProps}
      className={className}
      classes={{
        tooltip: useSingle ? classes.tooltip : classes.tooltipMulti,
        popper: classes.popper,
      }}
      title={title}
      {...others}
    >
      {children}
    </Tooltip>
  );
});

HvTooltip.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
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
    valueWrapper: PropTypes.string,
  }).isRequired,
  /**
   * If true, the tooltip is shown.
   */
  open: PropTypes.bool,
  /**
   * Tooltip placement.
   */
  placement: PropTypes.oneOf([
    "bottom-end",
    "bottom-start",
    "bottom",
    "left-end",
    "left-start",
    "left",
    "right-end",
    "right-start",
    "right",
    "top-end",
    "top-start",
    "top",
  ]),
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This property won't impact the enter touch delay (enterTouchDelay).
   */
  enterDelay: PropTypes.number,
  /**
   * Tooltip title. Zero-length titles string are never displayed.
   */
  title: PropTypes.node.isRequired,
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
  useSingle: PropTypes.bool,
  /**
   * Node to apply the tooltip.
   */
  children: PropTypes.node.isRequired,
};

export default withStyles(styles, { name: "HvTooltip" })(HvTooltip);

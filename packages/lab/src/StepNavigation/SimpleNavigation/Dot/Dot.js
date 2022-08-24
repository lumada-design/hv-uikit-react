import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { HvButton } from "@hitachivantara/uikit-react-core";
import { withStyles, makeStyles } from "@mui/styles";

import { defaultColor, disabledColor, dotSizes } from "../utils";
import styles from "./styles";

/**
 * Step element of "Simple" Step Navigation root component
 */
const HvDot = ({ classes, className, state, title, size, onClick }) => {
  const dotSize = dotSizes[size] * (state === "Current" ? 1.5 : 1);
  const getBackgroundColor = useCallback(
    (theme) => (state === "Disabled" ? disabledColor(theme) : defaultColor(theme)),
    [state]
  );
  const customClasses = useMemo(
    () =>
      makeStyles((theme) => {
        const backgroundColor = getBackgroundColor(theme);
        return {
          ghostDisabled: {},
          active: {},
          ghost: {
            ...styles.ghost,
            width: dotSize,
            height: dotSize,
            backgroundColor,
            "&:hover": {
              backgroundColor,
            },
            "&$ghostDisabled": {
              ...styles.ghost["&$ghostDisabled"],
              backgroundColor,
            },
            "&$ghostDisabled&:hover": {
              ...styles.ghost["&$ghostDisabled&:hover"],
              backgroundColor,
            },
          },
        };
      }),
    [dotSize, getBackgroundColor]
  )();
  return (
    <HvButton
      className={clsx(
        classes.root,
        customClasses.ghost,
        {
          [customClasses.active]: state === "Current",
          [customClasses.ghostDisabled]: ["Current", "Disabled"].includes(state),
        },
        className
      )}
      aria-label={`step-${title}`}
      icon
      overrideIconColors={false}
      disabled={["Current", "Disabled"].includes(state)}
      onClick={onClick}
    >
      {[]}
    </HvButton>
  );
};

HvDot.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the active class.
     */
    active: PropTypes.string,
    /**
     * Styles applied to the ghost class.
     */
    ghost: PropTypes.string,
    /**
     * Styles applied to the ghostDisabled class.
     */
    ghostDisabled: PropTypes.string,
  }).isRequired,
  /**
   * State of the step. Values = {"Pending", "Failed", "Completed", "Current", "Disabled"}
   */
  state: PropTypes.oneOf(["Pending", "Failed", "Completed", "Current", "Disabled"]).isRequired,
  /**
   * Title of the step.
   */
  title: PropTypes.string.isRequired,
  /**
   * Sets one of the standard sizes of the steps
   */
  size: PropTypes.oneOf(["XS", "SM", "MD", "LG", "XL"]).isRequired,
  /**
   * Event onClick of the step.
   */
  onClick: PropTypes.func,
};

export default withStyles(styles, { name: "HvDot" })(HvDot);

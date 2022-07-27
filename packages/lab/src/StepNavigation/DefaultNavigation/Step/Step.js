import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles } from "@material-ui/core";

import { Level0Good, Level3Bad, HourGlass } from "@hitachivantara/uikit-react-icons";
import { HvAvatar, HvButton } from "@hitachivantara/uikit-react-core";

import { getColor } from "../utils";
import styles from "./styles";

/**
 * Step element of "Default" Step Navigation root component
 */
const HvStep = ({
  className,
  classes,
  state,
  title,
  onClick,
  disabled,
  size = "SM",
  number = 1,
}) => {
  const iconSize = {
    XS: "XS",
    SM: "XS",
    MD: "S",
    LG: "M",
    XL: "M",
  }[size];

  const squareL = {
    Pending: 16,
    Failed: 24,
    Completed: 24,
  }[state];

  const svgSize = {
    XS: squareL - 8,
    SM: squareL,
    MD: squareL + 8,
    LG: squareL + 16,
    XL: squareL + 24,
  }[size];

  const backgroundColor = getColor(state);

  const color = state === "Pending" ? "atmo2" : undefined;

  const semantic = state !== "Pending" ? backgroundColor : undefined;

  const status = state === "Current" ? "atmo5" : undefined;

  const IconComponent = {
    Pending: HourGlass,
    Failed: Level3Bad,
    Completed: Level0Good,
  }[state];

  return (
    <div
      className={clsx(className, classes.root, { [classes["not-current"]]: state !== "Current" })}
    >
      <HvButton
        className={clsx(classes.ghost, { [classes.ghostDisabled]: state === "Current" })}
        aria-label={`step-${title}`}
        icon
        overrideIconColors={false}
        disabled={disabled ?? ["Current", "Disabled"].includes(state)}
        onClick={onClick}
      >
        <HvAvatar
          className={clsx(classes.avatar, classes[size])}
          backgroundColor={backgroundColor}
          status={status}
          size={size}
        >
          {IconComponent ? (
            <IconComponent
              color={color}
              semantic={semantic}
              width={svgSize}
              height={svgSize}
              iconSize={iconSize}
            />
          ) : (
            number
          )}
        </HvAvatar>
      </HvButton>
    </div>
  );
};

HvStep.propTypes = {
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
     * Styles applied to the ghost class.
     */
    ghost: PropTypes.string,
    /**
     * Styles applied to the ghostDisabled class.
     */
    ghostDisabled: PropTypes.string,
    /**
     * Styles applied to the root element when step is not in "current" state.
     */
    "not-current": PropTypes.string,
    /**
     * Styles applied to the root element when size is XS.
     */
    XS: PropTypes.string,
    /**
     * Styles applied to the root element when size is SM.
     */
    SM: PropTypes.string,
    /**
     * Styles applied to the root element when size is MD.
     */
    MD: PropTypes.string,
    /**
     * Styles applied to the root element when size is LG.
     */
    LG: PropTypes.string,
    /**
     * Styles applied to the root element when size is XL.
     */
    XL: PropTypes.string,
    /**
     * Styles applied to the avatar element.
     */
    avatar: PropTypes.string,
    /**
     * Styles applied to the title of a step element.
     */
    stepTitle: PropTypes.string,
  }).isRequired,
  /**
   * Sets one of the standard sizes of the step
   */
  size: PropTypes.oneOf(["XS", "SM", "MD", "LG", "XL"]),
  /**
   * State of the step. Values = {"Pending", "Failed", "Completed", "Current", "Disabled"}
   */
  state: PropTypes.oneOf(["Pending", "Failed", "Completed", "Current", "Disabled"]).isRequired,
  /**
   * Title of the step.
   */
  title: PropTypes.string.isRequired,
  /**
   * Number of the step.
   */
  number: PropTypes.number,
  /**
   * Event onClick of the step.
   */
  onClick: PropTypes.func,
  /**
   * Define if a step is disabled/enabled.
   * If this property is not defined and the step is on state "Disabled", the step component will be disabled
   */
  disabled: PropTypes.bool,
};

export default withStyles(styles, { name: "HvStep" })(HvStep);

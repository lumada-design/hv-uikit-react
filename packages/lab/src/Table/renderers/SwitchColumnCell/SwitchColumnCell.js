import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

import { HvBaseSwitch, HvTypography } from "@hitachivantara/uikit-react-core";

import useStyles from "./styles";

const HvSwitchColumnCell = ({
  checked,
  value,
  switchLabel,
  falseLabel,
  trueLabel,
  switchProps,
}) => {
  const classes = useStyles();

  return (
    <>
      {falseLabel != null && (
        <HvTypography
          aria-hidden="true"
          variant="normalText"
          className={clsx(classes.switchProperties, classes.switchNo)}
        >
          {falseLabel}
        </HvTypography>
      )}
      <HvBaseSwitch aria-label={switchLabel} checked={checked} value={value} {...switchProps} />
      {trueLabel != null && (
        <HvTypography
          aria-hidden="true"
          variant="normalText"
          className={clsx(classes.switchProperties, classes.switchYes)}
        >
          {trueLabel}
        </HvTypography>
      )}
    </>
  );
};

HvSwitchColumnCell.propTypes = {
  /**
   * Whether the switch is checked or not.
   */
  checked: PropTypes.bool,
  /**
   * The value of the switch.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The switch label.
   */
  switchLabel: PropTypes.string,
  /**
   * The right switch label.
   */
  falseLabel: PropTypes.string,
  /**
   * The left switch label.
   */
  trueLabel: PropTypes.string,
  /**
   * Extra props to be passed to the switch.
   */
  switchProps: PropTypes.instanceOf(Object),
  /**
   * The timezone used to format the date.
   */
  color: PropTypes.oneOf(["primary", "secondary"]),
};

export default HvSwitchColumnCell;

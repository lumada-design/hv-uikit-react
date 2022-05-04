import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@mui/styles";
import styles from "./styles";
import { HvButton, HvTypography } from "../..";

const Action = ({ classes, className, id, label, icon, onClick, ...others }) => {
  const payload = { id, label };

  const handleClick = (event) => {
    onClick?.(event, payload);
  };

  return (
    <HvButton
      id={id}
      category="ghost"
      className={clsx(className, classes.root)}
      startIcon={icon}
      onClick={handleClick}
      {...others}
    >
      <HvTypography variant="normalText">{label}</HvTypography>
    </HvButton>
  );
};

Action.propTypes = {
  /**
   * Id to be applied to the action.
   */
  id: PropTypes.string,
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied to the component.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the component.
     */
    root: PropTypes.string,
  }).isRequired,
  /**
   * Visual label.
   */
  label: PropTypes.string,
  /**
   * Icon.
   */
  icon: PropTypes.node,
  /**
   * Callback called when clicked.
   */
  onClick: PropTypes.func,
};

export default withStyles(styles, { name: "HvUserPreferencesAction" })(Action);

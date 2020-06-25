import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { isKeypress, KeyboardCodes } from "../../utils";
import styles from "./styles";
import { HvButton } from "../..";

const Action = ({ classes, className, id, label, icon, onClick, ...others }) => {
  const payload = { id, label };

  const handleKeyDown = useCallback(
    event => {
      if (!isKeypress(event, KeyboardCodes.Enter) && !isKeypress(event, KeyboardCodes.SpaceBar)) {
        return;
      }
      onClick?.(event, payload);
    },
    [onClick, payload]
  );

  const handleClick = event => {
    onClick?.(event, payload);
  };

  const renderedIcon = useMemo(
    () =>
      icon &&
      React.cloneElement(icon, {
        boxStyles: { width: "32px", height: "32px" }
      }),
    [icon]
  );

  return (
    <HvButton
      id={id}
      category="ghost"
      className={clsx(className, classes.action, {
        [classes.noIcon]: !icon
      })}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      {...others}
    >
      {renderedIcon}
      {label}
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
    action: PropTypes.string,
    /**
     * Style applied when no icon is present.
     */
    noIcon: PropTypes.string
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
  onClick: PropTypes.func
};

export default withStyles(styles, { name: "HvUserPreferencesAction" })(Action);

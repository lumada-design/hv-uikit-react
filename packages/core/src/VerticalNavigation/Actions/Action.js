import React, { useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@mui/styles";
import { KeyboardCodes, isKeypress } from "../../utils/KeyboardUtils";
import HvTypography from "../../Typography";
import { setId } from "../../utils";
import styles from "./styles";

const Action = ({ className, classes, id, label = "", icon, onClick, ...others }) => {
  const handleKeyDown = useCallback(
    (event) => {
      if (
        onClick == null ||
        (!isKeypress(event, KeyboardCodes.Enter) && !isKeypress(event, KeyboardCodes.SpaceBar))
      ) {
        return;
      }

      onClick(event);
    },
    [onClick]
  );

  return (
    <HvTypography
      id={setId(id, "button")}
      component="div"
      role="button"
      className={clsx(className, classes.action, { [classes.noIcon]: !icon })}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={onClick}
      {...others}
    >
      {icon}
      {label}
    </HvTypography>
  );
};

Action.propTypes = {
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
    noIcon: PropTypes.string,
  }).isRequired,
  /**
   * Id to be applied to the action.
   */
  id: PropTypes.string,
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

export default withStyles(styles, { name: "HvVerticalNavigationAction" })(Action);

import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import withStyles from "../../styles/withStyles";
import { KeyboardCodes, isKeypress } from "../../utils/KeyboardUtils";
import useUniqueId from "../../useUniqueId";
import HvTypography from "../../Typography";
import styles from "./styles";

const Action = ({ theme, classes, id, label, icon, onClick, ...others }) => {
  const internalId = useUniqueId(id, "hv-verticalnavigation-action-");

  const handleKeyDown = useCallback(
    event => {
      if (
        onClick == null ||
        (!isKeypress(event, KeyboardCodes.Enter) &&
          !isKeypress(event, KeyboardCodes.SpaceBar))
      ) {
        return;
      }

      onClick(event);
    },
    [onClick]
  );

  const renderedIcon = useMemo(
    () =>
      icon &&
      React.cloneElement(icon, {
        boxStyles: { width: "32px", height: "32px" }
      }),
    [icon]
  );

  return (
    <HvTypography
      id={`${internalId}-button`}
      component="div"
      variant="normalText"
      role="button"
      className={clsx(classes.action, { [classes.noIcon]: !icon })}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={onClick}
      {...others}
    >
      {renderedIcon}
      {label}
    </HvTypography>
  );
};

Action.propTypes = {
  /**
   * The theme passed by the provider.
   */
  theme: PropTypes.instanceOf(Object),
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
  onClick: PropTypes.func
};

Action.defaultProps = {
  theme: undefined,
  id: undefined,
  label: "",
  icon: undefined,
  onClick: undefined
};

export default withStyles(styles, { name: "HvVerticalNavigationAction" })(
  Action
);

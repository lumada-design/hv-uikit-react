import React, { useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { isKeypress, KeyboardCodes } from "../../utils";
import styles from "./styles";
import HvTypography from "../../Typography";
import WithId from "../../withId";
import OptionsContext from "./OptionsContext";

const Option = ({ classes, id, className, label, icon, onClick, ...others }) => {
  const optionsContext = useContext(OptionsContext);

  const isSelected = id === optionsContext.selected;

  const handleClick = event => {
    if (!isSelected) {
      const payload = {
        id,
        label
      };
      optionsContext.onSelection(event, payload);
      onClick?.(event, payload);
    }
  };

  const handleKeyDown = event => {
    if (!isKeypress(event, KeyboardCodes.Enter) && !isKeypress(event, KeyboardCodes.SpaceBar)) {
      return;
    }

    handleClick(event);
  };

  return (
    <li className={classes.li}>
      <HvTypography
        id={id}
        component="div"
        variant={isSelected ? "selectedText" : "normalText"}
        role="button"
        className={clsx(className, classes.action, {
          [classes.noIcon]: !icon,
          [classes.selected]: isSelected
        })}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        {...others}
      >
        {icon}
        {label}
      </HvTypography>
    </li>
  );
};

Option.propTypes = {
  /**
   * Id to be applied to the option.
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
    noIcon: PropTypes.string,
    /**
     * Style applied to the `li`.
     */
    li: PropTypes.string,
    /**
     * Style applied when selected.
     */
    selected: PropTypes.string
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

export default withStyles(styles, { name: "HvUserPreferencesOption" })(WithId(Option));

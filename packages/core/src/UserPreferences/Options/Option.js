import React, { useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@mui/styles";
import styles from "./styles";
import { HvButton, HvTypography } from "../..";
import WithId from "../../withId";
import OptionsContext from "./OptionsContext";

const Option = ({ classes, id, className, label, icon, onClick, ...others }) => {
  const { selected, onSelection } = useContext(OptionsContext);

  const isSelected = id === selected;

  const handleClick = (event) => {
    if (isSelected) return;
    const payload = { id, label };

    onSelection?.(event, payload);
    onClick?.(event, payload);
  };

  return (
    <li className={classes.li}>
      <HvButton
        id={id}
        category="ghost"
        className={clsx(className, classes.action, {
          [classes.selected]: isSelected,
        })}
        onClick={handleClick}
        startIcon={icon}
        {...others}
      >
        <HvTypography>{label}</HvTypography>
      </HvButton>
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
    selected: PropTypes.string,
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

export default withStyles(styles, { name: "HvUserPreferencesOption" })(WithId(Option));

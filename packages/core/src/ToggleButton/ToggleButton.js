import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";

import { HvButton } from "..";
import { useControlled } from "../utils";

import styles from "./styles";

/**
 * A two-state button that can be either off (not pressed) or on (pressed).
 * Wraps the Button component, but adds the aria-pressed attribute.
 *
 * Use when two instances are opposite and the on/off analogy doesn’t apply (Ex: Locked / Unlocked).
 * Only well known icons should be used, otherwise use a single checkbox for the same situation.
 */

const ToggleButton = React.forwardRef((props, ref) => {
  const {
    defaultSelected,
    selected,
    notSelectedIcon,
    selectedIcon = null,
    onClick,
    children,
    ...others
  } = props;
  const [isSelected, setIsSelected] = useControlled(selected, Boolean(defaultSelected));

  const onClickHandler = (e) => {
    setIsSelected(!isSelected);
    onClick?.(e, !isSelected);
  };

  return (
    <HvButton ref={ref} icon aria-pressed={isSelected} onClick={onClickHandler} {...others}>
      {children || (!isSelected ? notSelectedIcon : selectedIcon)}
    </HvButton>
  );
});

ToggleButton.propTypes = {
  /**
   * When uncontrolled, defines the initial selected state.
   */
  defaultSelected: PropTypes.bool,
  /**
   * Defines if the button is selected.
   * When defined the button state becomes controlled.
   */
  selected: PropTypes.bool,
  /**
   * Icon for when not selected. Ignored if the component has children.
   */
  notSelectedIcon: PropTypes.node,
  /**
   * Icon for when selected. Ignored if the component has children.
   */
  selectedIcon: PropTypes.node,
  /**
   * Function called when icon is clicked.
   */
  onClick: PropTypes.func,
  /**
   * The content of the button.
   * When provided, it is its own responsibility to react to the selected state.
   */
  children: PropTypes.node,
};

export default withStyles(styles, { name: "HvToggleButton" })(ToggleButton);

import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";
import { withStyles } from "@material-ui/core";

import { HvTooltip, HvTypography } from "..";
import Focus from "../Focus";

import { useLabels, useControlled } from "../utils";

import styles from "./styles";

const DEFAULT_LABELS = { selectedTitle: "", notSelectedTitle: "" };

/**
 * A two-state button that can be either off (not pressed) or on (pressed).
 *
 * Use when two instances are opposite and the on/off analogy doesn’t apply (Ex: Locked / Unlocked).
 * Only well known icons should be used, otherwise use a single checkbox for the same situation.
 */
const ToggleButton = ({
  classes,
  className,
  id,
  defaultSelected,
  selected,
  labels: labelsProp,
  notSelectedIcon,
  selectedIcon = null,
  onClick,
  disabled = false,
  children,
  ...others
}) => {
  const labels = useLabels(DEFAULT_LABELS, labelsProp);
  const [isSelected, setIsSelected] = useControlled(selected, Boolean(defaultSelected));

  const content = children || (!isSelected ? notSelectedIcon : selectedIcon);

  const title = isSelected
    ? labels.selectedTitle && <HvTypography>{labels.selectedTitle}</HvTypography>
    : labels.notSelectedTitle && <HvTypography>{labels.notSelectedTitle}</HvTypography>;

  const onClickHandler = (e) => {
    if (disabled) return;

    // this call does nothing unless the button state is uncontrolled
    setIsSelected(!isSelected);

    onClick?.(e, !isSelected);
  };

  return (
    <Focus disabledClass={disabled || undefined} classes={{ focus: classes.focus }}>
      <HvTooltip disableFocusListener disableTouchListener title={title}>
        <button
          id={id}
          className={clsx(className, classes.root, {
            [classes.disabled]: disabled,
          })}
          type="button"
          disabled={disabled}
          aria-pressed={isSelected}
          onClick={onClickHandler}
          {...others}
        >
          {content}
        </button>
      </HvTooltip>
    </Focus>
  );
};

ToggleButton.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied to the component.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root node.
     */
    root: PropTypes.string,
    /**
     * Style applied when the button is disabled.
     */
    disabled: PropTypes.string,
    /**
     * Styles applied when the button is focused.
     */
    focus: PropTypes.string,
  }).isRequired,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
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
   * An object containing the labels for the toggle button.
   */
  labels: PropTypes.shape({
    /**
     * Description for selected.
     */
    selectedTitle: PropTypes.string,
    /**
     * Description for not selected.
     */
    notSelectedTitle: PropTypes.string,
  }),
  /**
   * Function called when icon is clicked.
   */
  onClick: PropTypes.func,
  /**
   * Denotes if button is active or not.
   */
  disabled: PropTypes.bool,
  /**
   * The content of the button.
   * When provided, it is its own responsibility to react to the selected state.
   */
  children: PropTypes.node,
};

export default withStyles(styles, { name: "HvToggleButton" })(ToggleButton);

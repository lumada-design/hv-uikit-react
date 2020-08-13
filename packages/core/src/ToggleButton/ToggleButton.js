import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import withTooltip from "../withTooltip";
import withLabels from "../withLabels";
import styles from "./styles";

const DEFAULT_LABELS = { selectedTitle: "", notSelectedTitle: "" };

/**
 * A toggle button is a mechanism that allows users to change between 2 options.
 */
const ToggleButton = ({
  classes,
  className,
  id,
  selected = false,
  labels,
  notSelectedIcon,
  selectedIcon = null,
  animated = false,
  onClick,
  disabled = false,
  ...others
}) => {
  const [isSelected, setIsSelected] = useState(selected);

  /**
   * Update state when prop selected is changed.
   */
  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  const Icon = animated || !isSelected ? notSelectedIcon : selectedIcon;
  const StyledIcon = () => (
    <Icon
      className={clsx(
        classes.icon,
        animated ? { notSelected: !isSelected, selected: isSelected } : {}
      )}
    />
  );
  const title = isSelected ? labels.selectedTitle : labels.notSelectedTitle;
  const WrappedIcon = title ? withTooltip(StyledIcon, title) : StyledIcon;

  const onClickHandler = e => {
    if (disabled) return;

    setIsSelected(!isSelected);

    if (onClick) onClick(e, !isSelected);
  };

  return (
    <button
      id={id}
      className={clsx(className, classes.root, {
        [classes.disabled]: disabled
      })}
      type="button"
      aria-pressed={isSelected}
      onClick={onClickHandler}
      {...others}
    >
      <WrappedIcon />
    </button>
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
     * Style applied to the root.
     */
    root: PropTypes.string,
    /**
     * Style applied to the icon.
     */
    icon: PropTypes.string,
    /**
     * Style applied when disabled.
     */
    disabled: PropTypes.string
  }).isRequired,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * Defines if the button is selected.
   */
  selected: PropTypes.bool,
  /**
   * Icon for when not selected.
   */
  notSelectedIcon: PropTypes.instanceOf(Object).isRequired,
  /**
   * Icon for when selected.
   */
  selectedIcon: PropTypes.instanceOf(Object),
  /**
   *
   */
  labels: PropTypes.shape({
    /**
     * Description for selected.
     */
    selectedTitle: PropTypes.string,
    /**
     * Description for not selected.
     */
    notSelectedTitle: PropTypes.string
  }),
  /**
   * Function called when icon is clicked.
   */
  onClick: PropTypes.func,
  /**
   * Defines if it is a animated SVG.
   */
  animated: PropTypes.bool,
  /**
   * Denotes if component is active or not.
   */
  disabled: PropTypes.bool
};

export default withStyles(styles, { name: "HvToggleButton" })(
  withLabels(DEFAULT_LABELS)(ToggleButton)
);

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import withLabels from "../withLabels";
import { isKeypress, KeyboardCodes } from "../utils/KeyboardUtils";
import styles from "./styles";

const DEFAULT_LABELS = { selectedTitle: "", notSelectedTitle: "" };

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
  const [classSvg, setClassSvg] = useState("default");

  /**
   * Update state when prop selected is changed.
   */
  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  let Icon;
  if (animated) {
    Icon = notSelectedIcon;
  } else {
    Icon = isSelected ? selectedIcon : notSelectedIcon;
  }

  const { selectedTitle, notSelectedTitle } = labels;
  const title = isSelected ? selectedTitle : notSelectedTitle;

  /**
   * Toggle the classes for the case of an animated SVG.
   */
  const toggleClass = () => {
    if (isSelected) setClassSvg("notSelected");
    else setClassSvg("selected");
  };

  /**
   * Toggle the state. If the key pressed is tab it should be ignored.
   *
   * @param e
   */
  const toggle = e => {
    if (isKeypress(e, KeyboardCodes.Tab)) return;
    setIsSelected(!isSelected);
    if (animated) toggleClass();
    if (onClick) onClick(e, isSelected);
  };

  return (
    <div
      id={id}
      className={clsx(className, classes.root, {
        [classes.disabled]: disabled
      })}
      role="button"
      aria-pressed={isSelected}
      tabIndex={0}
      onClick={toggle}
      onKeyDown={toggle}
      title={title}
      {...others}
    >
      <Icon className={clsx(classes.icon, { [classSvg]: animated })} />
    </div>
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

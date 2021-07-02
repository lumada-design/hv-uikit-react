import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { CurrentStep } from "@hv/uikit-react-icons";
import { setId } from "../../..";
import styles from "./styles";

/**
 * HvVerticalScrollListItem a focusable item to be used as part of the vertical scroll
 */
const HvVerticalScrollListItem = (props) => {
  const {
    id,
    className,
    classes,
    selected,
    "aria-label": ariaLabel,
    onClick,
    onKeyDown,
    tooltipWrapper,
    ...others
  } = props;
  const variant = selected ? "highlightText" : "normalText";
  const labelId = setId(id, "label");
  const buttonId = setId(id, "button");
  const Tooltip = tooltipWrapper;
  const NotSelected = () => {
    return <div className={classes.notSelected} />;
  };
  const icon = selected ? <CurrentStep height="10px" width="10px" /> : <NotSelected />;
  return (
    <li id={id} className={clsx(className, classes.root)} aria-current={selected}>
      <div
        id={buttonId}
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={onKeyDown}
        className={classes.button}
        aria-label={ariaLabel}
        aria-labelledby={labelId}
        {...others}
      >
        <Tooltip id={labelId} className={clsx(classes.text)} variant={variant}>
          {icon}
        </Tooltip>
      </div>
    </li>
  );
};

HvVerticalScrollListItem.propTypes = {
  /**
   * Id to be applied to the tab.
   */
  id: PropTypes.string,
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the component when it is selected.
     */
    selected: PropTypes.string,
    /**
     * Styles applied to the text inside the component.
     */
    text: PropTypes.string,
    /**
     * Styles applied to the button inside the component.
     */
    button: PropTypes.string,
    notSelected: PropTypes.string,
  }).isRequired,
  /**
   * Whether the element is selected.
   */
  selected: PropTypes.bool,
  /**
   * Text to label the step for accessibility.
   */
  "aria-label": PropTypes.string,
  /**
   * a function component that renders a typography wrapped with a tooltip.
   */
  tooltipWrapper: PropTypes.func.isRequired,
  /**
   * The function to be executed when the element is clicked.
   */
  onClick: PropTypes.func,
  /**
   * The function to be executed when the element is clicked.
   */
  onKeyDown: PropTypes.func,
};

export default withStyles(styles, { name: "HvVerticalScrollListItem" })(HvVerticalScrollListItem);

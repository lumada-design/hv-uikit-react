import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import HvButton from "../Button";
import styles from "./styles";

/**
 * parse button properties and if any buttons are preset as selected
 * set the state with their ids
 * */
const getInitialState = buttons => buttons.filter(item => item.selected).map(item => item.id);

const MultiButton = ({
  id,
  className,
  classes,
  type,
  onChange,
  multi = false,
  minSelection = 0,
  maxSelection = Infinity,
  buttons,
  vertical = false,
  ...others
}) => {
  /**
   * set state; if button properties are mismatched set hasError prop
   * in order to throw error in component and alert for the need to correctly
   * set the button props
   */
  const [checkedItems, setCheckedItems] = useState(getInitialState(buttons));

  useEffect(() => {
    setCheckedItems(getInitialState(buttons));
  }, [buttons]);

  const handleClick = (event, idx) => {
    let newState;

    const clickedBtnDefs = buttons[idx];
    const btnClickable = clickedBtnDefs.enforced !== undefined ? clickedBtnDefs : false;

    if (btnClickable) return;

    const clickedBtnId = buttons[idx].id;

    if (checkedItems.length === minSelection && checkedItems.includes(clickedBtnId)) {
      return;
    }

    if (checkedItems.length === maxSelection && !checkedItems.includes(clickedBtnId)) {
      return;
    }

    const clickedBtnPositionInState = checkedItems.indexOf(clickedBtnId);

    if (multi) {
      // check if item has not been clicked
      if (clickedBtnPositionInState === -1) {
        // handle state change
        newState = [...checkedItems, buttons[idx].id];
      } else {
        const itemToRemove = clickedBtnPositionInState;
        newState = checkedItems.filter((_, i) => i !== itemToRemove);
      }
    } else if (clickedBtnPositionInState === -1) {
      // handle state change
      // this enforces that the change happens only when we click on
      // a deselected element mimicking the behavior of the button component
      newState = [clickedBtnId];
    } else {
      return;
    }

    setCheckedItems(newState);
    onChange?.(event, newState.slice());
  };

  const renderButton = (button, idx) => {
    const { id: bId, icon, selected, value, ...other } = button;
    const isSelected = checkedItems.indexOf(bId) !== -1;

    const iconButton =
      icon && type === "mixed" ? React.cloneElement(icon, { className: classes.icon }) : icon;

    return (
      <HvButton
        key={`btnkey_${idx + 1}`}
        id={bId}
        onClick={event => handleClick(event, idx)}
        className={clsx(classes.button, {
          [classes.isSelected]: isSelected,
          [classes.isUnselected]: !isSelected
        })}
        category={selected ? "secondary" : "ghost"}
        aria-label={value}
        {...other}
      >
        {type !== "text" && iconButton}
        {type !== "icon" && <div className={classes.labelText}>{value}</div>}
      </HvButton>
    );
  };

  return (
    <div
      id={id}
      className={clsx(className, classes.root, {
        [classes.vertical]: vertical
      })}
      {...others}
    >
      {buttons.map((button, idx) => renderButton(button, idx))}
    </div>
  );
};

MultiButton.propTypes = {
  /**
   * Identifier
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
     * Styles applied to the multibutton root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the multibutton when it's vertical.
     */
    vertical: PropTypes.string,
    /**
     * Styles applied to the button label.
     */
    labelText: PropTypes.string,
    /**
     * Styles applied to the each button.
     */
    button: PropTypes.string,
    /**
     * Styles applied to the each button's icon.
     */
    icon: PropTypes.string,
    /**
     * Styles applied to the button when it's selected.
     */
    isSelected: PropTypes.string,
    /**
     * Styles applied to the button when it's not selected.
     */
    isUnselected: PropTypes.string
  }).isRequired,
  /**
   * If the multibutton is to be displayed vertically.
   */
  vertical: PropTypes.bool,
  /**
   * If the multibutton is multi selectable.
   */
  multi: PropTypes.bool,
  /**
   * Type of button display.
   *  - Accepted values:
   *    --"label": displays just a text label,
   *    --"icon": displays just an icon,
   *    --"mixed": displays both a label and an icon
   */
  type: PropTypes.oneOf(["text", "icon", "mixed"]).isRequired,
  /**
   * Buttons definitions
   */
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * the button id.
       */
      id: PropTypes.string.isRequired,
      /**
       * the button label.
       */
      value: PropTypes.string,
      /**
       * icon in button.
       */
      icon: PropTypes.node,
      /**
       * If the button is selected.
       */
      selected: PropTypes.bool,
      /**
       * Specify if item can be toggled or not.
       */
      enforced: PropTypes.bool
    })
  ).isRequired,
  /**
   * Callback function to be triggered when the input value is changed
   */
  onChange: PropTypes.func,
  /**
   * Specify minimum number of selections in component
   */
  minSelection: PropTypes.number,
  /**
   * Specify maximum number of selections in component
   */
  maxSelection: PropTypes.number
};

export default withStyles(styles, { name: "HvMultiButton" })(MultiButton);

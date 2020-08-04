import React, { useEffect, useState, cloneElement } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import HvButton from "../Button";
import styles from "./styles";

/**
 * parse button properties and if any buttons are preset as selected
 * set the state with their ids
 * */
const getInitialState = (buttons = []) =>
  buttons.reduce((acc, button, i) => (button.selected ? [...acc, i] : acc), []);

const MultiButton = ({
  className,
  children,
  classes,
  type,
  onChange,
  multi = false,
  selection,
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
  const [checkedItems, setCheckedItems] = useState(selection ?? getInitialState(buttons));

  useEffect(() => {
    setCheckedItems(selection);
  }, [selection]);

  useEffect(() => {
    setCheckedItems(getInitialState(buttons));
  }, [buttons]);

  const handleClick = (event, idx, btnProps) => {
    const clickedButton = buttons?.[idx] || btnProps;
    const btnClickable = clickedButton.enforced !== undefined ? clickedButton : false;

    const isSelected = checkedItems.includes(idx);

    if (
      btnClickable ||
      (checkedItems.length === minSelection && isSelected) ||
      (checkedItems.length === maxSelection && !isSelected)
    ) {
      return;
    }

    let newState;
    if (multi) {
      // check if item has not been clicked
      if (!isSelected) {
        // handle state change
        newState = [...checkedItems, idx];
      } else {
        newState = checkedItems.filter(item => item !== idx);
      }
    } else if (!isSelected) {
      // handle state change
      // this enforces that the change happens only when we click on
      // a deselected element mimicking the behavior of the button component
      newState = [idx];
    } else {
      return;
    }

    setCheckedItems(newState);
    onChange?.(event, newState.slice(), idx);
  };

  const renderButton = (button, idx) => {
    const { id, icon, selected, value, enforced, ...other } = button;
    const isSelected = checkedItems.includes(idx);

    const iconButton =
      icon && type === "mixed" ? React.cloneElement(icon, { className: classes.icon }) : icon;

    return (
      <HvButton
        key={`btnkey_${idx + 1}`}
        id={id}
        onClick={event => handleClick(event, idx)}
        className={clsx(classes.button, {
          [classes.isSelected]: isSelected,
          [classes.isUnselected]: !isSelected
        })}
        category="ghost"
        aria-label={value}
        overrideIconColors={false}
        {...other}
      >
        {type !== "text" && iconButton}
        {type !== "icon" && <div className={classes.highlightText}>{value}</div>}
      </HvButton>
    );
  };

  const renderChild = (child, idx) => {
    const isSelected = checkedItems.includes(idx);

    return cloneElement(child, {
      key: `btnkey_${idx + 1}`,
      category: "ghost",
      overrideIconColors: false,
      onClick: event => {
        handleClick(event, idx, child.props);
        child.props.onClick?.(event);
      },
      className: clsx(classes.button, {
        [classes.isSelected]: isSelected,
        [classes.isUnselected]: !isSelected
      })
    });
  };

  return (
    <div
      className={clsx(className, classes.root, {
        [classes.vertical]: vertical
      })}
      {...others}
    >
      {children?.map(renderChild) || buttons?.map(renderButton)}
    </div>
  );
};

MultiButton.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * The MultiButton's buttons.
   */
  children: PropTypes.node,
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
    highlightText: PropTypes.string,
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
  type: PropTypes.oneOf(["text", "icon", "mixed"]),
  /**
   * Buttons definitions
   */
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * the button id.
       */
      id: PropTypes.string,
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
  ),
  /**
   * Callback function to be triggered when the input value is changed
   */
  onChange: PropTypes.func,
  /**
   * Array of selection ids to use when controlled
   */
  selection: PropTypes.arrayOf(PropTypes.number),
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

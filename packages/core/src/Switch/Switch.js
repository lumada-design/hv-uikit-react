import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import isNil from "lodash/isNil";
import { Switch, withStyles } from "@material-ui/core";
import { setId } from "../utils";
import withLabels from "../withLabels";
import HvTypography from "../Typography";
import Focus from "../Focus";
import styles from "./styles";

const DEFAULT_LABELS = {
  left: "Off",
  right: "On",
};

/**
 * A Switch is a mechanism that allows user toggle between 2 options.
 */
const HvSwitch = (props) => {
  const {
    id,
    className,
    classes,
    checked = true,
    disabled = false,
    onChange,
    labels,
    showLabels = true,
    value = "",
    ...others
  } = props;

  const [clickState, setClicked] = useState(checked);

  useEffect(() => {
    setClicked(checked);
  }, [checked]);

  const onClickHandler = (event) => {
    if (disabled) return;

    const newState = !clickState;
    setClicked(newState);
    onChange?.(event, newState);
  };

  const renderLabel = (position) => (
    <div id={!isNil(id) ? setId(id, position, "button") : undefined}>
      <HvTypography
        className={clsx(classes[`${position}Label`], {
          [classes.disabledLabel]: disabled,
        })}
        onClick={onClickHandler}
      >
        {labels[position]}
      </HvTypography>
    </div>
  );

  return (
    <div
      className={clsx(
        classes.root,
        {
          [classes.disabled]: disabled,
        },
        className
      )}
    >
      {showLabels && renderLabel("left")}
      <Focus disabledClass={disabled || undefined} classes={{ focus: classes.focus }}>
        <div
          onClick={onClickHandler}
          onKeyDown={onClickHandler}
          role="checkbox"
          tabIndex="0"
          aria-checked={clickState}
          aria-disabled={disabled}
          id={id}
          {...others}
        >
          <Switch
            tabIndex="-1"
            checked={clickState}
            disabled={disabled}
            value={value}
            inputProps={{
              // dummy aria-label this component is not tabbable and it is just presentational.
              // the accessibility test were always failing because of the missing aria label.
              "aria-label": "base switch",
            }}
            classes={{
              root: classes.switch,
              switchBase: classes.switchBase,
              checked: classes.checked,
              track: classes.track,
              thumb: classes.thumb,
              disabled: classes.disabled,
            }}
          />
        </div>
      </Focus>
      {showLabels && renderLabel("right")}
    </div>
  );
};

HvSwitch.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied to the Switch Component.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root element.
     */
    root: PropTypes.string,
    /**
     * Styles applied when the switch is focused.
     */
    focus: PropTypes.string,
    /**
     * Styles applied to the internal Switch component's root class.
     */
    switch: PropTypes.string,
    /**
     * Styles applied to the internal SwitchBase component's root class.
     */
    switchBase: PropTypes.string,
    /**
     * Styles applied to the labels when they are disabled.
     */
    disabledLabel: PropTypes.string,
    /**
     * Pseudo-class applied to the internal SwitchBase component's checked class.
     */
    checked: PropTypes.string,
    /**
     * Styles applied to the track element.
     */
    track: PropTypes.string,
    /**
     * Styles used to create the thumb passed to the internal SwitchBase component icon prop.
     */
    thumb: PropTypes.string,
    /**
     * Styles applied to the internal SwitchBase component's disabled class.
     */
    disabled: PropTypes.string,
  }).isRequired,
  /**
   * Denotes selection state of switch component.
   */
  checked: PropTypes.bool,
  /**
   * Denotes if component is active or not.
   */
  disabled: PropTypes.bool,
  /**
   * Callback function to be triggered when the input value is changed
   */
  onChange: PropTypes.func,
  /**
   * An Object containing the various text associated with the switch.
   */
  labels: PropTypes.shape({
    /**
     * Label placed at the left of the switch.
     */
    left: PropTypes.string,
    /**
     * Label placed at the right of the switch.
     */
    right: PropTypes.string,
  }),
  /**
   * The ID associated with the switch component.
   */
  id: PropTypes.string,
  /**
   * Value assigned to the Switch Component.
   */
  value: PropTypes.string,
  /**
   * Determine if labels should be displayed alongside component
   */
  showLabels: PropTypes.bool,
};

export default withStyles(styles, { name: "HvSwitch" })(withLabels(DEFAULT_LABELS)(HvSwitch));

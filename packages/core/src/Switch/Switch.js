import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import isNil from "lodash/isNil";
import { Switch, withStyles } from "@material-ui/core";
import CheckMark from "@hv/uikit-react-icons/dist/CompletedStep";
import { setId, isKeypress, KeyboardCodes } from "../utils";
import withLabels from "../withLabels";
import HvTypography from "../Typography";
import Focus from "../Focus";
import styles from "./styles";

const DEFAULT_LABELS = {
  left: "Off",
  right: "On"
};

const HvSwitch = props => {
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
    displayIconChecked = false,
    ...others
  } = props;

  const [clickState, setClicked] = useState(checked);

  const handleChange = event => {
    setClicked(event.target.checked);
    onChange?.(event);
  };

  const onKeyDownHandler = event => {
    if (isKeypress(event, KeyboardCodes.SpaceBar)) {
      const newState = !clickState;
      setClicked(newState);
      onChange(event, newState);
    }
  };

  const onClickHandler = event => {
    const newState = !clickState;
    setClicked(newState);
    onChange(event, newState);
  };

  const renderLabel = position => (
    <div id={!isNil(id) ? setId(id, position, "button") : undefined}>
      <HvTypography
        className={clsx(classes[`${position}Label`], {
          [classes.disabledLabel]: disabled,
          [classes.labelSelected]: !disabled && !clickState,
          [classes.labelDeselected]: !disabled && clickState
        })}
        onClick={disabled ? undefined : onClickHandler}
        aria-disabled={disabled}
      >
        {labels[position]}
      </HvTypography>
    </div>
  );

  const checkedIcon = <CheckMark width="14px" height="14px" className={classes.checkedIcon} />;

  return (
    <div className={clsx(classes.root, className)}>
      {showLabels && renderLabel("left")}
      <Focus strategy="card" useFalseFocus>
        <div
          className={classes.root}
          onClick={disabled ? undefined : onClickHandler}
          role="checkbox"
          tabIndex="0"
          aria-checked={clickState}
          onKeyDown={disabled ? undefined : onKeyDownHandler}
          aria-disabled={disabled}
          id={id}
          {...others}
        >
          <Switch
            tabIndex="-1"
            checked={clickState}
            onChange={handleChange}
            disabled={disabled}
            value={value}
            inputProps={{
              // dummy aria-label this component is not tabbable and it is just presentational.
              // the accessibility test were always failing because of the missing aria label.
              "aria-label": "base switch"
            }}
            classes={{
              root: classes.switch,
              switchBase: classes.switchBase,
              checked: classes.checked,
              track: classes.track,
              thumb: classes.thumb,
              disabled: classes.disabled
            }}
            {...(displayIconChecked && { checkedIcon })}
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
     * Styles applied to the labels when they are selected.
     */
    labelSelected: PropTypes.string,
    /**
     * Styles applied to the labels when they are disabled.
     */
    labelDeselected: PropTypes.string,
    /**
     * Styles applied to the checked icon.
     */
    checkedIcon: PropTypes.string,
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
    disabled: PropTypes.string
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
   *
   * - left: Label placed at the left of the switch.
   * - right: Label placed at the right of the switch.
   */
  labels: PropTypes.shape({
    left: PropTypes.string,
    right: PropTypes.string
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
  /**
   * Determine if custom icon in button should be displayed
   * */
  displayIconChecked: PropTypes.bool
};

export default withStyles(styles, { name: "HvSwitch" })(withLabels(DEFAULT_LABELS)(HvSwitch));

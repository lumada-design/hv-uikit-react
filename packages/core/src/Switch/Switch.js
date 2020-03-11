import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import isNil from "lodash/isNil";
import uniqueId from "lodash/uniqueId";
import { Switch, withStyles } from "@material-ui/core";
import CheckMark from "@hv/uikit-react-icons/dist/Good";
import { KeyboardCodes, isKeypress } from "../utils/KeyboardUtils";
import HvTypography from "../Typography";
import Focus from "../Focus";
import styles from "./styles";

const HvSwitch = props => {
  const {
    classes,
    checked,
    disabled,
    onChange,
    labels,
    id,
    showLabels,
    value,
    displayIconChecked,
    ...other
  } = props;

  const [clickState, setClicked] = useState(checked);
  const DEFAULT_ID_PREFIX = "hv-switch-";
  const internalId = id || uniqueId(DEFAULT_ID_PREFIX);

  const handleChange = event => {
    setClicked(event.target.checked);
    onChange(event);
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
    <div id={!isNil(id) ? `${id}_${position}Button` : undefined}>
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

  const checkedIcon = <CheckMark iconSize="XS" className={classes.checkedIcon} />;

  return (
    <div className={classes.root} id={`${internalId}_root`}>
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
          id={internalId}
          {...other}
        >
          <Switch
            tabIndex="-1"
            checked={clickState}
            onChange={handleChange}
            disabled={disabled}
            value={value}
            inputProps={{
              // dummy aria-label this component is not tabbable and it is just presentational.
              // the accesibility test were always failing because of the missing aria label.
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

HvSwitch.defaultProps = {
  checked: true,
  disabled: false,
  onChange: () => {},
  labels: {
    left: "Off",
    right: "On"
  },
  id: undefined,
  value: "",
  showLabels: true,
  displayIconChecked: false
};

export default withStyles(styles, { name: "HvSwitch" })(HvSwitch);

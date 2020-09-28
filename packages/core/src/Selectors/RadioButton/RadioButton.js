import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Radio, FormControlLabel, withStyles } from "@material-ui/core";
import { setId } from "../../utils";
import { getLabelStyles, getSelectorIcons } from "../utils";
import styles from "./styles";

/**
 * A Radio button is a mechanism that allows user to select one option from a group
 */
const HvRadio = (props) => {
  const {
    classes,
    className,
    id,
    checked,
    semantic = false,
    disabled,
    onChange,
    value = "",
    label = "",
    labelPlacement = "end",
    formControlLabelProps,
    ...others
  } = props;

  const icons = getSelectorIcons(classes, { disabled, semantic });
  const labelStyles = getLabelStyles(classes, labelPlacement, label);
  const [isFocusDisabled, disableFocus] = useState(false);

  const onLocalChange = (evt) => {
    const { screenX, screenY, clientX, clientY } = evt.nativeEvent;
    const isKeyEvent = screenX === 0 && screenY === 0 && clientX === 0 && clientY === 0;

    disableFocus(!isKeyEvent);
    onChange?.(evt, checked);
  };

  const onBlur = () => {
    disableFocus(false);
  };

  return (
    <FormControlLabel
      label={label}
      labelPlacement={labelPlacement}
      id={id}
      className={clsx(labelStyles, className, {
        [classes.disableFocus]: isFocusDisabled,
      })}
      classes={{
        disabled: classes.labelDisabled,
        label: classes.labelTypography,
      }}
      control={
        <Radio
          id={setId(id, "input")}
          className={clsx(classes.radio, {
            [classes.disabledBorder]: checked && disabled,
          })}
          icon={icons.radio}
          checkedIcon={icons.radioChecked}
          color="default"
          disabled={disabled}
          disableRipple
          onChange={onLocalChange}
          onBlur={onBlur}
          value={value}
          checked={checked}
          {...others}
        />
      }
      {...formControlLabelProps}
    />
  );
};

HvRadio.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied to the Radio button.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component.
     */
    container: PropTypes.string,
    /**
     * Styles applied to the label typography.
     */
    labelTypography: PropTypes.string,
    /**
     * Styles applied to the component when the label is disable.
     */
    labelDisabled: PropTypes.string,
    /**
     *  Styles applied to the label when the position is end.
     */
    labelEnd: PropTypes.string,
    /**
     * Styles applied to the label when the position is start.
     */
    labelStart: PropTypes.string,
    /**
     * Styles applied to the checkbox core element (material-ui).
     */
    radio: PropTypes.string,
    /**
     * Styles applied to the focus when it is disabled.
     */
    disableFocus: PropTypes.string,
    /**
     * Styles applied to the icon.
     */
    icon: PropTypes.string,
    /**
     * Styles applied to the icon border when it is checked and disabled.
     */
    disabledBorder: PropTypes.string,
  }).isRequired,
  /**
   * If `true` the Radio button is disabled and the onChange function will not be called.
   */
  disabled: PropTypes.bool,
  /**
   * The function executed when the Radio button changes from unselected to selected.
   */
  onChange: PropTypes.func,
  /**
   * If `true` the Radio button is selected, if set to `false` the Radio button is not selected.
   */
  checked: PropTypes.bool,
  /**
   * Whether the selector should use semantic colors
   */
  semantic: PropTypes.bool,
  /**
   * The value of the Radio button.
   * this value will be returned in the event object generated for the onChange callback
   */
  value: PropTypes.string,
  /**
   * The label to be added to the radio button.
   */
  label: PropTypes.node,
  /**
   * The position of the Radio button label.
   *  - Accepted values:
   *    --"start",
   *    --"end"
   *  - note: the labelPositions object should be used to set this value.
   */
  labelPlacement: PropTypes.oneOf(["start", "end"]),
  /**
   * Extra properties passed to the MUI FormControlLabel component.
   */
  formControlLabelProps: PropTypes.instanceOf(Object),
};

export default withStyles(styles, { name: "HvRadioButton" })(HvRadio);

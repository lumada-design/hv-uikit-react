import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Checkbox, FormControlLabel, withStyles } from "@material-ui/core";
import { setId } from "../../utils";
import { getLabelStyles, getSelectorIcons } from "../utils";
import styles from "./styles";

/**
 * A Checkbox is a mechanism that allows user to select one or more options.
 */
const HvCheckbox = (props) => {
  const {
    classes,
    className,
    id,
    checked,
    semantic = false,
    indeterminate,
    disabled = false,
    onChange,
    value = "",
    label,
    labelPlacement = "end",
    formControlLabelProps,
    ...others
  } = props;
  const icons = getSelectorIcons(classes, { disabled, semantic });
  const labelClass = getLabelStyles(classes, labelPlacement, label);
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
      disabled={disabled}
      className={clsx(labelClass, className, {
        [classes.disableFocus]: isFocusDisabled,
      })}
      id={id}
      classes={{
        disabled: classes.labelDisabled,
        label: classes.labelTypography,
      }}
      control={
        <Checkbox
          id={setId(id, "input")}
          className={classes.checkBox}
          icon={icons.checkbox}
          indeterminateIcon={icons.checkboxPartial}
          checkedIcon={icons.checkboxChecked}
          color="default"
          disabled={disabled}
          disableRipple
          onChange={onLocalChange}
          onBlur={onBlur}
          value={value}
          checked={checked}
          indeterminate={indeterminate}
          {...others}
        />
      }
      {...formControlLabelProps}
    />
  );
};

HvCheckbox.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied to the checkbox.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component.
     */
    container: PropTypes.string,
    /**
     * Style applied when focus is disabled.
     */
    disableFocus: PropTypes.string,
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
    checkBox: PropTypes.string,
    /**
     * Styles applied to the icon.
     */
    icon: PropTypes.string,
    truncate: PropTypes.string,
  }).isRequired,
  /**
   * If `true` the checkbox is disabled and the onClick function will not be called.
   */
  disabled: PropTypes.bool,
  /**
   * The function executed when the checkbox is pressed.
   */
  onChange: PropTypes.func,
  /**
   * If `true` the checkbox is selected, if set to `false` the checkbox is not selected.
   * note: if this value is specified the state of the checkbox must be managed
   */
  checked: PropTypes.bool,
  /**
   * Whether the selector should use semantic colors
   */
  semantic: PropTypes.bool,
  /**
   * If `true` the checkbox uses the intermediate state, if set to `false` the checkbox will not use the intermediate state.
   */
  indeterminate: PropTypes.bool,
  /**
   * The value of the checkbox. This value will be returned in the event object generated for the onChange callback
   */
  value: PropTypes.string,
  /**
   * The label to be added to the checkbox.
   */
  label: PropTypes.node,
  /**
   * The position of the checkbox label.
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

export default withStyles(styles, { name: "HvCheckBox" })(HvCheckbox);

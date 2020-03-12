import React, { useState } from "react";
import PropTypes from "prop-types";
import uniqueId from "lodash/uniqueId";
import clsx from "clsx";
import { Checkbox, FormControlLabel, withStyles } from "@material-ui/core";
import CheckBoxIcon from "@hv/uikit-react-icons/dist/Checkbox";
import CheckBoxCheckedIcon from "@hv/uikit-react-icons/dist/CheckboxCheck";
import CheckBoxPartialIcon from "@hv/uikit-react-icons/dist/CheckboxPartial";
import labelPositions from "../labelPositions";
import styles from "./styles";

/**
 * Chooses the correct label styling to applied based on position.
 *
 * @param {String} classes - The classes object containing the classes names needed to be applied.
 * @param {Object} labelPosition - an Object containing the avaible label positions.
 * @returns {Object} - an Object with the name of the class for the required styling.
 */
const prepareLabelStyles = (classes, labelPosition, label) => {
  if (label) {
    switch (labelPosition) {
      default:
      case labelPositions.end:
        return clsx(classes.container, classes.labelEnd);
      case labelPositions.start:
        return clsx(classes.container, classes.labelStart);
    }
  }
  return classes.container;
};

/**
 * Chooses the correct icon to used based on the disable value.
 *
 * @param {Object} props - HvCheckbox props.
 * @returns {Object} - an Object with the selected icons.
 */
const prepareIcon = (classes, disabled) => {
  const color = disabled ? ["atmo4", "atmo6"] : undefined;

  return {
    emptyIcon: <CheckBoxIcon color={color} className={classes.icon} />,
    checkedIcon: <CheckBoxCheckedIcon color={color} className={classes.icon} />,
    indeterminateIcon: <CheckBoxPartialIcon color={color} className={classes.icon} />
  };
};

const HvCheckbox = props => {
  const {
    classes,
    className,
    id,
    checked,
    indeterminate,
    disabled,
    onChange,
    value,
    label,
    labelPlacement,
    formControlLabelProps,
    checkboxProps,
    ...other
  } = props;
  const icons = prepareIcon(classes, disabled);
  const labelClass = prepareLabelStyles(classes, labelPlacement, label);
  const [isFocusDisabled, disableFocus] = useState(false);
  const [internalId] = useState(id || uniqueId("hv-checkbox-"));

  const onLocalChange = evt => {
    const isKeyEvent =
      window.event.screenX === 0 &&
      window.event.screenY === 0 &&
      window.event.clientX === 0 &&
      window.event.clientY === 0;

    disableFocus(!isKeyEvent);
    onChange(evt);
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
        [classes.disableFocus]: isFocusDisabled
      })}
      id={internalId}
      classes={{
        disabled: classes.labelDisabled,
        label: classes.labelTypography
      }}
      control={
        <Checkbox
          id={`${internalId}-input`}
          className={classes.checkBox}
          icon={icons.emptyIcon}
          indeterminateIcon={icons.indeterminateIcon}
          checkedIcon={icons.checkedIcon}
          color="default"
          disabled={disabled}
          disableRipple
          onChange={onLocalChange}
          onBlur={onBlur}
          value={value}
          checked={checked}
          indeterminate={indeterminate}
          {...checkboxProps}
          {...other}
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
    icon: PropTypes.string
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
  label: PropTypes.string,
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
  /**
   * Extra properties passed to the MUI Checkbox component.
   */
  checkboxProps: PropTypes.instanceOf(Object)
};

HvCheckbox.defaultProps = {
  className: "",
  id: undefined,
  value: "",
  label: "",
  checked: undefined,
  indeterminate: undefined,
  disabled: false,
  onChange: () => {},
  formControlLabelProps: undefined,
  checkboxProps: undefined,
  labelPlacement: "end"
};

export default withStyles(styles, { name: "HvCheckBox" })(HvCheckbox);

import React, { useState } from "react";
import PropTypes from "prop-types";
import uniqueId from "lodash/uniqueId";
import clsx from "clsx";
import { Radio, FormControlLabel } from "@material-ui/core";
import RadioButtonSelected from "@hv/uikit-react-icons/dist/RadioButtonSelected";
import RadioButtonUnSelected from "@hv/uikit-react-icons/dist/RadioButtonUnselected";
import labelPositions from "../labelPositions";
import withStyles from "../../styles/withStyles";
import styles from "./styles";

/**
 * Returns the correct label styles to be applied based on label position.
 *
 * @param {String} classes - The classes object containing the classes names needed to be applied.
 * @param {Object} labelPosition - an Object containing the available label positions.
 * @returns {Object} - an Object with the name of the class for the required styling.
 */
const getLabelStyles = (classes, labelPosition, label) => {
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
 * Returns the icons to be used based on the disable value.
 *
 * @param {Object} classes - A JSS Object that contains the css classes to apply.
 * @param {Boolean} disabled - `true` if the disabled icon is required.
 * @returns {Object} - an Object with the selected icons.
 */
const getIcons = (classes, disabled) => {
  const color = disabled ? ["atmo4", "atmo6"] : undefined;

  return {
    emptyIcon: <RadioButtonUnSelected color={color} className={classes.icon} />,
    checkedIcon: <RadioButtonSelected color={color} className={classes.icon} />
  };
};

const HvRadio = props => {
  const {
    classes,
    className,
    id,
    checked,
    disabled,
    onChange,
    value,
    label,
    labelPlacement,
    formControlLabelProps,
    radioProps
  } = props;

  const icons = getIcons(classes, disabled);
  const labelStyles = getLabelStyles(classes, labelPlacement, label);
  const [isFocusDisabled, disableFocus] = useState(false);
  const [internalId] = useState(id || uniqueId("hv-radiobutton-"));

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
      id={internalId}
      className={clsx(labelStyles, className, {
        [classes.disableFocus]: isFocusDisabled
      })}
      classes={{
        disabled: classes.labelDisabled,
        label: classes.labelTypography
      }}
      control={
        <Radio
          id={`${internalId}-input`}
          className={classes.radio}
          icon={icons.emptyIcon}
          checkedIcon={icons.checkedIcon}
          color="default"
          disabled={disabled}
          disableRipple
          onChange={onLocalChange}
          onBlur={onBlur}
          value={value}
          checked={checked}
          {...radioProps}
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
    icon: PropTypes.string
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
   * The value of the Radio button.
   * this value will be returned in the event object generated for the onChange callback
   */
  value: PropTypes.string,
  /**
   * The label to be added to the checkbox.
   */
  label: PropTypes.string,
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
  /**
   * Extra properties passed to the MUI Radio component.
   */
  radioProps: PropTypes.instanceOf(Object)
};

HvRadio.defaultProps = {
  className: "",
  id: undefined,
  value: "",
  label: "",
  checked: undefined,
  disabled: false,
  onChange: () => {},
  formControlLabelProps: undefined,
  radioProps: undefined,
  labelPlacement: labelPositions.end
};

export default withStyles(styles, { name: "HvRadioButton" })(HvRadio);

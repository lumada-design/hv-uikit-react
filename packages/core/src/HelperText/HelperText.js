import React from "react";
import PropTypes from "prop-types";
import isNil from "lodash/isNil";
import clsx from "clsx";
import { Input, withStyles } from "@material-ui/core";
import InfoS from "@hv/uikit-react-icons/dist/Info";
import withId from "../withId";
import withLabels from "../withLabels";
import { isKeypress, KeyboardCodes } from "../utils";
import isBrowser from "../utils/browser";
import InputAdornment from "./InputAdornment";
import HvTypography from "../Typography";
import HvList from "../List";
import validationTypes from "./validationTypes";

import { validateCharLength, validateInput } from "./validations";
import styles from "./styles";
import withTooltips from "../withTooltip";

const DEFAULT_LABELS = {
  inputLabel: "",
  placeholder: "",
  infoText: "",
  warningText: "something wrong",
  maxCharQuantityWarningText: "The value is too big",
  minCharQuantityWarningText: "The value is too short",
  requiredWarningText: "The value is required",
  clearButtonLabel: "Clear the text"
};

const validationState = {
  empty: "empty",
  filled: "filled",
  valid: "valid",
  invalid: "invalid"
};

/**
 * An input is a graphicl control element that allows the user to write text.
 */
const HvHelperText = props => {
  const {
    labels,
    classes,
    className,
    id,
    password,
    disabled,
    isRequired,
    infoIcon,
    validationIconVisible,
    disableClear,
    customFixedIcon,
    validationIconPosition,
    showInfo,
    validationType,
    validationState,
    maxCharQuantity,
    minCharQuantity,
    validation,
    externalWarningTextOverride,
    value,
    autoFocus,
    initialValue,
    inlineStyling,
    variant,
    classesToApply,
    hasIcon,
    stateValidation,
    ...others
  } = props;

  const getTypographyType = chosenVariant => {
    return chosenVariant === "helper"
      ? "infoText"
      : chosenVariant === "warning"
      ? "sText"
      : "sText";
  };

  const getClassesToApply = chosenVariant => {
    let labelStyles;
    if (chosenVariant === "helper") {
      labelStyles = clsx(classes.infoText);
    } else if (chosenVariant === "warning") {
      labelStyles = clsx(classes.textWarning, classes.infoText, {
        // show the text if we are in an invalid state and either of the invalid labels exist
        [classes.showText]:
          stateValidation === "invalid" && (externalWarningTextOverride || labels.warningText)
      });
    }
    return labelStyles;
  };

  const getLabels = chosenVariant => {
    let labelToReturn;
    if (chosenVariant === "helper") {
      labelToReturn = labels.infoText;
    } else if (chosenVariant === "warning") {
      labelToReturn = externalWarningTextOverride || labels.warningText || "";
    }
    return labelToReturn;
  };

  // const getInlineStyles = (errorIconExists, stateValidationObject) => {
  //   return !errorIconExists && stateValidationObject !== validationState.invalid
  //     ? "block"
  //     : "none";
  // };

  let labelType;
  // const currentInputState = hasIcon && stateValidation !== validationState.invalid;
  if (stateValidation !== "invalid") {
    labelType = variant;
  } else {
    labelType = "warning";
  }
  return (
    <>
      <HvTypography
        id={`${id}-description`}
        variant={getTypographyType(labelType)}
        className={getClassesToApply(labelType, stateValidation)}
        // style={{
        //   display:
        //     !infoIcon && stateValidationState !== validationStates.invalid ? "block" : "none"
        // }}
      >
        {/* Blah */}
        {getLabels(labelType)}
      </HvTypography>
      {/* {showInfo && labels.infoText && ( */}
      {/* <HvTypography
          id={`${id}-description`}
          variant={getTypographyType(variant)}
          className={getClassesToApply(variant)}
          // style={{
          //   display: getInlineStyles(hasIcon, stateValidation)
          // }}
        >
          {getLabels(variant)}
        </HvTypography> */}
      {/* )} */}
      {/* <HvTypography
          variant="sText"
          className={clsx(classes.textWarning, classes.infoText, {
            [classes.showText]:
              stateValidationState === validationStates.invalid &&
              (externalWarningTextOverride || warningText)
          })}
          aria-live="polite"
          aria-controls={`${id}-input`}
          aria-atomic="true"
          aria-relevant="additions text"
          aria-labelledby={labels.inputLabel ? `${id}-label` : null}
        >
          {externalWarningTextOverride || warningText || ""}
        </HvTypography> */}
    </>
  );
};

HvHelperText.propTypes = {
  inlineStyling: PropTypes.shape({}),
  variant: PropTypes.string,
  classesToApply: PropTypes.string,
  hasIcon: PropTypes.bool,
  stateValidation: PropTypes.shape({}),
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root container of the input.
     */
    root: PropTypes.string,
    /**
     * Styles applied to input root which is comprising of everything but the labels and descriptions.
     */
    inputRoot: PropTypes.string,
    /**
     * Styles applied to input root when it is disabled.
     */
    inputRootDisabled: PropTypes.string,
    /**
     * Styles applied to input root when it is invalid.
     */
    inputRootInvalid: PropTypes.string,
    /**
     * Styles applied to input root when it is focused.
     */
    inputRootFocused: PropTypes.string,
    /**
     * Styles applied to input html element.
     */
    input: PropTypes.string,
    /**
     * Styles applied to input html element when it is disabled.
     */
    inputDisabled: PropTypes.string,
    /**
     * Styles applied to the container of the suggestions list.
     */
    suggestionsContainer: PropTypes.string,
    /**
     * Styles applied to the suggestions list.
     */
    suggestionList: PropTypes.string,
    /**
     * Styles applied to input html element when it is multiline mode.
     */
    multiLine: PropTypes.string,
    /**
     * Styles applied to the label element.
     */
    label: PropTypes.string,
    /**
     * Styles applied to the label element when it is disabled.
     */
    labelDisabled: PropTypes.string,
    /**
     * Styles applied to the container of the labels elements.
     */
    labelContainer: PropTypes.string,
    /**
     * Styles applied to the icon information container.
     */
    infoIconContainer: PropTypes.string,
    /**
     * Styles applied to the icon information text.
     */
    infoText: PropTypes.string,
    /**
     * Styles applied to the description.
     */
    text: PropTypes.string,
    /**
     * Styles applied to the description when it is showing an information.
     */
    textInfo: PropTypes.string,
    /**
     * Styles applied to the description when it is showing a warning.
     */
    textWarning: PropTypes.string,
    /**
     * Styles applied when the text should be shown.
     */
    showText: PropTypes.string,
    /**
     * Styles applied to the input adornment icons.
     */
    icon: PropTypes.string,
    /**
     * Styles applied to the icon used to clean the input.
     */
    iconClear: PropTypes.string,
    /**
     * IE11 specific styling.
     */
    "@global": PropTypes.string
  }).isRequired,
  /**
   * An Object containing the various texts associated with the input.
   */
  labels: PropTypes.shape({
    /**
     * The label on top of the input.
     */
    inputLabel: PropTypes.string,
    /**
     * The placeholder value of the input.
     */
    placeholder: PropTypes.string,
    /**
     * The default value of the info text below the input.
     */
    infoText: PropTypes.string,
    /**
     * The value when a validation fails.
     */
    warningText: PropTypes.string,
    /**
     * The message that appears when there are too many characters.
     */
    maxCharQuantityWarningText: PropTypes.string,
    /**
     * The message that appears when there are too few characters.
     */
    minCharQuantityWarningText: PropTypes.string,
    /**
     * The message that appears when the input is empty and required.
     */
    requiredWarningText: PropTypes.string,
    /**
     * The label of the clear button.
     */
    clearButtonLabel: PropTypes.string
  }),
  /**
   * Attributes applied to the input element.
   */
  inputProps: PropTypes.instanceOf(Object),
  /**
   * Allows passing a ref to the underlying input
   */
  inputRef: PropTypes.shape({ current: PropTypes.any }),
  /**
   * If ´true´ the input is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If ´true´ the input value must be filled on blur or else the validation fails.
   */
  isRequired: PropTypes.bool,
  /**
   * If ´true´ the input is of type password hiding the value.
   */
  password: PropTypes.bool,
  /**
   * The function that will be executed onChange, allows modification of the input,
   * it receives the value. If a new value should be presented it must returned it.
   */
  onChange: PropTypes.func,
  /**
   * The function that will be executed onBlur, allows checking the validation state,
   * it receives the value and the validation state (´empty´, ´filled´, ´invalid´, ´valid´).
   */
  onBlur: PropTypes.func,
  /**
   * The function that will be executed onBlur, allows checking the value state,
   * it receives the value.
   */
  onFocus: PropTypes.func,
  /**
   * The function that will be executed onKeyDown, allows checking the value state,
   * it receives the event and value.
   */
  onKeyDown: PropTypes.func,
  /**
   * The function that will be executed to received an array of objects that has a label and id to create list of suggestion
   */
  suggestionListCallback: PropTypes.func,
  /**
   * The function that will be executed after selecting a value in the suggestion list
   */
  suggestionSelectedCallback: PropTypes.func,
  /**
   * If `true` information label is shown, `false` otherwise.
   */
  showInfo: PropTypes.bool,
  /**
   * The custom validation function, it receives the value and must return
   * either ´true´ for valid or ´false´ for invalid, default validations would only
   * occur if this function is null or undefined
   */
  validation: PropTypes.func,
  /**
   * The value of the input, when controlled.
   */
  value: PropTypes.string,
  /**
   * The initial value of the input, when uncontrolled.
   */
  initialValue: PropTypes.string,
  /**
   * If `true` it should autofocus.
   */
  autoFocus: PropTypes.bool,
  /**
   * The initial state of the input.
   * note: Is recommended you use the provided validationStates object to set this value.
   */
  validationState: PropTypes.oneOf(["empty", "filled", "invalid", "valid"]),
  /**
   * Show info icon with info label.infoText.
   */
  infoIcon: PropTypes.bool,
  /**
   * If `true` the validation icon is visible, `false` otherwise
   */
  validationIconVisible: PropTypes.bool,
  /**
   * If `true` the clear button is disabled if `false` is enable
   */
  disableClear: PropTypes.bool,
  /**
   * The icon position of the input. It is recommended to use the provided validationIconPosition object to set this value.
   */
  validationIconPosition: PropTypes.oneOf(["left", "right"]),
  /**
   * a custom icon to be added into the input.
   */
  customFixedIcon: PropTypes.node,
  /**
   * The maximum allowed length of the characters, if this value is null no check
   * will be performed.
   */
  maxCharQuantity: PropTypes.number,
  /**
   * The minimum allowed length of the characters, if this value is null no check
   * will be perform.
   */
  minCharQuantity: PropTypes.number,
  /**
   * Which type of default validation should the input perform. It is recommended to use the provided ValidationTypes object to set this value.
   */
  validationType: PropTypes.oneOf(["none", "number", "email"]),
  /**
   * Overrides any validation with a specific error/warning message to set in the warningText slot.
   */
  externalWarningTextOverride: PropTypes.string
};

HvHelperText.defaultProps = {
  className: "",
  id: undefined,
  password: false,
  inputProps: {},
  inputRef: null,
  customFixedIcon: null,
  infoIcon: false,
  validationIconVisible: true,
  disableClear: false,
  validationIconPosition: "right",
  showInfo: true,
  validation: null,
  maxCharQuantity: null,
  minCharQuantity: null,
  validationType: "none",
  value: undefined,
  initialValue: undefined,
  autoFocus: false,
  validationState: validationState.empty,
  disabled: false,
  isRequired: false,
  suggestionListCallback: () => {},
  suggestionSelectedCallback: () => {},
  onChange: (event, value) => value,
  onBlur: () => {},
  onFocus: () => {},
  onKeyDown: () => {},
  externalWarningTextOverride: null
};

export default withStyles(styles, { name: "HvHelperText" })(
  withLabels(DEFAULT_LABELS)(withId(HvHelperText))
);

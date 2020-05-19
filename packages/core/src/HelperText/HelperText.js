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
import validationStates from "./validationStates";
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

/**
 * An input is a graphicl control element that allows the user to write text.
 */
class HvHelperText extends React.Component {
  constructor(props) {
    super(props);
    const { validationState, value, initialValue, labels } = props;
    this.materialInputRef = React.createRef();
    this.state = {
      validationState,
      currentValidationStateProps: validationState,
      value: value || initialValue,
      suggestionValues: null,
      warningText: validationState === validationStates.invalid ? labels.warningText : null
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value: nextValue, validationState } = nextProps;
    const { value: oldValue, currentValidationStateProps: validationStateProp } = prevState;

    let returnState = null;

    if (nextValue !== undefined && nextValue !== oldValue) {
      returnState = {
        value: nextValue
      };
    }
    if (validationState !== undefined && validationState !== validationStateProp) {
      returnState = {
        validationState,
        currentValidationStateProps:
          validationState !== validationStateProp ? validationStateProp : validationState
      };
    }
    return returnState;
  }

  /**
   * Updates the states while the input is being entered.
   *
   * @param {String} value - the inputted value.
   * @param {*} warningText - the error text below the input.
   */
  manageInputValueState = (value, warningText) => {
    this.setState({
      validationState: value && value !== "" ? validationStates.filled : validationStates.empty,
      warningText,
      value
    });
  };

  /**
   * Looks for the node that represent the input inside the material tree and focus it.
   */
  focusInput = () => {
    this.materialInputRef.current.focus();
  };

  /**
   * Clears the input value from the state and refocus the input.
   *
   * Note: given than the input component from material doesn't offer any api to focus
   * this timeout with a node focus was used to solve the problem
   * because the reference to the input is lost when the component is updated.
   */
  handleClear = () => {
    const { onChange } = this.props;
    const value = "";
    onChange(null, value);
    this.manageInputValueState(value, null);
    setTimeout(() => {
      this.focusInput();
    });
  };

  /**
   * clears the suggestion array.
   */
  suggestionClearHandler = () => {
    this.setState({
      suggestionValues: null
    });
  };

  /**
   * fills of the suggestion array.
   */
  suggestionHandler = value => {
    const { suggestionListCallback } = this.props;
    const suggestionsArray = suggestionListCallback(value);
    if (
      !isNil(suggestionsArray) &&
      Array.isArray(suggestionsArray) &&
      !isNil(suggestionsArray[0].label)
    ) {
      this.setState({
        suggestionValues: suggestionsArray
      });
    } else {
      this.suggestionClearHandler();
    }
  };

  /**
   * Executes the user callback adds the selection to the state and clears the suggestions.
   */
  suggestionSelectedHandler = (event, item) => {
    const { suggestionSelectedCallback } = this.props;
    this.manageInputValueState(item.label);
    this.focusInput();
    this.suggestionClearHandler();
    suggestionSelectedCallback(item);
  };

  /**
   * Updates the state while is being inputted, also executes the user onChange
   * allowing the customization of the input if required.
   *
   * @param {Object} event - The event provided by the material ui input
   */
  onChangeHandler = event => {
    const { onChange } = this.props;
    const { value } = event.target;
    const newValue = onChange(event, value);
    this.suggestionHandler(value);
    this.manageInputValueState(newValue, null);
  };

  /**
   * Validates the input updating the state and modifying the info text, also executes
   * the user provided onBlur passing the current validation status and value.
   *
   * @returns {undefined}
   */
  onInputBlurHandler = () => {
    const { value } = this.state;
    const { onBlur, labels, isRequired } = this.props;
    const { validation, validationType, minCharQuantity, maxCharQuantity } = this.props;

    let validationState;
    let warningText = null;

    if (!value || value === "") {
      if (isRequired) {
        validationState = validationStates.invalid;
        warningText = labels.requiredWarningText;
      } else {
        validationState = validationStates.empty;
      }
    } else {
      const valueSizeStatus = validateCharLength(value, maxCharQuantity, minCharQuantity);
      const valid = validateInput(value, validation, validationType);

      if (valid && valueSizeStatus) {
        validationState = validationStates.valid;
      } else if (!valid || !valueSizeStatus) {
        validationState = validationStates.invalid;

        if (maxCharQuantity && value.length > maxCharQuantity) {
          warningText = labels.maxCharQuantityWarningText;
        } else if (minCharQuantity && value.length < minCharQuantity) {
          warningText = labels.minCharQuantityWarningText;
        } else {
          // eslint-disable-next-line prefer-destructuring
          warningText = labels.warningText;
        }
      }
    }

    this.setState({ validationState, warningText });
    onBlur(value, validationState);
  };

  /**
   * Updates the state putting again the value from the state because the input value is
   * not automatically manage, it also executes the onFocus function from the user passing the value
   */
  onFocusHandler = () => {
    const { value } = this.state;
    const { onFocus } = this.props;
    this.manageInputValueState(value, null);
    onFocus(value);
  };

  /**
   * Focus the suggestion list when the arrow down is pressed.
   *
   * @param {Object} event - The event provided by the material ui input
   */
  onKeyDownHandler = event => {
    const { onKeyDown } = this.props;
    const { value } = this.state;
    if (isKeypress(event, KeyboardCodes.ArrowDown)) {
      this.node.getElementsByTagName("LI")[0].focus();
    }
    onKeyDown(event, value);
  };

  /**
   * Clears the suggestion list on blur.
   *
   * @param {Object} event - The event provided by the material ui input.
   */
  onContainerBlurHandler = event => {
    if (isNil(event.relatedTarget)) {
      // workaround because IE 11
      if (isBrowser("ie")) {
        setTimeout(this.suggestionClearHandler, 100);
      } else {
        this.suggestionClearHandler();
      }
    }
  };

  getInputAdornment = (
    inputId,
    classes,
    showValidationIcon,
    stateValidationState,
    showClear,
    clearButtonLabel,
    customFixedIcon
  ) => {
    if (!showValidationIcon && !showClear && isNil(customFixedIcon)) {
      // nothing to show
      return null;
    }

    return (
      <InputAdornment
        inputId={inputId}
        classes={classes}
        showValidationIcon={showValidationIcon}
        validationState={stateValidationState}
        showClear={showClear}
        handleClear={() => this.handleClear()}
        clearButtonLabel={clearButtonLabel}
        customFixedIcon={customFixedIcon}
      />
    );
  };

  render() {
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
      inputProps,
      inputRef,
      onChange,
      onBlur,
      onFocus,
      onKeyDown,
      suggestionSelectedCallback,
      suggestionListCallback,
      value,
      autoFocus,
      initialValue,
      ...others
    } = this.props;

    const {
      validationState: stateValidationState,
      value: stateValue,
      warningText,
      suggestionValues
    } = this.state;

    // show the validation icon only if the input is enabled, validationIconVisible and showInfo are true and:
    // - the input have some sort of validation
    // - also if states is invalid (even if there is no validation, because that would mean it had to be explicity set like that)
    const showValidationIcon =
      !disabled &&
      validationIconVisible &&
      showInfo &&
      (stateValidationState === validationStates.invalid ||
        validationType !== validationTypes.none ||
        maxCharQuantity !== null ||
        minCharQuantity !== null ||
        validation !== null);

    // show the clear button only if the input is enabled, disableClear is false and the input is not empty
    const showClear = !disabled && !disableClear && stateValue != null && stateValue !== "";

    const adornment = this.getInputAdornment(
      `${id}-input`,
      classes,
      showValidationIcon,
      stateValidationState,
      showClear,
      labels.clearButtonLabel,
      customFixedIcon
    );

    const IconDisplay = () => (
      <div aria-hidden="true" className={classes.infoIconContainer}>
        <InfoS />
      </div>
    );
    const InfoIcon = withTooltips(IconDisplay, labels.infoText);

    return (
      <div
        ref={node => {
          this.node = node;
        }}
        className={clsx(classes.root, className)}
        id={id}
        onBlur={this.onContainerBlurHandler}
      >
        <div className={classes.labelContainer}>
          {labels.inputLabel && (
            <HvTypography
              variant="labelText"
              component="label"
              id={`${id}-label`}
              htmlFor={`${id}-input`}
              className={clsx(classes.label, {
                [classes.labelDisabled]: disabled
              })}
            >
              {labels.inputLabel}
              {isRequired && <span aria-hidden="true">*</span>}
            </HvTypography>
          )}

          {showInfo && infoIcon && labels.infoText && <InfoIcon />}
        </div>

        <Input
          id={`${id}-input`}
          aria-describedby={showInfo && labels.infoText ? `${id}-description` : undefined}
          autoFocus={autoFocus}
          onKeyDown={this.onKeyDownHandler}
          onBlur={this.onInputBlurHandler}
          onFocus={this.onFocusHandler}
          value={stateValue}
          disabled={disabled}
          placeholder={labels.placeholder || undefined}
          type={password ? "password" : "text"}
          classes={{
            input: classes.input,
            focused: classes.inputRootFocused,
            disabled: classes.inputDisabled,
            multiline: classes.multiLine
          }}
          className={clsx(classes.inputRoot, {
            [classes.inputRootDisabled]: disabled,
            [classes.inputRootInvalid]: stateValidationState === validationStates.invalid
          })}
          onChange={this.onChangeHandler}
          inputProps={{
            required: isRequired,
            ref: this.materialInputRef,
            "aria-required": isRequired || undefined,
            "aria-invalid": stateValidationState === validationStates.invalid || undefined,
            ...inputProps
          }}
          inputRef={inputRef}
          {...(validationIconPosition === "right" && {
            endAdornment: adornment
          })}
          {...(validationIconPosition === "left" && {
            startAdornment: adornment
          })}
          {...others}
        />

        {suggestionValues && (
          <div className={classes.suggestionsContainer}>
            <div className={classes.suggestionList}>
              <HvList
                values={suggestionValues}
                onClick={this.suggestionSelectedHandler}
                selectable={false}
                condensed
              />
            </div>
          </div>
        )}

        {showInfo && labels.infoText && (
          <HvTypography
            id={`${id}-description`}
            variant="infoText"
            className={clsx(classes.infoText)}
            style={{
              display:
                !infoIcon && stateValidationState !== validationStates.invalid ? "block" : "none"
            }}
          >
            {labels.infoText}
          </HvTypography>
        )}

        <HvTypography
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
        </HvTypography>
      </div>
    );
  }
}

HvInput.propTypes = {
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

HvInput.defaultProps = {
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
  validationState: validationStates.empty,
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

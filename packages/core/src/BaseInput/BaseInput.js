import React, { useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Input, withStyles } from "@material-ui/core";
import { refType } from "../utils";
import styles from "./styles";

import {
  HvFormElementContext,
  HvFormElementDescriptorsContext,
  buildFormElementPropsFromContext,
  buildAriaPropsFromContext,
} from "../Forms/FormElement";

/**
 * An Input component that only posses the most basic functionalities.
 * It should be used alongside the other form elements to construct a proper accessible form.
 */
const HvBaseInput = (props) => {
  const {
    classes,
    className = "",

    id,
    name,

    value,
    defaultValue,

    required,
    readOnly,
    disabled,

    onChange,

    type = "text",

    placeholder,

    multiline = false,
    resizable = false,
    invalid = false,

    inputRef,
    inputProps = {},

    ...others
  } = props;

  const formElementContext = useContext(HvFormElementContext);
  const formElementProps = buildFormElementPropsFromContext(props, formElementContext);

  const localInvalid = invalid || formElementProps.status === "invalid";

  const formElementDescriptorsContext = useContext(HvFormElementDescriptorsContext);
  const ariaProps = buildAriaPropsFromContext(
    inputProps,
    formElementDescriptorsContext,
    localInvalid,
    id
  );

  const onChangeHandler = (event) => {
    onChange?.(event, event.target.value);
  };

  return (
    <div
      className={clsx(classes.root, className, {
        [classes.disabled]: formElementProps.disabled,
        [classes.invalid]: localInvalid,
        [classes.resizable]: multiline && resizable,
        [classes.readOnly]: readOnly,
      })}
    >
      <Input
        id={id}
        name={formElementProps.name}
        value={value}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        readOnly={formElementProps.readOnly}
        disabled={formElementProps.disabled}
        onChange={onChangeHandler}
        classes={{
          root: classes.inputRoot,
          focused: classes.inputRootFocused,
          disabled: classes.inputRootDisabled,
          multiline: classes.inputRootMultiline,
          input: clsx(classes.input, {
            [classes.inputResizable]: !formElementProps.disabled && resizable,
            [classes.inputDisabled]: disabled,
          }),
        }}
        inputProps={{
          // avoid the required attribute at the root node
          required: formElementProps.required,
          ...inputProps,
          ...ariaProps,
        }}
        inputRef={inputRef}
        multiline={multiline}
        rows={10}
        {...others}
      />
      {!multiline && <div role="presentation" className={classes.inputBorderContainer} />}
    </div>
  );
};

HvBaseInput.formElementType = "input";

HvBaseInput.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root container of the input.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the root container of the input when it is disabled.
     */
    disabled: PropTypes.string,
    /**
     * Styles applied to the root container of the input when it is invalid.
     */
    invalid: PropTypes.string,
    /**
     * Styles applied to the root container of the input when it is resizable.
     */
    resizable: PropTypes.string,

    /**
     * Styles applied to input root which is the input that encloses all the other elements.
     */
    inputRoot: PropTypes.string,
    /**
     * Styles applied to input root when it is focused.
     */
    inputRootFocused: PropTypes.string,
    /**
     * Styles applied to input html element when it is disabled.
     */
    inputRootDisabled: PropTypes.string,
    /**
     * Styles applied to input html element when it is multiline mode.
     */
    inputRootMultiline: PropTypes.string,

    /**
     * Styles applied to input html element.
     */
    input: PropTypes.string,
    /**
     * Styles applied to input html element when is disabled.
     */
    inputDisabled: PropTypes.string,
    /**
     * Styles applied to input html element when it is resizable.
     */
    inputResizable: PropTypes.string,

    /**
     * Styles applied to the container of the border element.
     */
    inputBorderContainer: PropTypes.string,
    /**
     * Styles applied to the container of the border element, when in read only mode.
     */
    readOnly: PropTypes.string,
  }).isRequired,

  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * The input name.
   */
  name: PropTypes.string,

  /**
   * The value of the input, when controlled.
   */
  value: PropTypes.string,
  /**
   * The initial value of the input, when uncontrolled.
   */
  defaultValue: PropTypes.string,

  /**
   * If `true` the input is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Indicates that the input is not editable.
   */
  readOnly: PropTypes.bool,
  /**
   * If true, the input element will be required.
   */
  required: PropTypes.bool,

  /**
   * The function that will be executed onChange, allows modification of the input,
   * it receives the value. If a new value should be presented it must returned it.
   */
  onChange: PropTypes.func,

  /**
   * The input type.
   */
  type: PropTypes.string,

  /**
   * Label inside the input used to help user.
   */
  placeholder: PropTypes.string,

  /**
   * If true, a textarea element will be rendered.
   */
  multiline: PropTypes.bool,
  /**
   * If true and multiline is also true the textarea element will be resizable.
   */
  resizable: PropTypes.bool,
  /**
   * Denotes if the input is in an invalid state.
   */
  invalid: PropTypes.bool,

  /**
   * Attributes applied to the input element.
   */
  inputProps: PropTypes.instanceOf(Object),
  /**
   * Allows passing a ref to the underlying input
   */
  inputRef: refType,
};

export default withStyles(styles, { name: "HvBaseInput" })(HvBaseInput);

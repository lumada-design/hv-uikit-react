import { useContext } from "react";

import {
  InputBaseComponentProps as MuiInputBaseComponentProps,
  InputBaseProps,
} from "@mui/material/InputBase";
import MuiInput, { InputProps as MuiInputProps } from "@mui/material/Input";

import { css as emotionCss, Global } from "@emotion/react";

import { theme } from "@hitachivantara/uikit-styles";

import { ExtractNames } from "@core/utils/classes";
import {
  HvFormElementContext,
  HvFormElementDescriptorsContext,
  buildFormElementPropsFromContext,
  buildAriaPropsFromContext,
} from "@core/components/Forms";
import { useDefaultProps } from "@core/hooks/useDefaultProps";

import { staticClasses, useClasses } from "./BaseInput.styles";

export { staticClasses as baseInputClasses };

export type HvBaseInputClasses = ExtractNames<typeof useClasses>;

// Global styles for the base input.
const baseInputStyles = emotionCss({
  "input:-webkit-autofill": {
    WebkitBoxShadow: `0 0 0px 1000px ${theme.colors.atmo1} inset`,
    WebkitTextFillColor: theme.colors.secondary,
  },

  // Clears number input up/down arrows in Chrome and Firefox
  "input::-webkit-outer-spin-button,input::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "input[type=number]": {
    MozAppearance: "textfield",
  },

  // Clears time input clock in Chrome
  "input::-webkit-calendar-picker-indicator": {
    display: "none",
  },

  // Clears search input clear button in Chrome
  "input::-webkit-search-decoration,input::-webkit-search-cancel-button,input::-webkit-search-results-button,input::-webkit-search-results-decoration":
    {
      display: "none",
    },
});

export interface HvBaseInputProps
  extends Omit<MuiInputProps, "onChange" | "classes"> {
  /** The input name. */
  name?: string;
  /** The value of the input, when controlled. */
  value?: string;
  /** The initial value of the input, when uncontrolled. */
  defaultValue?: string;
  /** If `true` the input is disabled. */
  disabled?: boolean;
  /** Indicates that the input is not editable. */
  readOnly?: boolean;
  /** If true, the input element will be required. */
  required?: boolean;
  /** The function that will be executed onChange, allows modification of the input,
   * it receives the value. If a new value should be presented it must returned it. */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string
  ) => void;
  /** The input type. */
  type?: string;
  /** Label inside the input used to help user. */
  placeholder?: string;
  /** If true, a textarea element will be rendered. */
  multiline?: boolean;
  /** If true and multiline is also true the textarea element will be resizable. */
  resizable?: boolean;
  /** Denotes if the input is in an invalid state. */
  invalid?: boolean;
  /** Attributes applied to the input element. */
  inputProps?: MuiInputBaseComponentProps;
  /** Allows passing a ref to the underlying input */
  inputRef?: InputBaseProps["inputRef"];
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvBaseInputClasses;
}

/**
 * An Input component that only posses the most basic functionalities.
 * It should be used alongside the other form elements to construct a proper accessible form.
 */
export const HvBaseInput = (props: HvBaseInputProps) => {
  const {
    classes: classesProp,
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
  } = useDefaultProps("HvBaseInput", props);
  const { classes, cx } = useClasses(classesProp);
  const formElementContext = useContext(HvFormElementContext);
  const formElementProps = buildFormElementPropsFromContext(
    name,
    disabled,
    readOnly,
    required,
    formElementContext
  );

  const localInvalid = invalid || formElementProps.status === "invalid";

  const formElementDescriptorsContext = useContext(
    HvFormElementDescriptorsContext
  );
  const ariaProps = buildAriaPropsFromContext(
    inputProps,
    formElementDescriptorsContext,
    localInvalid,
    id
  );

  const onChangeHandler: MuiInputProps["onChange"] = (event) => {
    onChange?.(event, event.target.value);
  };

  return (
    <>
      <Global styles={baseInputStyles} />
      <div
        className={cx(classes.root, className, {
          [classes.disabled]: formElementProps.disabled,
          [classes.invalid]: localInvalid,
          [classes.resizable]: multiline && resizable,
          [classes.readOnly]: formElementProps.readOnly,
        })}
      >
        <MuiInput
          id={id}
          name={formElementProps.name}
          value={value}
          defaultValue={defaultValue}
          type={type}
          placeholder={placeholder}
          readOnly={!!formElementProps.readOnly}
          disabled={formElementProps.disabled}
          onChange={onChangeHandler}
          className={cx({
            [classes.inputRootInvalid]: localInvalid,
            [classes.inputRootReadOnly]: formElementProps.readOnly,
          })}
          classes={{
            root: classes.inputRoot,
            focused: classes.inputRootFocused,
            disabled: classes.inputRootDisabled,
            multiline: classes.inputRootMultiline,
            input: cx(classes.input, {
              [classes.inputResizable]: !formElementProps.disabled && resizable,
              [classes.inputDisabled]: formElementProps.disabled,
              [classes.inputReadOnly]: formElementProps.readOnly,
            }),
          }}
          inputProps={{
            // Avoid the required attribute at the root node
            required: formElementProps.required,
            ...inputProps,
            ...ariaProps,
          }}
          inputRef={inputRef}
          multiline={multiline}
          rows={10}
          {...others}
        />
        {!multiline && (
          <div role="presentation" className={classes.inputBorderContainer} />
        )}
      </div>
    </>
  );
};

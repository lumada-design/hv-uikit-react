import { RefObject, useContext } from "react";
import {
  InputBaseComponentProps as MuiInputBaseComponentProps,
  InputProps as MuiInputProps,
  Input as MuiInput,
} from "@mui/material";
import { HvBaseProps } from "@core/types";
import {
  HvFormElementContext,
  HvFormElementDescriptorsContext,
  buildFormElementPropsFromContext,
  buildAriaPropsFromContext,
} from "@core/components";
import { ClassNames, css as emotionCss, Global } from "@emotion/react";
import { theme } from "@hitachivantara/uikit-styles";
import baseInputClasses, { HvBaseInputClasses } from "./baseInputClasses";
import { styles } from "./BaseInput.styles";

// Global styles for the base input.
const baseInputStyles = emotionCss({
  "input:-webkit-autofill": {
    WebkitBoxShadow: `0 0 0px 1000px ${theme.colors.atmo1} inset`,
    WebkitTextFillColor: theme.colors.secondary,
  },

  // Clears number input up/down arrows in Chrome and Firefox
  "input::-webkit-outer-spin-button,\
  input::-webkit-inner-spin-button": {
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
  "input::-webkit-search-decoration,\
  input::-webkit-search-cancel-button,\
  input::-webkit-search-results-button,\
  input::-webkit-search-results-decoration": {
    display: "none",
  },
});

export interface HvBaseInputProps
  extends Omit<MuiInputProps, "onChange" | "classes">,
    HvBaseProps<
      HTMLDivElement,
      | "onChange"
      | "color"
      | "onBlur"
      | "onFocus"
      | "onInvalid"
      | "onKeyDown"
      | "onKeyUp"
    > {
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
  inputRef?: RefObject<HTMLElement>;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvBaseInputClasses;
}

/**
 * An Input component that only posses the most basic functionalities.
 * It should be used alongside the other form elements to construct a proper accessible form.
 */
export const HvBaseInput = ({
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
}: HvBaseInputProps) => {
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

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange?.(event, event.target.value);
  };

  return (
    <ClassNames>
      {({ css, cx }) => (
        <>
          <Global styles={baseInputStyles} />
          <div
            className={cx(
              baseInputClasses.root,
              formElementProps.disabled && baseInputClasses.disabled,
              localInvalid && baseInputClasses.invalid,
              multiline && resizable && baseInputClasses.resizable,
              formElementProps.readOnly && baseInputClasses.readOnly,
              css(styles.root),
              formElementProps.disabled && css(styles.disabled),
              localInvalid && css(styles.invalid),
              multiline && resizable && css(styles.resizable),
              formElementProps.readOnly && css(styles.readOnly),
              className,
              classes?.root,
              formElementProps.disabled && classes?.disabled,
              localInvalid && classes?.invalid,
              multiline && resizable && classes?.resizable,
              formElementProps.readOnly && classes?.readOnly
            )}
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
              className={cx(
                localInvalid && baseInputClasses.inputRootInvalid,
                formElementProps.readOnly && baseInputClasses.inputRootReadOnly,
                localInvalid && css(styles.inputRootInvalid),
                formElementProps.readOnly && css(styles.inputRootReadOnly),
                localInvalid && classes?.inputRootInvalid,
                formElementProps.readOnly && classes?.inputRootReadOnly
              )}
              classes={{
                root: cx(
                  baseInputClasses.inputRoot,
                  css(styles.inputRoot),
                  classes?.inputRoot
                ),
                focused: cx(
                  baseInputClasses.inputRootFocused,
                  css(styles.inputRootFocused),
                  classes?.inputRootFocused
                ),
                disabled: cx(
                  baseInputClasses.inputRootDisabled,
                  css(styles.inputRootDisabled),
                  classes?.inputRootDisabled
                ),
                multiline: cx(
                  baseInputClasses.inputRootMultiline,
                  css(styles.inputRootMultiline),
                  classes?.inputRootMultiline
                ),
                input: cx(
                  baseInputClasses.input,
                  !formElementProps.disabled &&
                    resizable &&
                    baseInputClasses.inputResizable,
                  formElementProps.disabled && baseInputClasses.inputDisabled,
                  formElementProps.readOnly && baseInputClasses.inputReadOnly,
                  css(styles.input),
                  !formElementProps.disabled &&
                    resizable &&
                    css(styles.inputResizable),
                  formElementProps.disabled && css(styles.inputDisabled),
                  formElementProps.readOnly && css(styles.inputReadOnly),
                  classes?.input,
                  !formElementProps.disabled &&
                    resizable &&
                    classes?.inputResizable,
                  formElementProps.disabled && classes?.inputDisabled,
                  formElementProps.readOnly && classes?.inputReadOnly
                ),
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
              <div
                role="presentation"
                className={cx(
                  baseInputClasses.inputBorderContainer,
                  css(styles.inputBorderContainer),
                  classes?.inputBorderContainer
                )}
              />
            )}
          </div>
        </>
      )}
    </ClassNames>
  );
};

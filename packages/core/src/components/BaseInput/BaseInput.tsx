import { RefObject, useContext } from "react";
import {
  InputBaseComponentProps as MuiInputBaseComponentProps,
  InputProps as MuiInputProps,
} from "@mui/material";
import { HvBaseProps } from "../../types";
import {
  StyledRoot,
  StyledInputBorderContainer,
  StyledInput,
} from "./BaseInput.styles";
import {
  HvFormElementContext,
  HvFormElementDescriptorsContext,
  buildFormElementPropsFromContext,
  buildAriaPropsFromContext,
} from "../Forms/FormElement";
import clsx from "clsx";
import baseInputClasses, { HvBaseInputClasses } from "./baseInputClasses";
import { css, Global } from "@emotion/react";
import { theme } from "@hitachivantara/uikit-styles";

// Global styles for the base input.
const baseInputStyles = css({
  "input:-webkit-autofill": {
    "-webkit-box-shadow": `0 0 0px 1000px ${theme.colors.atmo1} inset`,
    "-webkit-text-fill-color": theme.colors.acce1,
  },

  /* Clears input's clear and reveal buttons from IE */
  "input[type=search]::-ms-clear": {
    display: "none",
    width: 0,
    height: 0,
  },
  "input[type=search]::-ms-reveal": {
    display: "none",
    width: 0,
    height: 0,
  },

  /* Clears input's clear button from Chrome */
  "input[type=search]::-webkit-search-decoration": { display: "none" },
  "input[type=search]::-webkit-search-cancel-button": { display: "none" },
  "input[type=search]::-webkit-search-results-button": {
    display: "none",
  },
  "input[type=search]::-webkit-search-results-decoration": {
    display: "none",
  },
});

export type HvBaseInputProps = Omit<MuiInputProps, "onChange"> &
  HvBaseProps<HTMLDivElement, { onChange }> & {
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
    /** A Jss Object used to override or extend the styles applied to the empty state component. */
    classes?: HvBaseInputClasses;
  };

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
    status,
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
    <>
      <Global styles={baseInputStyles} />
      <StyledRoot
        className={clsx(
          baseInputClasses.root,
          classes?.root,
          className,
          formElementProps.disabled &&
            clsx(baseInputClasses.disabled, classes?.disabled),
          localInvalid && clsx(baseInputClasses.invalid, classes?.invalid),
          multiline &&
            resizable &&
            clsx(baseInputClasses.resizable, classes?.resizable),
          readOnly && clsx(baseInputClasses.readOnly, classes?.readOnly)
        )}
        $disabled={formElementProps.disabled}
        $invalid={localInvalid}
        $resizable={multiline && resizable}
        $readOnly={!!readOnly}
      >
        <StyledInput
          id={id}
          name={formElementProps.name}
          value={value}
          defaultValue={defaultValue}
          type={type}
          placeholder={placeholder}
          readOnly={!!formElementProps.readOnly}
          disabled={formElementProps.disabled}
          onChange={onChangeHandler}
          className={clsx(
            localInvalid && baseInputClasses.inputRootInvalid,
            readOnly && baseInputClasses.inputRootReadOnly
          )}
          classes={{
            root: clsx(baseInputClasses.inputRoot, classes?.inputRoot),
            focused: clsx(
              baseInputClasses.inputRootFocused,
              classes?.inputRootFocused
            ),
            disabled: clsx(
              baseInputClasses.inputRootDisabled,
              classes?.inputRootDisabled
            ),
            multiline: clsx(
              baseInputClasses.inputRootMultiline,
              classes?.inputRootMultiline
            ),
            input: clsx(
              baseInputClasses.input,
              classes?.input,
              !formElementProps.disabled &&
                resizable &&
                clsx(baseInputClasses.inputResizable, classes?.inputResizable),
              disabled &&
                clsx(baseInputClasses.inputDisabled, classes?.inputDisabled),
              readOnly &&
                clsx(baseInputClasses.inputReadOnly, classes?.readOnly)
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
          $resizable={!formElementProps.disabled && resizable}
          $disabled={!!disabled}
          $readOnly={!!readOnly}
          $invalid={localInvalid}
          {...others}
        />
        {!multiline && (
          <StyledInputBorderContainer
            role="presentation"
            className={clsx(
              baseInputClasses.inputBorderContainer,
              classes?.inputBorderContainer
            )}
          />
        )}
      </StyledRoot>
    </>
  );
};

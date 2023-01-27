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
    classes?: {
      /** Styles applied to the root container of the input. */
      root?: string;
      /** Styles applied to the root container of the input when it is disabled. */
      disabled?: string;
      /** Styles applied to the root container of the input when it is invalid. */
      invalid?: string;
      /** Styles applied to the root container of the input when it is resizable. */
      resizable?: string;
      /** Styles applied to input root which is the input that encloses all the other elements. */
      inputRoot?: string;
      /** Styles applied to input root when it is focused. */
      inputRootFocused?: string;
      /** Styles applied to input html element when it is disabled. */
      inputRootDisabled?: string;
      /** Styles applied to input html element when it is multiline mode. */
      inputRootMultiline?: string;
      /** Styles applied to input html element. */
      input?: string;
      /** Styles applied to input html element when is disabled. */
      inputDisabled?: string;
      /** Styles applied to input html element when it is resizable. */
      inputResizable?: string;
      /** Styles applied to the container of the border element. */
      inputBorderContainer?: string;
      /** Styles applied to the container of the border element, when in read only mode. */
      readOnly?: string;
    };
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
    <StyledRoot
      className={clsx(
        "root",
        classes?.root,
        className,
        formElementProps.disabled && classes?.disabled,
        localInvalid && classes?.invalid,
        multiline && resizable && classes?.resizable,
        readOnly && classes?.readOnly
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
          localInvalid && "inputRootInvalid",
          readOnly && "inputRootReadOnly"
        )}
        classes={{
          root: clsx("inputRoot", classes?.inputRoot),
          focused: clsx("inputRootFocused", classes?.inputRootFocused),
          disabled: clsx("inputRootDisabled", classes?.inputRootDisabled),
          multiline: clsx("inputRootMultiline", classes?.inputRootMultiline),
          input: clsx(
            "input",
            classes?.input,
            !formElementProps.disabled &&
              resizable &&
              clsx("inputResizable", classes?.inputResizable),
            disabled && clsx("inputDisabled", classes?.inputDisabled),
            readOnly && "readOnly" && classes?.readOnly
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
            "inputBorderContainer",
            classes?.inputBorderContainer
          )}
        />
      )}
    </StyledRoot>
  );
};

import { forwardRef, useContext } from "react";
import MuiInputBase, { type InputBaseProps } from "@mui/material/InputBase";
import { useForkRef } from "@mui/material/utils";
import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import {
  buildAriaPropsFromContext,
  buildFormElementPropsFromContext,
  HvFormElementContext,
  HvFormElementDescriptorsContext,
} from "../FormElement";
import { staticClasses, useClasses } from "./BaseInput.styles";

export { staticClasses as baseInputClasses };

export type HvBaseInputClasses = ExtractNames<typeof useClasses>;

export interface HvBaseInputProps
  extends Omit<
    InputBaseProps,
    "onChange" | "classes" | "ref" | "color" | "size"
  > {
  /** The input name. */
  name?: string;
  /** The value of the input, when controlled. */
  value?: React.InputHTMLAttributes<HTMLInputElement>["value"];
  /** The initial value of the input, when uncontrolled. */
  defaultValue?: React.InputHTMLAttributes<HTMLInputElement>["value"];
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
    value: string,
  ) => void;
  /** If true, a textarea element will be rendered. */
  multiline?: boolean;
  /** If true and multiline is also true the textarea element will be resizable. */
  resizable?: boolean;
  /** Denotes if the input is in an invalid state. */
  invalid?: boolean;
  /**
   * Allows passing a ref to the underlying input
   * @deprecated Use `ref` directly instead
   * */
  inputRef?: InputBaseProps["inputRef"];
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvBaseInputClasses;
}

/**
 * An Input component that only posses the most basic functionalities.
 * It should be used alongside the other form elements to construct a proper accessible form.
 */
export const HvBaseInput = forwardRef<
  // no-indent
  React.ElementRef<"input">,
  HvBaseInputProps
>(function HvBaseInput(props, ref) {
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
    multiline,
    resizable,
    invalid: invalidProp,
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
    formElementContext,
  );

  const forkedRef = useForkRef(ref, inputRef);

  const invalid = invalidProp || formElementProps.status === "invalid";

  const formElementDescriptorsContext = useContext(
    HvFormElementDescriptorsContext,
  );
  const ariaProps = buildAriaPropsFromContext(
    inputProps,
    formElementDescriptorsContext,
    invalid,
    id,
  );

  return (
    <MuiInputBase
      id={id}
      name={formElementProps.name}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      readOnly={!!formElementProps.readOnly}
      disabled={formElementProps.disabled}
      onChange={(event) => onChange?.(event, event.target.value)}
      className={cx(classes.root, classes.inputRoot, className, {
        [classes.inputRootMultiline]: multiline,
        [classes.multiline]: multiline,
        [classes.inputRootInvalid]: invalid,
        [classes.invalid]: invalid,
        [classes.inputRootReadOnly]: formElementProps.readOnly,
        [classes.readOnly]: formElementProps.readOnly,
        [classes.inputRootDisabled]: formElementProps.disabled,
        [classes.disabled]: formElementProps.disabled,
      })}
      classes={{
        focused: cx(classes.focused, classes.inputRootFocused),
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
      inputRef={forkedRef}
      multiline={multiline}
      {...(multiline ? { rows: 10 } : { type })}
      {...others}
    />
  );
});

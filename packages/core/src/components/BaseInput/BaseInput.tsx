import { Ref, useContext } from "react";

import {
  Input as MuiBaseInput,
  InputInputSlotPropsOverrides as MuiBaseInputInputSlotPropsOverrides,
  InputOwnerState as MuiBaseInputOwnerState,
  InputProps as MuiBaseInputProps,
} from "@mui/base/Input";

import { css as emotionCss, Global } from "@emotion/react";

import { theme } from "@hitachivantara/uikit-styles";

import { SlotComponentProps } from "@mui/base/utils/types";

import { HvBaseProps } from "@core/types/generic";
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
  extends Omit<MuiBaseInputProps, "onChange">,
    HvBaseProps<
      HTMLDivElement,
      | "onChange"
      | "color"
      | "onBlur"
      | "onFocus"
      | "onInvalid"
      | "onKeyDown"
      | "onKeyUp"
      | "onClick"
    > {
  /** The initial value of the input, when uncontrolled. */
  defaultValue?: string;
  /** The function that will be executed onChange, allows modification of the input,
   * it receives the value. If a new value should be presented it must returned it. */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string
  ) => void;
  /** If true, a textarea element will be rendered. */
  resizable?: boolean;
  /** Denotes if the input is in an invalid state. */
  invalid?: boolean;
  /** Attributes applied to the input element. */
  inputProps?: SlotComponentProps<
    "input",
    MuiBaseInputInputSlotPropsOverrides,
    MuiBaseInputOwnerState
  >;
  /** Allows passing a ref to the underlying input */
  inputRef?: Ref<HTMLInputElement | HTMLTextAreaElement>;
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
    type,
    placeholder,
    multiline = false,
    resizable = false,
    invalid = false,
    inputRef,
    inputProps = {},
    rows = 10,
    minRows,
    maxRows,
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

  const onChangeHandler: MuiBaseInputProps["onChange"] = (event) => {
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
        <MuiBaseInput
          id={id}
          name={formElementProps.name}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          readOnly={!!formElementProps.readOnly}
          disabled={formElementProps.disabled}
          onChange={onChangeHandler}
          slotProps={{
            root: {
              className: cx(classes.inputRoot, {
                [classes.inputRootInvalid]: localInvalid,
                [classes.inputRootReadOnly]: formElementProps.readOnly,
                [classes.inputDisabled]: disabled,
                [classes.inputRootMultiline]: multiline,
              }),
            },
            input: {
              className: cx(classes.input, {
                [classes.inputResizable]:
                  !formElementProps.disabled && resizable,
                [classes.inputDisabled]: formElementProps.disabled,
                [classes.inputReadOnly]: formElementProps.readOnly,
              }),
              // Avoid the required attribute at the root node
              required: formElementProps.required,
              ...inputProps,
              ...ariaProps,
            },
          }}
          inputRef={inputRef}
          {...(multiline
            ? { type: undefined, multiline, rows, minRows, maxRows }
            : { type, multiline })}
          // work around because material multiline type definition 'or'
          {...others}
        />
        {!multiline && (
          <div role="presentation" className={classes.inputBorderContainer} />
        )}
      </div>
    </>
  );
};

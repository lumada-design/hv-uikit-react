import React, { useLayoutEffect, useRef, useState } from "react";

import { Edit } from "@hitachivantara/uikit-react-icons";

import { useDefaultProps } from "@core/hooks/useDefaultProps";

import { HvBaseProps } from "@core/types/generic";
import { useControlled } from "@core/hooks/useControlled";
import { useTheme } from "@core/hooks/useTheme";
import { ExtractNames } from "@core/utils/classes";
import { isKey } from "@core/utils/keyboardUtils";
import { HvButtonProps, HvButton } from "@core/Button";
import {
  HvTypographyVariants,
  HvTypographyProps,
  HvTypography,
} from "@core/Typography";
import { HvInput, HvInputProps } from "@core/Input";

import { staticClasses, useClasses } from "./InlineEditor.styles";

export { staticClasses as inlineEditorClasses };

export type HvInlineEditorClasses = ExtractNames<typeof useClasses>;

export interface HvInlineEditorProps
  extends HvBaseProps<HTMLDivElement, "onBlur" | "onChange"> {
  /** The value of the form element. */
  value?: string;
  /** Whether the Edit icon should always be visible */
  showIcon?: boolean;
  /** Component to use as the input. The component "inherit" from `HvBaseInput` (such as `HvInput` or `HvTextArea`) */
  component?: React.ElementType;
  /** Variant of the HvTypography to display */
  variant?: HvTypographyVariants;
  /** Called when the input is blurred. */
  onBlur?: (
    event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>,
    value: string
  ) => void;
  /** Called when the input value changes. */
  onChange?: (event: React.SyntheticEvent, value: string) => void;
  /** Props passed to the HvButton component */
  buttonProps?: HvButtonProps;
  /** Props passed to the HvTypography text component */
  typographyProps?: HvTypographyProps;
  /** Whether the editor is disabled or not. */
  disabled?: boolean;
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: HvInlineEditorClasses;
  /** The placeholder value of the input. */
  placeholder?: string;
}

/**
 * An Inline Editor allows the user to edit a record without making a major switch
 * between viewing and editing, making it an efficient method of updating a record.
 */
export const HvInlineEditor = (props: HvInlineEditorProps) => {
  const {
    className,
    classes: classesProp,
    value: valueProp,
    defaultValue,
    showIcon,
    component: InputComponent = HvInput,
    variant = "body",
    placeholder = "Enter text",
    onBlur,
    onChange,
    onKeyDown,
    buttonProps,
    typographyProps,
    disabled,
    ...others
  } = useDefaultProps("HvInlineEditor", props);

  const { classes, cx } = useClasses(classesProp);
  const [value, setValue] = useControlled(valueProp, defaultValue);
  const [editMode, setEditMode] = useState(false);
  const [cachedValue, setCachedValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>();
  const { activeTheme } = useTheme();

  const typographyStyles = activeTheme?.typography[variant] || {};
  const { lineHeight } = typographyStyles;

  useLayoutEffect(() => {
    const input = inputRef.current;
    if (editMode && input) {
      input.focus();
      input.select();
    }
  }, [editMode]);

  const handleClick = () => {
    setEditMode(true);
    setCachedValue(value);
  };

  const handleBlur: HvInputProps["onBlur"] = (event) => {
    setEditMode(false);

    const newValue = value || cachedValue; // empty values should be ignored
    setValue(newValue);
    onBlur?.(event, newValue);
  };

  const handleKeyDown: HvInputProps["onKeyDown"] = (event) => {
    if (isKey(event, "Esc")) {
      setEditMode(false);
      setValue(cachedValue);
    }
    onKeyDown?.(event as any);
  };

  const handleChange: HvInputProps["onChange"] = (event, val) => {
    setValue(val);
    onChange?.(event, val);
  };

  return (
    <div className={cx(classes.root, className)}>
      {editMode && !disabled ? (
        <InputComponent
          inputRef={inputRef}
          classes={{
            root: classes.inputRoot,
            input: classes.input,
            inputBorderContainer: classes.inputBorderContainer,
          }}
          inputProps={{
            style: {
              ...typographyStyles,
              height: InputComponent === HvInput ? lineHeight : undefined,
            },
          }}
          value={value}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          {...others}
        />
      ) : (
        <HvButton
          variant="secondaryGhost"
          overrideIconColors={false}
          endIcon={
            <Edit
              color="secondary_60"
              role="none"
              className={cx(classes.icon, {
                [classes.iconVisible]: showIcon,
              })}
            />
          }
          className={cx(classes.button, {
            [classes.largeText]: parseInt(lineHeight as string, 10) >= 28,
          })}
          onClick={handleClick}
          disabled={disabled}
          {...buttonProps}
        >
          <HvTypography
            variant={variant}
            noWrap
            className={cx(classes.text, { [classes.textEmpty]: !value })}
            {...typographyProps}
          >
            {value || placeholder}
          </HvTypography>
        </HvButton>
      )}
    </div>
  );
};

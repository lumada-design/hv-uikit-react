import React, { useRef, useState } from "react";
import { Edit } from "@hitachivantara/uikit-react-icons";
import {
  useDefaultProps,
  useTheme,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import { HvButton, HvButtonProps } from "../Button";
import { useControlled } from "../hooks/useControlled";
import { useEnhancedEffect } from "../hooks/useEnhancedEffect";
import { HvInput, HvInputProps } from "../Input";
import { HvTooltip } from "../Tooltip";
import {
  fixedForwardRef,
  PolymorphicComponentRef,
  PolymorphicRef,
} from "../types/generic";
import {
  HvTypography,
  HvTypographyProps,
  HvTypographyVariants,
} from "../Typography";
import { isKey } from "../utils/keyboardUtils";
import { staticClasses, useClasses } from "./InlineEditor.styles";

export { staticClasses as inlineEditorClasses };

export type HvInlineEditorClasses = ExtractNames<typeof useClasses>;

export type HvInlineEditorProps<C extends React.ElementType = typeof HvInput> =
  PolymorphicComponentRef<
    C,
    {
      /** The value of the form element. */
      value?: string;
      /** The default value of the form element. */
      defaultValue?: string;
      /** Whether the Edit icon should always be visible */
      showIcon?: boolean;
      /** Variant of the HvTypography to display */
      variant?: HvTypographyVariants;
      /** Called when the input is blurred. */
      onBlur?: (
        event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>,
        value: string,
      ) => void;
      /** Called when the input value changes. */
      onChange?: (event: React.SyntheticEvent, value: string) => void;
      /** Called when there's a keydown event on the input. */
      onKeyDown?: (
        event:
          | React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
          | React.MouseEvent,
        value: string,
      ) => void;
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
  >;

/**
 * An Inline Editor allows the user to edit a record without making a major switch
 * between viewing and editing, making it an efficient method of updating a record.
 */
export const HvInlineEditor = fixedForwardRef(function HvInlineEditor<
  C extends React.ElementType = typeof HvInput,
>(props: HvInlineEditorProps<C>, ref: PolymorphicRef<C>) {
  const {
    className,
    classes: classesProp,
    value: valueProp,
    defaultValue = "",
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
  const [isOverflowing, setIsOverflowing] = useState(false);

  const typographyStyles = activeTheme?.typography[variant] || {};
  const { lineHeight } = typographyStyles;

  const checkOverflow = () => {
    if (inputRef.current) {
      setIsOverflowing(
        inputRef.current.scrollWidth > inputRef.current.clientWidth,
      );
    }
  };

  useEnhancedEffect(() => {
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
    let newValue = value;
    if (isKey(event, "Esc")) {
      newValue = cachedValue;
      setEditMode(false);
      setValue(newValue);
      checkOverflow();
    }
    onKeyDown?.(event, newValue);
  };

  const handleChange: HvInputProps["onChange"] = (event, val) => {
    setValue(val);
    checkOverflow();
    onChange?.(event, val);
  };

  return (
    <div className={cx(classes.root, className)}>
      {editMode && !disabled ? (
        <InputComponent
          ref={ref}
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
        <HvTooltip title={isOverflowing && value}>
          <HvButton
            variant="secondaryGhost"
            overrideIconColors={false}
            endIcon={
              <Edit
                color="secondary_60"
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
        </HvTooltip>
      )}
    </div>
  );
});

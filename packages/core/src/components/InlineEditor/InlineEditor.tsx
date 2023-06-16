import { ClassNames } from "@emotion/react";
import React, { useLayoutEffect, useRef, useState } from "react";
import { HvBaseProps } from "@core/types";
import { useControlled } from "@core/hooks";
import { getVarValue, isKeypress, keyboardCodes } from "@core/utils";
import {
  HvButtonProps,
  HvTypographyVariants,
  HvTypographyProps,
  HvInput,
  HvButton,
  HvTypography,
} from "@core/components";
import { HvThemeTypographyProps, theme } from "@hitachivantara/uikit-styles";
import { Edit } from "@hitachivantara/uikit-react-icons";
import inlineEditorClasses, {
  HvInlineEditorClasses,
} from "./inlineEditorClasses";
import { styles } from "./InlineEditor.styles";

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
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: HvInlineEditorClasses;
}

const getTypographyStyles = (typography): HvThemeTypographyProps => {
  const typographyStyles = {};
  Object.keys(typography).forEach((k) => {
    typographyStyles[k] = getVarValue(typography[k]);
  });
  return typographyStyles;
};

/**
 * An Inline Editor allows the user to edit a record without making a major switch
 * between viewing and editing, making it an efficient method of updating a record.
 */
export const HvInlineEditor = ({
  className,
  classes,
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
  ...others
}: HvInlineEditorProps) => {
  const [value, setValue] = useControlled(valueProp, defaultValue);
  const [editMode, setEditMode] = useState(false);
  const [cachedValue, setCachedValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>();

  const typographyStyles = getTypographyStyles(theme.typography[variant] || {});
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

  const handleBlur = (event) => {
    setEditMode(false);

    const newValue = value || cachedValue; // empty values should be ignored
    setValue(newValue);
    onBlur?.(event, newValue);
  };

  const handleKeyDown = (event) => {
    if (isKeypress(event, keyboardCodes.Esc)) {
      setEditMode(false);
      setValue(cachedValue);
    }
    onKeyDown?.(event);
  };

  const handleChange = (event, val) => {
    setValue(val);
    onChange?.(event, val);
  };

  return (
    <ClassNames>
      {({ css, cx }) => (
        <div
          className={cx(
            inlineEditorClasses.root,
            css(styles.root),
            className,
            classes?.root
          )}
        >
          {editMode ? (
            <InputComponent
              inputRef={inputRef}
              classes={{
                root: cx(inlineEditorClasses.inputRoot, classes?.inputRoot),
                input: cx(
                  inlineEditorClasses.input,
                  css(styles.input),
                  classes?.input
                ),
                inputBorderContainer: cx(
                  inlineEditorClasses.inputBorderContainer,
                  css(styles.inputBorderContainer),
                  classes?.inputBorderContainer
                ),
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
              className={cx(
                inlineEditorClasses.button,
                parseInt(lineHeight as string, 10) >= 28 &&
                  inlineEditorClasses.largeText,
                css(styles.button),
                parseInt(lineHeight as string, 10) >= 28 &&
                  css(styles.largeText),
                classes?.button,
                parseInt(lineHeight as string, 10) >= 28 && classes?.largeText
              )}
              onClick={handleClick}
              {...buttonProps}
            >
              <HvTypography
                variant={variant}
                noWrap
                className={cx(
                  inlineEditorClasses.text,
                  !value && inlineEditorClasses.textEmpty,
                  css(styles.text),
                  !value && css(styles.textEmpty),
                  classes?.text,
                  !value && classes?.textEmpty
                )}
                {...typographyProps}
              >
                {value || placeholder}
              </HvTypography>
              <Edit
                color="secondary_60"
                role="presentation"
                className={cx(
                  inlineEditorClasses.icon,
                  showIcon && inlineEditorClasses.iconVisible,
                  css(styles.icon),
                  showIcon && css(styles.iconVisible),
                  classes?.icon,
                  showIcon && classes?.iconVisible
                )}
              />
            </HvButton>
          )}
        </div>
      )}
    </ClassNames>
  );
};

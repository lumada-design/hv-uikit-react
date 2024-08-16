import { useLayoutEffect, useRef, useState } from "react";
import {
  createClasses,
  ExtractNames,
  HvTypography,
  HvTypographyProps,
  isKey,
  theme,
  useControlled,
} from "@hitachivantara/uikit-react-core";
import { Edit } from "@hitachivantara/uikit-react-icons";

// TODO - Extract component in the future when we have more specs and is used in more components

const { staticClasses, useClasses } = createClasses(
  "HvCanvasToolbarTabs-editor",
  {
    root: {
      position: "relative",
      display: "flex",
      width: "100%",
      overflow: "hidden",
      "&:has($label:hover:not($edit))": {
        color: theme.colors.secondary_80,
        "& $editIcon": { display: "flex" },
      },
    },
    edit: {
      color: theme.colors.secondary_80,
      borderColor: "currentColor",
      backgroundColor: theme.colors.atmo1,
    },
    label: {
      boxSizing: "border-box",
      border: "1px solid transparent",
      borderRadius: theme.radii.base,
      padding: theme.spacing(0, "xs"),
      textAlign: "start",
      whiteSpace: "nowrap",
      overflow: "hidden",
      flex: 1,
      outline: "none",
      "&:not($edit)": {
        textOverflow: "ellipsis",
      },
      "&:hover:not($edit)": {
        padding: theme.spacing(0, "sm", 0, "xs"),
        color: theme.colors.secondary_80,
        borderColor: theme.colors.containerBackgroundHover,
        backgroundColor: theme.colors.containerBackgroundHover,
      },
    },
    editIcon: {
      position: "absolute",
      right: theme.spacing(0.5),
      top: 4,
      width: 16,
      height: 16,
      display: "none",
      pointerEvents: "none",
    },
  },
);

export { staticClasses as toolbarTabEditorClasses };

type ToolbarTabEditorClasses = ExtractNames<typeof useClasses>;

interface ToolbarTabEditorProps
  extends Omit<HvTypographyProps, "classes" | "onBlur" | "onChange"> {
  /** The value of the component. When used, the component has to be controlled. */
  value?: string;
  /** The default value of the component. */
  defaultValue?: string;
  /** A Jss Object used to override or extend the styles applied. */
  classes?: ToolbarTabEditorClasses;
  /** Called the field is blurred. */
  onBlur?: (
    event: React.FocusEvent<Element> | React.KeyboardEvent<Element>,
    value: string,
  ) => void;
  /** Called the value changes. */
  onChange?: (
    event: React.FormEvent<Element> | React.KeyboardEvent<Element>,
    value: string,
  ) => void;
}

export const ToolbarTabEditor = ({
  id,
  className,
  value: valueProp,
  defaultValue: defaultValueProp = "",
  classes: classesProp,
  onInput: onInputProp,
  onClick: onClickProp,
  onBlur: onBlurProp,
  onKeyDown: onKeyDownProp,
  onChange: onChangeProp,
  ...others
}: ToolbarTabEditorProps) => {
  const { cx, classes } = useClasses(classesProp);

  const contentEditableRef = useRef<HTMLSpanElement>(null);

  const [value, setValue] = useControlled(valueProp, defaultValueProp);
  const [cachedValue, setCachedValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);

  const moveCursorToEnd = () => {
    if (!contentEditableRef.current) return;
    const element = contentEditableRef.current;
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(range);
    element.scrollLeft = element.scrollWidth;
  };

  const scrollContentToStart = () => {
    if (!contentEditableRef.current) return;
    const element = contentEditableRef.current;
    element.scrollLeft = 0;
  };

  // Update cursor when value updates: otherwise it goes to the start
  useLayoutEffect(() => {
    if (isEditing) moveCursorToEnd();
  }, [isEditing, value]);

  const handleInput: HvTypographyProps["onInput"] = (event) => {
    const newValue = (event.target as any).innerText || "";
    setValue(newValue);
    onInputProp?.(event);
    onChangeProp?.(event, newValue);
  };

  const handleClick: HvTypographyProps["onClick"] = (event) => {
    setCachedValue(value);
    setIsEditing(true);
    onClickProp?.(event);
  };

  const handleBlur = (
    event: React.FocusEvent<Element> | React.KeyboardEvent<Element>,
  ) => {
    setIsEditing(false);
    scrollContentToStart();

    // Never leave the field empty
    const newValue = value || cachedValue;
    setValue(newValue);

    onBlurProp?.(event, newValue);
  };

  const handleKeyDown: HvTypographyProps["onKeyDown"] = (event) => {
    if (isKey(event, "Enter")) {
      // Blur field
      handleBlur(event);
    } else if (isKey(event, "Esc")) {
      setIsEditing(false);

      // Cancel editing
      setValue(cachedValue);
      onChangeProp?.(event, cachedValue);
    }
    onKeyDownProp?.(event);
  };

  return (
    <div id={id} className={cx(classes.root, className)}>
      <HvTypography
        ref={contentEditableRef}
        contentEditable={isEditing}
        className={cx(classes.label, { [classes.edit]: isEditing })}
        variant="label"
        component="span"
        onInput={handleInput}
        onClick={handleClick}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        // Using children is unstable in React for contentEditable so the value is rendered through dangerouslySetInnerHTML
        dangerouslySetInnerHTML={{
          __html: value,
        }}
        {...others}
      />
      <Edit className={classes.editIcon} iconSize="XS" />
    </div>
  );
};

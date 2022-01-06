import React, { useLayoutEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles, useTheme } from "@material-ui/core";
import { HvButton, HvInput, HvTypography, useControlled } from "@hv/uikit-react-core";
import { Edit } from "@hv/uikit-react-icons";

import styles from "./styles";

/**
 * An Inline Editor allows the user to edit a record without making a major switch
 * between viewing and editing, making it an efficient method of updating a record.
 */
const HvInlineEditor = (props) => {
  const {
    className,
    classes,
    value: valueProp,
    defaultValue,
    showIcon,
    component: InputComponent = HvInput,
    variant = "normalText",
    placeholder = "Enter text",
    onBlur,
    onChange,
    onKeyDown,
    buttonProps,
    typographyProps,
    ...others
  } = props;
  const [value, setValue] = useControlled(valueProp, defaultValue);
  const [editMode, setEditMode] = useState(false);
  const [cachedValue, setCachedValue] = useState(value);
  const inputRef = useRef();
  const theme = useTheme();

  const typographyStyles = theme.hv.typography[variant] || {};
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
    if (event.code === "Escape") {
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
    <div className={clsx(className, classes.root)}>
      {editMode ? (
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
          category="ghost"
          overrideIconColors={false}
          className={clsx(classes.button, {
            [classes.largeText]: parseInt(lineHeight, 10) >= 28,
          })}
          onClick={handleClick}
          {...buttonProps}
        >
          <HvTypography
            variant={variant}
            className={clsx(classes.text, { [classes.textEmpty]: !value })}
            {...typographyProps}
          >
            {value || placeholder}
          </HvTypography>
          <Edit
            color="atmo5"
            role="presentation"
            className={clsx(classes.icon, {
              [classes.iconVisible]: showIcon,
            })}
          />
        </HvButton>
      )}
    </div>
  );
};

HvInlineEditor.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes: PropTypes.shape({
    root: PropTypes.string,
    input: PropTypes.string,
    inputRoot: PropTypes.string,
    inputBorderContainer: PropTypes.string,
    text: PropTypes.string,
    textEmpty: PropTypes.string,
    button: PropTypes.string,
    icon: PropTypes.string,
    iconVisible: PropTypes.string,
    largeText: PropTypes.string,
  }).isRequired,
  /**
   * The value of the input element, for controlled usage.
   */
  value: PropTypes.string,
  /**
   * The default value of the input element, for uncontrolled usage.
   */
  defaultValue: PropTypes.string,
  /**
   * Whether the Edit icon should always be visible
   */
  showIcon: PropTypes.bool,
  /**
   * Component to use as the input. The component "inherit" from `HvBaseInput` (such as `HvInput` or `HvTextArea`)
   */
  component: PropTypes.elementType,
  /**
   * Variant of the HvTypography to display
   */
  variant: PropTypes.string,
  /**
   * The placeholder value of the HvTypography.
   */
  placeholder: PropTypes.string,
  /**
   * Called when the input is blurred.
   */
  onBlur: PropTypes.func,
  /**
   * Called when the input value is changed.
   */
  onChange: PropTypes.func,
  /**
   * Called when a key is pressed on the input.
   */
  onKeyDown: PropTypes.func,
  /**
   * Props passed to the HvButton component
   */
  buttonProps: PropTypes.instanceOf(Object),
  /**
   * Props passed to the HvTypography text component
   */
  typographyProps: PropTypes.instanceOf(Object),
};

export default withStyles(styles, { name: "HvInlineEditor" })(HvInlineEditor);

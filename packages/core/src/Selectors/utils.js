import React from "react";
import clsx from "clsx";
import {
  Checkbox,
  CheckboxCheck,
  CheckboxPartial,
  RadioButtonSelected,
  RadioButtonUnselected,
} from "@hitachivantara/uikit-react-icons";

export const labelPositions = Object.freeze({
  start: "start",
  end: "end",
});

export const getLabelStyles = (classes, labelPosition, label) => {
  if (!label) return classes.container;
  switch (labelPosition) {
    default:
    case labelPositions.end:
      return clsx(classes.container, classes.labelEnd);
    case labelPositions.start:
      return clsx(classes.container, classes.labelStart);
  }
};

export const getSelectorIcons = (classes, options) => {
  const { disabled, semantic } = options;
  const color = (disabled && ["atmo4", "atmo6"]) || (semantic && ["base1", "base2"]) || undefined;
  const checkedColor = semantic ? ["base2", "base1"] : color;

  return {
    radio: <RadioButtonUnselected color={color} className={classes.icon} />,
    radioChecked: <RadioButtonSelected color={checkedColor} className={classes.icon} />,
    checkbox: <Checkbox color={color} className={classes.icon} />,
    checkboxPartial: <CheckboxPartial color={color} className={classes.icon} />,
    checkboxChecked: <CheckboxCheck color={checkedColor} className={classes.icon} />,
  };
};

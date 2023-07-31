import { getClasses } from "@core/utils/classes";

export interface HvTagClasses {
  root?: string;
  tagButton?: string;
  focusVisible?: string;
  button?: string;
  label?: string;
  chipRoot?: string;
  categorical?: string;
  disabled?: string;
  clickable?: string;
  categoricalFocus?: string;
  categoricalDisabled?: string;
  deleteIcon?: string;
  disabledDeleteIcon?: string;
}

const classKeys: (keyof HvTagClasses)[] = [
  "root",
  "tagButton",
  "focusVisible",
  "button",
  "label",
  "chipRoot",
  "categorical",
  "disabled",
  "clickable",
  "categoricalFocus",
  "categoricalDisabled",
  "deleteIcon",
  "disabledDeleteIcon",
];

const tagClasses = getClasses(classKeys, "HvTag");

export default tagClasses;

import { getClasses } from "@core/utils";

export type HvTagClasses = {
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
};

const classKeys: string[] = [
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

const tagClasses = getClasses<HvTagClasses>(classKeys, "HvTag");

export default tagClasses;

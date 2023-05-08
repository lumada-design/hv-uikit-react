import { getClasses } from "@hitachivantara/uikit-react-core";

export interface HvColorPickerClasses {
  root?: string;
  labelContainer?: string;
  label?: string;
  description?: string;
  headerColorIcon?: string;
  headerColorValue?: string;
  panel?: string;
  colorPicker?: string;
  colorPickerIcon?: string;
  dropdownRootIconOnly?: string;
  headerColorIconOnly?: string;
  recommendedColorsRoot?: string;
  pickerFields?: string;
}

const classKeys: (keyof HvColorPickerClasses)[] = [
  "root",
  "labelContainer",
  "label",
  "description",
  "headerColorIcon",
  "headerColorValue",
  "panel",
  "colorPicker",
  "colorPickerIcon",
  "dropdownRootIconOnly",
  "headerColorIconOnly",
  "recommendedColorsRoot",
  "pickerFields",
];

const colorPickerClasses = getClasses<HvColorPickerClasses>(
  classKeys,
  "HvColorPicker"
);

export default colorPickerClasses;

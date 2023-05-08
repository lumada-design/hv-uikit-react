import { getClasses } from "@hitachivantara/uikit-react-core";

export interface HvColorPickerSavedColorsClasses {
  root?: string;
  addButton?: string;
  removeButton?: string;
  swatchRoot?: string;
  removeButtonRoot?: string;
  swatchWrap?: string;
}

const classKeys: (keyof HvColorPickerSavedColorsClasses)[] = [
  "addButton",
  "removeButton",
  "removeButtonRoot",
  "root",
  "swatchRoot",
  "swatchWrap",
];

const colorPickerSavedColorsClasses =
  getClasses<HvColorPickerSavedColorsClasses>(
    classKeys,
    "HvColorPicker-SavedColors"
  );

export default colorPickerSavedColorsClasses;

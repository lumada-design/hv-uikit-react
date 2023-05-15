import { getClasses } from "@hitachivantara/uikit-react-core";

export interface HvColorPickerPickerClasses {
  pickers?: string;
  saturation?: string;
  saturationPointer?: string;
  hue?: string;
  hueSlider?: string;
  title?: string;
  fields?: string;
}

const classKeys: (keyof HvColorPickerPickerClasses)[] = [
  "hue",
  "hueSlider",
  "pickers",
  "saturation",
  "saturationPointer",
  "title",
  "fields",
];

const colorPickerPickerClasses = getClasses(classKeys, "HvColorPicker-Picker");

export default colorPickerPickerClasses;

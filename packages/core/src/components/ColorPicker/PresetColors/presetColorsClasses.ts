import { getClasses } from "@core/utils";

export interface HvColorPickerPresetColorsClasses {
  root?: string;
  colors?: string;
  title?: string;
  swatchWrap?: string;
}

const classKeys: (keyof HvColorPickerPresetColorsClasses)[] = [
  "colors",
  "root",
  "swatchWrap",
  "title",
];

const colorPickerPresetColorsClasses = getClasses(
  classKeys,
  "HvColorPicker-PresetColors"
);

export default colorPickerPresetColorsClasses;

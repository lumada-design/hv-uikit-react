import { getClasses } from "@hitachivantara/uikit-react-core";

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

const colorPickerPresetColorsClasses =
  getClasses<HvColorPickerPresetColorsClasses>(
    classKeys,
    "HvColorPicker-PresetColors"
  );

export default colorPickerPresetColorsClasses;

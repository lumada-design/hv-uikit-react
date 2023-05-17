import { getClasses } from "@core/utils";

export interface HvColorPickerFieldsClasses {
  fields?: string;
  double?: string;
  single?: string;
}

const classKeys: (keyof HvColorPickerFieldsClasses)[] = [
  "double",
  "fields",
  "single",
];

const colorPickerFieldsClasses = getClasses(classKeys, "HvColorPicker-Fields");

export default colorPickerFieldsClasses;

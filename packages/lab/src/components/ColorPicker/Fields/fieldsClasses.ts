import { getClasses } from "@hitachivantara/uikit-react-core";

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

const colorPickerFieldsClasses = getClasses<HvColorPickerFieldsClasses>(
  classKeys,
  "HvColorPicker-Fields"
);

export default colorPickerFieldsClasses;

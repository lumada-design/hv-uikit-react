import { getClasses } from "@core/utils";

export interface HvLabelClasses {
  root?: string;
  labelDisabled?: string;
  childGutter?: string;
}

const classKeys: (keyof HvLabelClasses)[] = [
  "root",
  "labelDisabled",
  "childGutter",
];

const labelClasses = getClasses(classKeys, "HvLabel");

export default labelClasses;

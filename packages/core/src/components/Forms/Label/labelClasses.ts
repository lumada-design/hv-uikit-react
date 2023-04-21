import { getClasses } from "@core/utils";

export interface HvLabelClasses {
  root?: string;
  labelDisabled?: string;
  childGutter?: string;
}

const classKeys: string[] = ["root", "labelDisabled", "childGutter"];

const labelClasses = getClasses<HvLabelClasses>(classKeys, "HvLabel");

export default labelClasses;

import { getClasses } from "~/utils";

export type HvLabelClasses = {
  root?: string;
  labelDisabled?: string;
  childGutter?: string;
};

const classKeys: string[] = ["root", "labelDisabled", "childGutter"];

const labelClasses = getClasses<HvLabelClasses>(classKeys, "HvLabel");

export default labelClasses;

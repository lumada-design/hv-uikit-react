import { getClasses } from "utils";

export type HvLabelClasses = {
  root?: string;
  labelDisabled?: string;
  childGutter?: string;
};

const classKeys: string[] = ["root", "labelDisabled", "childGutter"];

export const labelClasses = getClasses<HvLabelClasses>(classKeys, "HvLabel");

export * from "./Label";

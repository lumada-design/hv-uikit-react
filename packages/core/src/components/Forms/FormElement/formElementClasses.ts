import { getClasses } from "@core/utils";

export type HvFormElementClasses = {
  root?: string;
};

const classKeys: string[] = ["root"];

const formElementClasses = getClasses<HvFormElementClasses>(
  classKeys,
  "HvFormElement"
);

export default formElementClasses;

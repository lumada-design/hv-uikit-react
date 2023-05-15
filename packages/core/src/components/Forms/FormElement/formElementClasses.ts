import { getClasses } from "@core/utils";

export interface HvFormElementClasses {
  root?: string;
}

const classKeys: (keyof HvFormElementClasses)[] = ["root"];

const formElementClasses = getClasses(classKeys, "HvFormElement");

export default formElementClasses;

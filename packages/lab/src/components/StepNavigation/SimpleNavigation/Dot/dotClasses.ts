import { getClasses } from "@hitachivantara/uikit-react-core";

export interface HvDotClasses {
  root?: string;
  active?: string;
  ghostDisabled?: string;
}

const classKeys: (keyof HvDotClasses)[] = ["root", "active", "ghostDisabled"];

const dotClasses = getClasses(classKeys, "HvDot");

export default dotClasses;

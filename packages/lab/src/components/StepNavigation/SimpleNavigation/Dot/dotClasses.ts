import { getClasses } from "@hitachivantara/uikit-react-core";

export interface HvDotClasses {
  root?: string;
  active?: string;
  ghostDisabled?: string;
}

const classKeys: string[] = ["root", "active", "ghostDisabled"];

const dotClasses = getClasses<HvDotClasses>(classKeys, "HvDot");

export default dotClasses;

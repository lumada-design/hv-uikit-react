import { getClasses } from "@hitachivantara/uikit-react-core";

export type HvDotClasses = {
  root?: string;
  active?: string;
  ghostDisabled?: string;
};

const classKeys: string[] = ["root", "active", "ghostDisabled"];

const dotClasses = getClasses<HvDotClasses>(classKeys, "HvDot");

export default dotClasses;

import { getClasses } from "~/utils";

export interface HvPathElementClasses {
  centerContainer?: string;
  separatorContainer?: string;
}

const classKeys: string[] = ["centerContainer", "separatorContainer"];

const fileClasses = getClasses<HvPathElementClasses>(
  classKeys,
  "HvPathElement"
);

export default fileClasses;

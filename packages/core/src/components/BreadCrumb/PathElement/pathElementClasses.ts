import { getClasses } from "@core/utils";

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

import { getClasses } from "~/utils";

export type HvPathElementClasses = {
  centerContainer?: string;
  separatorContainer?: string;
};

const classKeys: string[] = ["centerContainer", "separatorContainer"];

const fileClasses = getClasses<HvPathElementClasses>(
  classKeys,
  "HvPathElement"
);

export default fileClasses;

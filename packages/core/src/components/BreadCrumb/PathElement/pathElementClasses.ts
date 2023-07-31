import { getClasses } from "@core/utils/classes";

export interface HvPathElementClasses {
  centerContainer?: string;
  separatorContainer?: string;
}

const classKeys: (keyof HvPathElementClasses)[] = [
  "centerContainer",
  "separatorContainer",
];

const fileClasses = getClasses(classKeys, "HvPathElement");

export default fileClasses;

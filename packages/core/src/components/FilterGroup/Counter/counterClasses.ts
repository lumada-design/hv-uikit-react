import { getClasses } from "@core/utils";

export interface HvFilterGroupCounterClasses {
  root?: string;
  partialCounter?: string;
}

const classKeys: (keyof HvFilterGroupCounterClasses)[] = [
  "partialCounter",
  "root",
];

const filterGroupCounterClasses = getClasses(classKeys, "HvFilterGroupCounter");

export default filterGroupCounterClasses;

import { getClasses } from "@core/utils";

export interface HvFilterGroupClasses {
  root?: string;
  labelContainer?: string;
  label?: string;
  description?: string;
  error?: string;
}

const classKeys: string[] = [
  "root",
  "labelContainer",
  "label",
  "description",
  "error",
];

const filterGroupClasses = getClasses<HvFilterGroupClasses>(
  classKeys,
  "HvFilterGroup"
);

export default filterGroupClasses;

import { getClasses } from "utils";

export type HvHeaderBrandClasses = {
  root?: string;
};

const classKeys: string[] = ["root"];

const headerBrandClasses = getClasses<HvHeaderBrandClasses>(
  classKeys,
  "HvHeader-Brand"
);

export default headerBrandClasses;

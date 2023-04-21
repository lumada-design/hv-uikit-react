import { getClasses } from "@core/utils";

export type HvHeaderBrandClasses = {
  root?: string;
  separator?: string;
};

const classKeys: string[] = ["root", "separator"];

const headerBrandClasses = getClasses<HvHeaderBrandClasses>(
  classKeys,
  "HvHeader-Brand"
);

export default headerBrandClasses;

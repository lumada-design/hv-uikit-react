import { getClasses } from "utils";

export type HvBrandClasses = {
  root?: string;
};

const classKeys: string[] = ["root"];

export const brandClasses = getClasses<HvBrandClasses>(
  classKeys,
  "HvHeader-Brand"
);

export * from "./Brand";

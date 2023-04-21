import { getClasses } from "@core/utils";

export type HvStackClasses = {
  root?: string;
};

const classKeys: string[] = ["root"];

const stackClasses = getClasses<HvStackClasses>(classKeys, "HvStack");

export default stackClasses;

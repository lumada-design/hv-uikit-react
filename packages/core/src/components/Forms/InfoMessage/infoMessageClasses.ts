import { getClasses } from "utils";

export type HvInfoMessageClasses = {
  root?: string;
  infoDisabled?: string;
  gutter?: string;
};

const classKeys: string[] = ["root", "infoDisabled", "gutter"];

const infoMessageClasses = getClasses<HvInfoMessageClasses>(
  classKeys,
  "HvInfoMessage"
);

export default infoMessageClasses;

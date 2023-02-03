import { getClasses } from "utils";

export type HvFileListClasses = {
  list?: string;
  listItem?: string;
};

const classKeys: string[] = ["list", "listItem"];

const fileListClasses = getClasses<HvFileListClasses>(classKeys, "HvFileList");

export default fileListClasses;

import { getClasses } from "@core/utils";

export interface HvFileListClasses {
  list?: string;
  listItem?: string;
}

const classKeys: (keyof HvFileListClasses)[] = ["list", "listItem"];

const fileListClasses = getClasses(classKeys, "HvFileList");

export default fileListClasses;

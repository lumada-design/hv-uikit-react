import { getClasses } from "utils";

export type HvDialogTitleClasses = {
  root?: string;
  fullscreen?: string;
};

const classKeys: string[] = ["root", "fullscreen"];

const dialogTitleClasses = getClasses<HvDialogTitleClasses>(
  classKeys,
  "HvDialog-Title"
);

export default dialogTitleClasses;

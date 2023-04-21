import { getClasses } from "@core/utils";

export interface HvCardHeaderClasses {
  root?: string;
  title?: string;
  titleShort?: string;
  subheader?: string;
  action?: string;
  content?: string;
}

const classKeys: string[] = [
  "root",
  "title",
  "titleShort",
  "subheader",
  "action",
  "content",
];

const cardHeaderClasses = getClasses<HvCardHeaderClasses>(
  classKeys,
  "HvCard-Header"
);

export default cardHeaderClasses;

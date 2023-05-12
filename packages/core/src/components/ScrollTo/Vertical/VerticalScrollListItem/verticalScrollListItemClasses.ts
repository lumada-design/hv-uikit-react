import { getClasses } from "@core/utils";

export interface HvVerticalScrollListItemClasses {
  root?: string;
  notSelected?: string;
  button?: string;
  text?: string;
}

const classKeys: (keyof HvVerticalScrollListItemClasses)[] = [
  "root",
  "notSelected",
  "button",
  "text",
];

const verticalScrollListItemClasses = getClasses(
  classKeys,
  "HvVerticalScrollListItem"
);

export default verticalScrollListItemClasses;

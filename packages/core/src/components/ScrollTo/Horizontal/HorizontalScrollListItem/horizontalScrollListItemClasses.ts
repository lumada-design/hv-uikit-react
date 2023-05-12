import { getClasses } from "@core/utils";

export interface HvHorizontalScrollListItemClasses {
  root?: string;
  selected?: string;
  button?: string;
  text?: string;
}

const classKeys: (keyof HvHorizontalScrollListItemClasses)[] = [
  "root",
  "selected",
  "button",
  "text",
];

const horizontalScrollListItemClasses = getClasses(
  classKeys,
  "HvHorizontalScrollListItem"
);

export default horizontalScrollListItemClasses;

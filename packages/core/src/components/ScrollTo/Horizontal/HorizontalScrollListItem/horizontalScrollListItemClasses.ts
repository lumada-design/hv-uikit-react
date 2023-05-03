import { getClasses } from "@core/utils";

export interface HvHorizontalScrollListItemClasses {
  root?: string;
  selected?: string;
  button?: string;
  text?: string;
}

const classKeys: string[] = ["root", "selected", "button", "text"];

const horizontalScrollListItemClasses =
  getClasses<HvHorizontalScrollListItemClasses>(
    classKeys,
    "HvHorizontalScrollListItem"
  );

export default horizontalScrollListItemClasses;

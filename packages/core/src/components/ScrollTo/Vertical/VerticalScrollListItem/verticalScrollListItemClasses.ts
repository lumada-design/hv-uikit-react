import { getClasses } from "@core/utils";

export interface HvVerticalScrollListItemClasses {
  root?: string;
  notSelected?: string;
  button?: string;
  text?: string;
}

const classKeys: string[] = ["root", "notSelected", "button", "text"];

const verticalScrollListItemClasses =
  getClasses<HvVerticalScrollListItemClasses>(
    classKeys,
    "HvVerticalScrollListItem"
  );

export default verticalScrollListItemClasses;

import { getClasses } from "@core/utils";

export interface HvScrollToVerticalClasses {
  root?: string;
  positionAbsolute?: string;
  positionFixed?: string;
}

const classKeys: string[] = ["root", "positionAbsolute", "positionFixed"];

const scrollToVerticalClasses = getClasses<HvScrollToVerticalClasses>(
  classKeys,
  "HvScrollToVertical"
);

export default scrollToVerticalClasses;

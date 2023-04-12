import { getClasses } from "~/utils";

export interface HvNavigationClasses {
  root?: string;
  icon?: string;
  disabled?: string;
  text?: string;
  textWithoutHover?: string;
}

const classKeys: string[] = [
  "root",
  "icon",
  "disabled",
  "text",
  "textWithoutHover",
];

const navigationClasses = getClasses<HvNavigationClasses>(
  classKeys,
  "HvNavigation"
);

export default navigationClasses;

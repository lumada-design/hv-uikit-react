import { getClasses } from "@core/utils";

export interface HvAppSwitcherActionClasses {
  root?: string;
  icon?: string;
  iconUrl?: string;
  iconInfo?: string;
  disabled?: string;
  selected?: string;
  typography?: string;
  title?: string;
}

const classKeys: string[] = [
  "root",
  "icon",
  "iconUrl",
  "iconInfo",
  "disabled",
  "selected",
  "typography",
  "title",
];

const appSwitcherActionClasses = getClasses<HvAppSwitcherActionClasses>(
  classKeys,
  "HvAppSwitcher-Action"
);

export default appSwitcherActionClasses;

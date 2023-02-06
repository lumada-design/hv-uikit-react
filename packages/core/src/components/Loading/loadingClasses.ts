import { getClasses } from "utils";

export type HvLoadingClasses = {
  root?: string;
  barContainer?: string;
  loadingBar?: string;
  label?: string;
  overlay?: string;
  blur?: string;
  hidden?: string;
};

const classKeys: string[] = [
  "root",
  "barContainer",
  "loadingBar",
  "label",
  "overlay",
  "blur",
  "hidden",
];

const loadingClasses = getClasses<HvLoadingClasses>(classKeys, "HvLoading");

export default loadingClasses;

import { getClasses } from "@core/utils";

export type HvLoadingClasses = {
  root?: string;
  barContainer?: string;
  loadingBar?: string;
  label?: string;
  overlay?: string;
  blur?: string;
  hidden?: string;
  small?: string;
  regular?: string;
  smallColor?: string;
  regularColor?: string;
};

const classKeys: string[] = [
  "root",
  "barContainer",
  "loadingBar",
  "label",
  "overlay",
  "blur",
  "hidden",
  "small",
  "regular",
  "smallColor",
  "regularColor",
];

const loadingClasses = getClasses<HvLoadingClasses>(classKeys, "HvLoading");

export default loadingClasses;

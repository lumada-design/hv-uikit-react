import { getClasses } from "@core/utils/classes";

export interface HvLoadingClasses {
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
}

const classKeys: (keyof HvLoadingClasses)[] = [
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

const loadingClasses = getClasses(classKeys, "HvLoading");

export default loadingClasses;

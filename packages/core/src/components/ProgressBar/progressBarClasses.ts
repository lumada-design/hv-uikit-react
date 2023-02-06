import { getClasses } from "utils";

export type HvProgressBarClasses = {
  root?: string;
  progress?: string;
  progressBar?: string;
  progressBarLabel?: string;
};

const classKeys: string[] = [
  "root",
  "progress",
  "progressBar",
  "progressBarLabel",
];

const progressBarClasses = getClasses<HvProgressBarClasses>(
  classKeys,
  "HvProgressBar"
);

export default progressBarClasses;

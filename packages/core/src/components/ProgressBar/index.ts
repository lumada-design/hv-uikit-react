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

export const progressBarClasses = getClasses<HvProgressBarClasses>(
  classKeys,
  "HvProgressBar"
);

export * from "./ProgressBar";

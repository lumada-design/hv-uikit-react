import { getClasses } from "utils";

export type HvCardContentClasses = {
  content?: string;
};

const classKeys: string[] = ["content"];

export const cardContentClasses = getClasses<HvCardContentClasses>(
  classKeys,
  "HvCard-Content"
);

export * from "./Content";

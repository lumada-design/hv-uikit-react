import { getClasses } from "@core/utils";

export type HvCardContentClasses = {
  content?: string;
};

const classKeys: string[] = ["content"];

const cardContentClasses = getClasses<HvCardContentClasses>(
  classKeys,
  "HvCard-Content"
);

export default cardContentClasses;

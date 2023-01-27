import { getClasses } from "utils";

export type HvCardMediaClasses = {
  root?: string;
  media?: string;
};

const classKeys: string[] = ["root", "media"];

export const cardMediaClasses = getClasses<HvCardMediaClasses>(
  classKeys,
  "HvCard-Media"
);

export * from "./Media";

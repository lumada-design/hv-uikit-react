import { getClasses } from "utils";

export type HvCardMediaClasses = {
  root?: string;
  media?: string;
};

const classKeys: string[] = ["root", "media"];

const cardMediaClasses = getClasses<HvCardMediaClasses>(
  classKeys,
  "HvCard-Media"
);

export default cardMediaClasses;

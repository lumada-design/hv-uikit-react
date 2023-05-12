import { getClasses } from "@core/utils";

export interface HvCardMediaClasses {
  root?: string;
  media?: string;
}

const classKeys: (keyof HvCardMediaClasses)[] = ["root", "media"];

const cardMediaClasses = getClasses(classKeys, "HvCard-Media");

export default cardMediaClasses;

import { getClasses } from "~/utils";

export type HvVerticalNavigationHeaderClasses = {
  root?: string;
  minimized?: string;
};

const classKeys: string[] = ["root", "minimized"];

const verticalNavigationHeaderClasses =
  getClasses<HvVerticalNavigationHeaderClasses>(
    classKeys,
    "HvVerticalNavigationHeader"
  );

export default verticalNavigationHeaderClasses;

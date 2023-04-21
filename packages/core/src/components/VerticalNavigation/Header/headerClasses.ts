import { getClasses } from "@core/utils";

export interface HvVerticalNavigationHeaderClasses {
  root?: string;
  minimized?: string;
}

const classKeys: string[] = ["root", "minimized"];

const verticalNavigationHeaderClasses =
  getClasses<HvVerticalNavigationHeaderClasses>(
    classKeys,
    "HvVerticalNavigationHeader"
  );

export default verticalNavigationHeaderClasses;

import { getClasses } from "@core/utils";

export interface HvComposedNavigationClasses {
  navigationContainer?: string;
  navigationMonth?: string;
}

const classKeys: string[] = ["navigationContainer", "navigationMonth"];

const composedNavigationClasses = getClasses<HvComposedNavigationClasses>(
  classKeys,
  "HvComposedNavigation"
);

export default composedNavigationClasses;

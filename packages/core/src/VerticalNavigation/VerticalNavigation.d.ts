import { StandardProps } from "@material-ui/core";
import { HvVerticalNavigationContainerProps } from "./VerticalContainer";

export interface HvVerticalNavigationProps
  extends StandardProps<HvVerticalNavigationContainerProps, HvVerticalNavigationClassKey> {
  /**
   * Sets if the navigation should have a button to hide itself.
   */
  isCollapsable?: boolean;
}

export type HvVerticalNavigationClassKey = "root" | "noCollapse";

export default function HvVerticalNavigation(props: HvVerticalNavigationProps): JSX.Element | null;

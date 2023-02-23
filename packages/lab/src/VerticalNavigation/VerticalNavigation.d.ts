import { NavigationData } from "@hitachivantara/uikit-react-core";

export interface HvVerticalNavigationProps {
  /**
   * Called when a menu item is clicked.
   */
  onNavigationChange?: Function;
  /**
   * Called the collpase / expand button is clicked.
   */
  onToggleExpanded?: Function;
  /**
   * An array containing the data for each menu item.
   */
  data: NavigationData[];
  /**
   * The ID of the selected page.
   */
  selected?: string;
  /**
   * Flag that sets the panel to expanded / collapsed.
   */
  expanded: boolean;
  /**
   * The top value where the panel will be rendered. Default is 44 as it is the height of the Header component.
   */
  topPosition?: number;
  /**
   * The width of the panel when expanded. Default value is 300.
   */
  expandedPanelWidth?: number;
  /**
   * The width of the panel when collapsed. Default vlaue is 52.
   */
  collapsedPanelWidth?: number;
  /**
   * Sets the Css position of the panel. Default value is `sticked`
   */
  position?: "static" | "relative" | "fixed" | "absolute" | "sticky";
}

export default function HvVerticalNavigation(props: HvVerticalNavigationProps): JSX.Element | null;

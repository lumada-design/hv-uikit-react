import { NavigationData } from "@hitachivantara/uikit-react-core";

export interface HvVerticalNavigationProps {
  /**
   * Id to be applied to the root node of the panel.
   */
  id?: string;
  /**
   * Called when a menu item is clicked.
   */
  onNavigationChange?: Function;
  /**
   * An array containing the data for each menu item.
   */
  data: NavigationData[];
  /**
   * Text to be displayed in the collpase area when the panel is expanded.
   */
  collapseLabel?: string;
  /**
   * The ID of the selected page.
   */
  selected?: string;
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
}

export default function HvVerticalNavigation(props: HvVerticalNavigationProps): JSX.Element | null;

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
   * The ID of the selected page.
   */
  selected?: string;
  /**
   * The top value where the panel will be rendered. Default is 44 as it is the height of the Header component.
   */
  topPosition?: number;
  /**
   * The width of the panel. Default value is 300.
   */
  panelWidth?: number;
}

export default function HvVerticalNavigation(props: HvVerticalNavigationProps): JSX.Element | null;

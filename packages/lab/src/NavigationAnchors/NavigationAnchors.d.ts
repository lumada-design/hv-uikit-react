import { StandardProps, DrawerProps } from "@material-ui/core";

interface Option {
  key: string;
  label: string;
  value: string;
}

export type HvNavigationAnchorsClassKey =
  | "drawer"
  | "dense"
  | "drawerPaper"
  | "drawerPaperPositionInherit"
  | "listRoot"
  | "listDense"
  | "listItemSelected"
  | "listItemRoot"
  | "listItemGutters"
  | "listItemTextSelected"
  | "listItemTextDense";

export interface HvNavigationAnchorsProps
  extends StandardProps<DrawerProps, HvNavigationAnchorsClassKey> {
  /**
   * An Array of Objects with Label and Value. Label is the displayed Element and Value is the local navigation location applied
   */
  options: Option[];
  /**
   * True if the href location link should be applied. It will create an a element around every list item
   */
  href?: boolean;
  /**
   * Whether the anchors are always in a fixed position
   */
  floating?: boolean;
  /**
   * Currently selected index passed from the parent.
   */
  selectedIndex?: number;
  /**
   * The Id of the scrollable container containing displayed elements
   */
  scrollElementId?: string;
}

export default function HvNavigationAnchors(props: HvNavigationAnchorsProps): JSX.Element | null;

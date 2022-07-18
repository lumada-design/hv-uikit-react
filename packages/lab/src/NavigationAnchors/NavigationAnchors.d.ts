import { StandardProps } from "@mui/material";
import { HvListContainerProps } from "@hitachivantara/uikit-react-core";

interface Option {
  key?: string;
  label: string;
  value: string;
  offset?: number;
}

export type HvNavigationAnchorsClassKey = "root" | "listItemGutters" | "listItemSelected";

export interface HvNavigationAnchorsProps
  extends StandardProps<HvListContainerProps, HvNavigationAnchorsClassKey> {
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
   *
   * @deprecated Currently does nothing. Style the component instead.
   */
  floating?: boolean;
  /**
   * Currently selected index passed from the parent.
   */
  selectedIndex?: number;
  /**
   * The Id of the scrollable container containing displayed elements.
   *
   * Defaults to `window` if unspecified.
   */
  scrollElementId?: string;
  /**
   * Defines the offset from the top of each element for getting an optimal viewing region in the container.
   * This allows to exclude regions of the container that are obscured by other content (such as fixed-positioned toolbars or titles)
   * or to put more breathing room between the targeted element and the edges of the container.
   *
   * Each element can alse have a specific offset via the options property.
   */
  offset?: number;
}

export default function HvNavigationAnchors(props: HvNavigationAnchorsProps): JSX.Element | null;

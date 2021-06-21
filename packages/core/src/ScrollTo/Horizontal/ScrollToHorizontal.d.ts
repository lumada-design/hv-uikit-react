import { StandardProps } from "@material-ui/core";
import React from "react";

interface Option {
  key?: string;
  label: string;
  value: string;
  offset?: number;
}

export type HvScrollToHorizontalClassKey = "root" | "positionSticky" | "positionFixed";
export type HvScrollToHorizontalPositions = "sticky" | "fixed" | "relative";
type newStandardProps = Omit<
  StandardProps<React.HTMLAttributes<HTMLDivElement>, HvScrollToHorizontalClassKey>,
  "onChange" | "onClick"
>;

export interface HvScrollToHorizontalProps extends newStandardProps {
  /**
   * An Array of Objects with Label and Value. Label is the displayed Element and Value is the local navigation location applied
   */
  options: Option[];
  /**
   * True if the href location link should be applied. It will create an a element around every list item
   */
  href?: boolean;
  /**
   * Default selected index passed from the parent.
   */
  defaultSelectedIndex?: number;
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
  /**
   * Position of the Horizontal scroll to.
   */
  position?: HvScrollToHorizontalPositions;
  /**
   * A function called each time the selected index changes.
   */
  onChange?: (event: React.SyntheticEvent | React.UIEvent, index: number) => void;
  /**
   * A function called each time an user clicks on a tab element.
   */
  onClick?: (event: React.MouseEventHandler<HTMLButtonElement>, index: number) => void;
  /**
   * A function called each time an user press enter on a tab element.
   */
  onEnter?: (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => void;
}

export default function HvScrollToHorizontal(props: HvScrollToHorizontalProps): JSX.Element | null;

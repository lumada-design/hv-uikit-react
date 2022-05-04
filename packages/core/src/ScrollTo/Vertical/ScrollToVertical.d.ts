import { StandardProps } from "@mui/material";
import React from "react";
import { HvScrollToTooltipPositions } from "../tooltipPositions";

interface HvScrollToVerticalOption {
  key?: string;
  label: string;
  value: string;
  offset?: number;
}

export type HvScrollToVerticalClassKey = "root" | "positionSticky" | "positionFixed";
export type HvScrollToVerticalPositions = "absolute" | "fixed" | "relative";

export interface HvScrollToVerticalProps
  extends StandardProps<
    React.HTMLAttributes<HTMLDivElement>,
    HvScrollToVerticalClassKey,
    "onChange" | "onClick"
  > {
  /**
   * An Array of Objects with Label and Value. Label is the displayed Element and Value is the local navigation location applied
   */
  options: HvScrollToVerticalOption[];
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
   * Position of the Vertical scroll to.
   */
  position?: HvScrollToVerticalPositions;
  /**
   * Position of tooltip identifying the current item.
   */
  tooltipPosition?: HvScrollToTooltipPositions;
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

export default function HvScrollToVertical(props: HvScrollToVerticalProps): JSX.Element | null;

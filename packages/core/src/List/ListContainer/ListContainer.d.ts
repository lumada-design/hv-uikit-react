import * as React from "react";
import { StandardProps } from "@material-ui/core";

export interface HvListContainerProps
  extends StandardProps<React.HTMLAttributes<HTMLUListElement>, HvListContainerClassKey> {
  /**
   * The id of the root element
   */
  id?: string;
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * Overrides the implicit list role. It defaults to "listbox" if unspecified and the list is selectable.
   */
  role?: string;
  /**
   * If the list items should be focusable and react to mouse over events.
   * Defaults to true if the list is selectable, false otherwise.
   */
  interactive?: boolean;
  /**
   * If the list represents a set of selectable items.
   */
  selectable?: boolean;
  /**
   * If the is list is selectable, indicates that the user may select more than one item from the current selectable list items.
   */
  multiSelect?: boolean;
  /**
   * If ´true´ compact the vertical spacing between list items.
   */
  condensed?: boolean;
  /**
   * If `true`, the list items' left and right padding is removed.
   */
  disableGutters?: boolean;
  /**
   * The list items.
   */
  children?: React.ReactNode;
}

export type HvListContainerClassKey = "root";

export default function HvListContainer(props: HvListContainerProps): JSX.Element | null;

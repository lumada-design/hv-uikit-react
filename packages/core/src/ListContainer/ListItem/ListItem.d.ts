import * as React from "react";
import { StandardProps } from "@mui/material";

export type HvListItemClassKey =
  | "root"
  | "gutters"
  | "interactive"
  | "selected"
  | "disabled"
  | "condensed"
  | "withStartAdornment"
  | "withEndAdornment"
  | "startAdornment"
  | "endAdornment"
  | "focus";

export interface HvListItemProps
  extends StandardProps<React.HTMLAttributes<HTMLLIElement>, HvListItemClassKey> {
  /**
   * The id of the root element
   */
  id?: string;
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * Overrides the implicit list item role.
   * It defaults to "option" if unspecified and the container list role is "listbox".
   */
  role?: string;
  /**
   * If the list item is focusable and reacts to mouse over events.
   * Defaults to true if the container list is interactive, false otherwise.
   */
  interactive?: boolean;
  /**
   * Indicates if the list item is selected.
   */
  selected?: boolean;
  /**
   * If true, the list item will be disabled.
   */
  disabled?: boolean;
  /**
   * If `true` compacts the vertical spacing intended to separate the list items.
   * Defaults to the value set in container list.
   */
  condensed?: boolean;
  /**
   * If `true`, the left and right padding is removed.
   * Defaults to the value set in container list.
   */
  disableGutters?: boolean;
  /**
   * Element placed before the children.
   * Also removes the left padding (gutter).
   *
   * Some modifications are applied, assuming that it is either an icon (changing the color when the item is disabled)
   * or a selector (preventing the double focus ring, propagating the checked and disabled states and wiring the onChange event).
   * If unwanted, the element should be placed directly as a child.
   */
  startAdornment?: React.ReactNode;
  /**
   * Element placed after the children and aligned next to the margin.
   * Also removes the right padding (gutter).
   *
   * Some modifications are applied, assuming that it is an icon (changing the color when the item is disabled).
   * If unwanted, the element should be placed directly as a child.
   */
  endAdornment?: React.ReactNode;
  /**
   * The function executed when the item is pressed.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * The list item content.
   */
  children?: React.ReactNode;
  /**
   * @ignore
   */
  tabIndex?: number;
}

export default function HvListItem(props: HvListItemProps): JSX.Element | null;

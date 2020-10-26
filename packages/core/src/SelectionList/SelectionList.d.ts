import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { HvFormElementProps } from "..";

export type HvSelectionListClassKey =
  | "root"
  | "label"
  | "description"
  | "listbox"
  | "vertical"
  | "horizontal"
  | "error";

export interface HvSelectionListProps
  extends StandardProps<HvFormElementProps, HvSelectionListClassKey, "onChange"> {
  /**
   * Indicates whether the list items group's orientation is horizontal or vertical.
   *
   * Defaults to vertical.
   */
  orientation: "vertical" | "horizontal";

  /**
   * The list items that are part of the group.
   *
   * Their state will always be controlled by the group.
   * However the individual list item onChange callback will still be called if defined.
   */
  children: React.ReactNode;
}

export default function HvSelectionList(props: HvSelectionListProps): JSX.Element | null;

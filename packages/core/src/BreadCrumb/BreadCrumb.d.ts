import * as React from "react";
import { StandardProps } from "@mui/material";
import { HvDropDownMenuProps } from "..";

export interface BreadCrumbPathElement {
  label: string;
  path: string;
}

export type HvBreadCrumbClassKey = "root" | "link" | "separator" | "orderedList" | "currentPage";

export interface HvBreadCrumbProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvBreadCrumbClassKey> {
  /**
   * List of breadcrumb.
   */
  listRoute?: BreadCrumbPathElement[];
  /**
   * URL to build the breadcrumb.
   */
  url?: string;
  /**
   * Number of pages visible.
   */
  maxVisible?: number;
  /**
   * The component used for the link node.
   * Either a string to use a DOM element or a component.
   */
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
  /**
   * Props passed down to the DropDownMenu sub-menu component.
   */
  dropDownMenuProps?: HvDropDownMenuProps;
}

export default function HvBreadCrumb(props: HvBreadCrumbProps): JSX.Element | null;

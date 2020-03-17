import * as React from "react";
import { StandardProps } from "@material-ui/core";

export interface BreadCrumbPathElement {
  label: string;
  path: string;
}

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
  component: React.ElementType<React.HTMLAttributes<HTMLElement>>;
}

export type HvBreadCrumbClassKey = "root" | "link" | "separator" | "orderedList";

export default function HvBreadCrumb(props: HvBreadCrumbProps): JSX.Element | null;

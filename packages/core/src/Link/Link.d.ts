import * as React from "react";
import { StandardProps } from "@material-ui/core";

export interface HvLinkProps
  extends StandardProps<React.HTMLAttributes<HTMLElement | HTMLAnchorElement>, HvLinkClassKey> {
  /**
   * Path route.
   */
  route: string;
  /**
   * TabIndex.
   */
  tabIndex?: number;
  /**
   * Data to be returned in the onClick function.
   */
  data?: object;
  /**
   * The component used for the link node.
   * Either a string to use a DOM element or a component.
   */
  Component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
}

// TODO: should have root or "component" class?
export type HvLinkClassKey = "a";

export default function HvLink(props: HvLinkProps): JSX.Element | null;

import * as React from "react";
import { StandardProps } from "@material-ui/core";

export interface HvScopedCssBaselineProps<D extends React.ElementType = "div">
  extends StandardProps<React.HTMLAttributes<D>, ""> {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   * Defaults to `div`.
   */
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
}

export default function HvScopedCssBaseline(props: HvScopedCssBaselineProps): JSX.Element | null;

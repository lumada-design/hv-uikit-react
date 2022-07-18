import { StandardProps } from "@mui/material";

export type HvTableContainerClassKey = "root";

export interface HvTableContainerProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvTableContainerClassKey> {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   * Defaults to `div`.
   */
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
}

export default function HvTableContainer(props: HvTableContainerProps): JSX.Element | null;

import * as React from "react";
import { StandardProps } from "@material-ui/core";

export interface HvLoadingProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvLoadingClassKey> {
  /**
   * The size of the loading indicator.
   */
  size?: "regular" | "small";

  /**
   * The position where the loading indicator is to be positioned in,
   * center of the page or inline in the container where its inserted.
   */
  position?: "center" | "inline";

  /**
   * The text to be displayed.
   */
  text?: string;
}

export type HvLoadingClassKey =
  | "input"
  | "characterCounter"
  | "inline"
  | "separator"
  | "maxCharacter"
  | "currentCounter"
  | "disabled";

export default function HvLoading(props: HvLoadingProps): JSX.Element | null;

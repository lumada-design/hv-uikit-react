import { StandardProps } from "@material-ui/core";

export interface HvWarningTextProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvWarningTextClassKey> {
  /**
   * Icon to be rendered alongside the warning text.
   */
  adornment: React.ReactNode;
  /**
   * If ´true´ the text is not rendered.
   */
  isVisible?: boolean;
  /**
   * If ´true´ the text is disabled which mean it is not rendered.
   */
  disabled?: boolean;
}

export type HvWarningTextClassKey = "root" | "warningText" | "topGutter" | "showText" | "defaultIcon" | "@global";

export default function HvWarningText(props: HvWarningTextProps): JSX.Element | null;

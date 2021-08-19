import { StandardProps } from "@material-ui/core";

export type HvWarningTextClassKey =
  | "root"
  | "warningText"
  | "topBorder"
  | "topGutter"
  | "showText"
  | "defaultIcon"
  | "@global";

export interface HvWarningTextProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvWarningTextClassKey> {
  /**
   * Icon to be rendered alongside the warning text.
   */
  adornment?: React.ReactNode;
  /**
   * If `true` the text is not rendered.
   */
  isVisible?: boolean;
  /**
   * If `true` the text is disabled which mean it is not rendered.
   */
  disabled?: boolean;
  /**
   * If `true` the text won't include a gutter.
   */
  disableGutter?: boolean;
  /**
   * If `true` the text won't include the top border.
   */
  disableBorder?: boolean;
  /**
   * If `true` the adornment icon isn't shown.
   */
  disableAdornment?: boolean;
  /**
   * If `true` the text isn't shown.
   */
  hideText?: boolean;
}

export default function HvWarningText(props: HvWarningTextProps): JSX.Element | null;

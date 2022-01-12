import * as React from "react";
import { StandardProps } from "@material-ui/core";
import {
  HvBaseInputProps,
  HvButtonProps,
  HvTypographyKeys,
  HvTypographyProps,
} from "@hv/uikit-react-core";

export type HvInlineEditorClassKey =
  | "root"
  | "input"
  | "inputRoot"
  | "inputBorderContainer"
  | "text"
  | "textEmpty"
  | "button"
  | "icon"
  | "iconVisible"
  | "largeText";

export interface HvInlineEditorProps
  extends StandardProps<HvBaseInputProps, HvInlineEditorClassKey, "onBlur"> {
  /**
   * Whether the Edit icon should always be visible
   */
  showIcon?: boolean;
  /**
   * Component to use as the input. The component "inherit" from `HvBaseInput` (such as `HvInput` or `HvTextArea`)
   */
  component?: React.ElementType;
  /**
   * Variant of the HvTypography to display
   */
  variant?: HvTypographyKeys;
  /**
   * Called when the input is blurred.
   */
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>, value: string) => void;
  /**
   * Props passed to the HvButton component
   */
  buttonProps?: HvButtonProps;
  /**
   * Props passed to the HvTypography text component
   */
  typographyProps?: HvTypographyProps;
}

export default function HvInlineEditor(props: HvInlineEditorProps): JSX.Element | null;

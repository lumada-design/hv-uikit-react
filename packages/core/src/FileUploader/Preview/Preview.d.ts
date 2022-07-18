import { ButtonProps, StandardProps } from "@mui/material";

export type HvFileUploaderPreviewClassKey = "previewButton" | "overlay";

export interface PreviewProps extends StandardProps<ButtonProps, HvFileUploaderPreviewClassKey> {
  /**
   * Callback executed when the preview is unmounted.
   *
   * Should be used for cleaning up client-side image URLs created by `URL.createObjectURL()`.
   */
  onUnload?: void;
  /**
   * If `true`, doesn't show an overlay on top of the preview when hovering.
   *
   * Only applies when `onClick` is set.
   */
  disableOverlay?: boolean;
}

export default function HvFileUploaderPreview(props: PreviewProps): JSX.Element | null;

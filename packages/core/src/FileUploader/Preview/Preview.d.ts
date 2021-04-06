import { ButtonProps, StandardProps } from "@material-ui/core";

export type HvFileUploaderPreviewClassKey = "previewButton";

export interface PreviewProps extends StandardProps<ButtonProps, HvFileUploaderPreviewClassKey> {
  /**
   * Callback executed when the preview is unmounted.
   *
   * Should be used for cleaning up client-side image URLs created by `URL.createObjectURL()`.
   */
  onUnload?: void;
}

export default function HvFileUploaderPreview(props: PreviewProps): JSX.Element | null;

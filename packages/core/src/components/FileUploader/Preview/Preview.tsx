import { clsx } from "clsx";

import { useEffect } from "react";

import { HvButtonProps } from "@core/components/Button";

import fileUploaderPreviewClasses, {
  HvFileUploaderPreviewClasses,
} from "./previewClasses";
import {
  StyledButton,
  StyledOverlay,
  StyledPreviewIcon,
} from "./Preview.styles";

export interface HvFileUploaderPreviewProps
  extends Omit<HvButtonProps, "children" | "classes"> {
  /**
   * Content that represents the preview of an uploaded file.
   */
  children: React.ReactElement;
  /**
   * Callback executed when the preview is unmounted.
   *
   * Should be used for cleaning up client-side image URLs created by `URL.createObjectURL()`.
   */
  onUnload?: () => void;
  /**
   * If `true`, doesn't show an overlay on top of the preview when hovering.
   *
   * Only applies when `onClick` is set.
   */
  disableOverlay?: boolean;
  /**
   * A Jss Object used to override or extend the styles applied to the component.
   */
  classes?: HvFileUploaderPreviewClasses;
}

/**
 * The `HvFileUploaderPreview` component is available to facilitate the styling
 * of the button (when clickable) and the detection of image unloading.
 */
export const HvFileUploaderPreview = ({
  className,
  children,
  classes,
  disableOverlay = false,
  onUnload,
  onClick,
  ...others
}: HvFileUploaderPreviewProps) => {
  useEffect(() => {
    return () => {
      onUnload?.();
    };
  }, [onUnload]);

  if (onClick) {
    return (
      <StyledButton
        icon
        className={clsx(
          className,
          classes?.previewButton,
          fileUploaderPreviewClasses.previewButton
        )}
        onClick={onClick}
        variant="secondaryGhost"
        {...others}
      >
        {children}
        {!disableOverlay && (
          <>
            <StyledOverlay
              className={clsx(
                classes?.overlay,
                fileUploaderPreviewClasses.overlay
              )}
              aria-hidden="true"
            />
            <StyledPreviewIcon />
          </>
        )}
      </StyledButton>
    );
  }

  return children;
};

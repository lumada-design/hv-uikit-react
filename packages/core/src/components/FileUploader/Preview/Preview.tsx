import { useEffect } from "react";

import { HvButton, HvButtonProps } from "@core/components/Button";

import { Preview } from "@hitachivantara/uikit-react-icons";

import { ExtractNames } from "@core/utils/classes";

import { staticClasses, useClasses } from "./Preview.styles";

export { staticClasses as fileUploaderPreviewClasses };

export type HvFileUploaderPreviewClasses = ExtractNames<typeof useClasses>;

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
  classes: classesProp,
  disableOverlay = false,
  onUnload,
  onClick,
  ...others
}: HvFileUploaderPreviewProps) => {
  const { classes, cx, css } = useClasses(classesProp);

  useEffect(() => {
    return () => {
      onUnload?.();
    };
  }, [onUnload]);

  if (onClick) {
    return (
      <HvButton
        icon
        className={cx(classes.previewButton, className)}
        onClick={onClick}
        {...others}
      >
        {children}
        {!disableOverlay && (
          <div className={classes.overlay} aria-hidden="true">
            <Preview
              className={css({
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                display: "none",
              })}
            />
          </div>
        )}
      </HvButton>
    );
  }

  return children;
};

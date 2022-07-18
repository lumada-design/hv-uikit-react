import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@mui/styles";

import { Preview as PreviewIcon } from "@hitachivantara/uikit-react-icons";

import { HvButton } from "../..";

import styles from "./styles";

/**
 * The `HvFileUploaderPreview` component is available to facilitate the styling
 * of the button (when clickable) and the detection of image unloading.
 */
const Preview = (props) => {
  const { children, classes, onClick, onUnload, disableOverlay = false, ...others } = props;

  useEffect(() => {
    return () => {
      onUnload?.();
    };
  }, [onUnload]);

  if (onClick) {
    return (
      <HvButton icon className={classes.previewButton} onClick={onClick} {...others}>
        {children}
        {!disableOverlay && (
          <div className={classes.overlay} aria-hidden="true">
            <PreviewIcon />
          </div>
        )}
      </HvButton>
    );
  }

  return children;
};

Preview.propTypes = {
  /**
   * Content that represents the preview of an uploaded file.
   */
  children: PropTypes.node.isRequired,
  /**
   * Callback executed when the preview is clicked.
   *
   * When not null, the preview content will be enclosed in a button.
   *
   * @param event React.MouseEvent<HTMLButtonElement>
   */
  onClick: PropTypes.func,
  /**
   * Callback executed when the preview is unmounted.
   *
   * Should be used for cleaning up client-side image URLs created by `URL.createObjectURL()`.
   */
  onUnload: PropTypes.func,
  /**
   * If `true`, doesn't show an overlay on top of the preview when hovering.
   *
   * Only applies when `onClick` is set.
   */
  disableOverlay: PropTypes.bool,
  /**
   * A Jss Object used to override or extend the styles applied to the component.
   */
  classes: PropTypes.shape({
    /**
     * Styles to apply to the button when present.
     */
    previewButton: PropTypes.string,
    /**
     * Styles to apply to the overlay shown on hover.
     */
    overlay: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles, { name: "HvFileUploaderPreview" })(Preview);

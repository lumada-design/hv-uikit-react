import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core";

import { HvButton } from "../..";

import styles from "./styles";

/**
 * The `HvFileUploaderPreview` component is available to facilitate the styling
 * of the button (when clickable) and the detection of image unloading.
 */
const Preview = (props) => {
  const { children, classes, onClick, onUnload, ...others } = props;

  useEffect(() => {
    return () => {
      onUnload?.();
    };
  }, [onUnload]);

  if (onClick) {
    return (
      <HvButton icon className={classes.previewButton} onClick={onClick} {...others}>
        {children}
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
   * A Jss Object used to override or extend the styles applied to the component.
   */
  classes: PropTypes.shape({
    /**
     * Styles to apply to the button when present.
     */
    previewButton: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles, { name: "HvFileUploaderPreview" })(Preview);

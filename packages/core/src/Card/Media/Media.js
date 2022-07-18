import React from "react";
import PropTypes from "prop-types";
import { CardMedia } from "@mui/material";
import { withStyles } from "@mui/styles";
import styles from "./styles";

/**
 * The media container.
 */
export const Media = (props) => {
  const { classes, id, className, title, onClick, ...others } = props;

  return (
    <CardMedia
      id={id}
      classes={{ root: classes.root, media: classes.media }}
      className={className}
      role="img"
      title={title}
      onClick={onClick}
      {...others}
    />
  );
};

Media.propTypes = {
  /**
   * Class names to be applied.
   */

  id: PropTypes.string,
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root of the element.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the root element if component="video, audio, picture, iframe, or img".
     */
    media: PropTypes.string,
  }).isRequired,
  /**
   *  The title of the media.
   */
  title: PropTypes.string,
  /**
   *  The function that will be executed when this section is clicked.
   */
  onClick: PropTypes.func,
};

export default withStyles(styles, { name: "HvCardMedia" })(Media);

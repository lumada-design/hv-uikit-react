/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import React from "react";
import PropTypes from "prop-types";
import CardMedia from "@material-ui/core/CardMedia";

/**
 * The media container.
 *
 * @param {Object} { classes, mediaPath, mediaTitle, mediaHeight, ...other }
 */
const Media = ({ classes, mediaPath, mediaTitle, mediaHeight, ...other }) => (
  <div className={classes.mediaContainer}>
    <CardMedia
      className={classes.media}
      image={mediaPath}
      style={mediaHeight ? { height: `${mediaHeight}px` } : undefined}
      title={mediaTitle}
      {...other}
    />
  </div>
);

Media.propTypes = {
  /**
   *  The title of the media.
   */
  mediaTitle: PropTypes.string,
  /**
   *  The path to the image to show in the media slot.
   */
  mediaPath: PropTypes.string,
  /**
   *  The height necessary to adjust the media container to the image.
   */
  mediaHeight: PropTypes.number,
  /**
   * A Jss Object used to override or extend the styles applied to the button.
   */
  classes: PropTypes.instanceOf(Object).isRequired
};

Media.defaultProps = {
  mediaTitle: "",
  mediaPath: "",
  mediaHeight: undefined
};

export default Media;

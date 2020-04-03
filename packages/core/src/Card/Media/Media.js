/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import CardMedia from "@material-ui/core/CardMedia";
import deprecatedPropType from "@material-ui/core/utils/deprecatedPropType";

/**
 * The media container.
 *
 * @param {Object} { classes, mediaPath, mediaTitle, mediaHeight, ...other }
 */
const Media = ({
  classes,
  className,
  mediaPath,
  title,
  mediaHeight,
  onClick,

  // deprecated
  mediaTitle,
  onClickAction,
  mediaAriaLabel,
  mediaAriaLabelledBy,
  mediaAriaDescribedBy,

  ...other
}) => (
  <div className={classNames(classes.mediaContainer, className)}>
    <CardMedia
      className={classes.media}
      role="img"
      image={mediaPath}
      style={mediaHeight ? { height: `${mediaHeight}px` } : undefined}
      title={title || mediaTitle}
      aria-label={mediaAriaLabel}
      aria-labelledby={mediaAriaLabelledBy}
      aria-describedby={mediaAriaDescribedBy}
      onClick={onClick || onClickAction}
      {...other}
    />
  </div>
);

Media.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   *  Used to define a string that labels the current element.
   */
  mediaAriaLabel: deprecatedPropType(
    PropTypes.string,
    "pass aria-label directly instead"
  ),
  /**
   *  Establishes relationships between objects and their label(s), and its value should be one or more element IDs.
   */
  mediaAriaLabelledBy: deprecatedPropType(
    PropTypes.string,
    "pass aria-labelledby directly instead"
  ),
  /**
   *  Used to indicate the IDs of the elements that describe the object.
   */
  mediaAriaDescribedBy: deprecatedPropType(
    PropTypes.string,
    "pass aria-describedby directly instead"
  ),
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root of the element.
     */
    mediaContainer: PropTypes.string,
    /**
     * Styles applied to the root element if component="video, audio, picture, iframe, or img".
     */
    media: PropTypes.string
  }).isRequired,
  /**
   *  The title of the media.
   */
  mediaTitle: deprecatedPropType(PropTypes.string, "use title instead"),
  /**
   *  The path to the image to show in the media slot.
   */
  mediaPath: PropTypes.string,
  /**
   *  The height necessary to adjust the media container to the image.
   */
  mediaHeight: PropTypes.number,
  /**
   *  The function that will be executed when this section is clicked.
   */
  onClickAction: deprecatedPropType(PropTypes.func, "use onClick instead"),
  /**
   *  The function that will be executed when this section is clicked.
   */
  onClick: PropTypes.func,
  /**
   *  The title of the media.
   */
  title: PropTypes.string
};

Media.defaultProps = {
  className: "",
  mediaAriaLabel: undefined,
  mediaAriaLabelledBy: undefined,
  mediaAriaDescribedBy: undefined,
  mediaTitle: "",
  mediaPath: "",
  mediaHeight: undefined,
  onClickAction: () => {},
  onClick: () => {},
  title: ""
};

export default Media;

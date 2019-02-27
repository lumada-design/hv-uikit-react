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

/**
 * Container to render a image. If the parameter is a path a <img /> is render.
 * Otherwise the parameter itself is render.
 *
 * @param containerClassName
 * @param icon
 * @returns {*}
 * @constructor
 */
const ImageContainer = ({ containerClassName, image }) => {
  let imageToPresent;

  if (typeof image === "string") {
    imageToPresent = <img src={image} alt="" />;
  } else {
    imageToPresent = <>{image}</>;
  }
  return <div className={containerClassName}>{imageToPresent}</div>;
};

ImageContainer.propTypes = {
  /**
   * Image Container class name.
   */
  containerClassName: PropTypes.string.isRequired,
  /**
   * Node to be render.
   */
  image: PropTypes.node.isRequired
};

export default ImageContainer;

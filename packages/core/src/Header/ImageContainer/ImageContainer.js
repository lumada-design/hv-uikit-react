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

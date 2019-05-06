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

/**
 * Typography element. It uses the define typography set in the theme, selected by the variant.
 *
 * @param theme
 * @param children
 * @param variant
 * @returns {*}
 * @constructor
 */
const Typography = ({ variant, classes, className, id, children }) => (
  <span id={id} className={classNames(classes[variant], className)}>{children}</span>
);

Typography.propTypes = {
  /**
   * Styles applied to the Drawer Paper element.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * ClassName passed as prop.
   */
  className: PropTypes.string,
  /** 
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * The text to be set.
   */
  children: PropTypes.node,
  /**
   * The selected typography.
   */
  variant: PropTypes.oneOf([
    "5xlTitle",
    "4xlTitle",
    "3xlTitle",
    "xxlTitle",
    "xlTitle",
    "lTitle",
    "mTitle",
    "sTitle",
    "xsTitle",
    "xxsTitle",
    "highlightText",
    "normalText",
    "inlineLink",
    "disabledButtonText",
    "labelText",
    "infoText",
    "sLink",
    "disabledText",
    "vizText"
  ])
};

Typography.defaultProps = {
  variant: "normalText",
  className: undefined,
  id: undefined,
  children: ""
};

export default Typography;

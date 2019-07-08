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
 * Mapping of typography with HTML elements.
 * @type {{infoText: string, xxsTitle: string, disabledButtonText: string, xsTitle: string, labelText: string, "5xlTitle": string, sTitle: string, xlTitle: string, highlightText: string, inlineLink: string, lTitle: string, normalText: string, "4xlTitle": string, "3xlTitle": string, sLink: string, xxlTitle: string, mTitle: string, disabledText: string, vizText: string}}
 */
const defaultVariantMapping = {
  "5xlTitle": "h1",
  "4xlTitle": "h1",
  "3xlTitle": "h1",
  xxlTitle: "h1",
  xlTitle: "h1",
  lTitle: "h2",
  mTitle: "h3",
  sTitle: "h4",
  xsTitle: "h5",
  xxsTitle: "h6",
  highlightText: "p",
  normalText: "p",
  inlineLink: "p",
  disabledButtonText: "p",
  labelText: "p",
  infoText: "p",
  sLink: "p",
  disabledText: "p",
  vizText: "p"
};

/**
 * Typography element. It uses the define typography set in the theme, selected by the variant.
 *
 * @param theme
 * @param children
 * @param variant
 * @returns {*}
 * @constructor
 */
const Typography = ({
  variant,
  classes,
  paragraph,
  className,
  id,
  children
}) => {
  const Component =
    (paragraph ? "p" : defaultVariantMapping[variant]) || "span";

  return (
    <Component
      id={id}
      className={classNames(
        classes[variant],
        classes.baseFontFamily,
        classes.margin,
        className
      )}
    >
      {children}
    </Component>
  );
};

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
   * If `true`, the text will have a bottom margin.
   */
  paragraph: PropTypes.bool,
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
  paragraph: false,
  children: ""
};

export default Typography;

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
import CardHeader from "@material-ui/core/CardHeader";

/**
 * The header container that possesses three slots:
 * - icon
 * - title
 * - subheader
 *
 * @param {*} { classes, headerTitle, subheader, icon, needsBorder }
 */
const Header = ({
  classes,
  className,
  headerTitle,
  subheader,
  icon,
  needsBorder
}) => (
  <CardHeader
    title={headerTitle}
    className={classNames(
      classes.root,
      {
        [classes.bottomBorder]: needsBorder
      },
      className
    )}
    subheader={subheader}
    action={icon}
    classes={{
      title: classes.title,
      subheader: classes.subheader,
      action: classes.action,
      content: classes.content
    }}
  />
);

Header.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root of the component.
     */
    root: PropTypes.string,
    /**
     * Style applied to the bottom border of the component is needed.
     */
    bottomBorder: PropTypes.string,
    /**
     * Styles applied to the title Typography element.
     */
    title: PropTypes.string,
    /**
     * Styles applied to the subheader Typography element.
     */
    subheader: PropTypes.string,
    /**
     * Styles applied to the action element.
     */
    action: PropTypes.string,
    /**
     * Styles applied to the content wrapper element.
     */
    content: PropTypes.string
  }).isRequired,
  /**
   *  The renderable content inside the title slot of the header.
   */
  headerTitle: PropTypes.node.isRequired,
  /**
   *  The renderable content inside the subheader slot of the header.
   */
  subheader: PropTypes.node,
  /**
   * If the Header requires a bottom border
   */
  needsBorder: PropTypes.bool,

  /**
   *  The renderable content inside the icon slot of the header.
   */
  icon: PropTypes.node
};

Header.defaultProps = {
  className: "",
  needsBorder: false,
  icon: null,
  subheader: undefined
};

export default Header;

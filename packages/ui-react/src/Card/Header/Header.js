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
 * @param {*} { classes, HeaderTitle, Subheader, Icon, needsBorder }
 */
const Header = ({ classes, HeaderTitle, Subheader, Icon, needsBorder }) => (
  <CardHeader
    title={HeaderTitle}
    className={classNames(classes.root, {
      [classes.bottomBorder]: needsBorder
    })}
    subheader={Subheader}
    action={Icon}
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
   * A Jss Object used to override or extend the styles applied to the component.
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
    action: PropTypes.string
  }).isRequired,
  /**
   *  The renderable content inside the title slot of the header.
   */
  HeaderTitle: PropTypes.node.isRequired,
  /**
   *  The renderable content inside the subheader slot of the header.
   */
  Subheader: PropTypes.node,
  /**
   * If the Header requires a bottom border
   */
  needsBorder: PropTypes.bool,

  /**
   *  The renderable content inside the icon slot of the header.
   */
  Icon: PropTypes.node
};

Header.defaultProps = {
  needsBorder: false,
  Icon: null,
  Subheader: undefined
};

export default Header;

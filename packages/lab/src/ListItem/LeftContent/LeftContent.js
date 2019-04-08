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
import CardHeader from "@material-ui/core/CardHeader";
import classNames from "classnames";

/**
 * The left content container possesses three slots:
 * - avatar
 * - title
 * - subtitle
 *
 * @param {*} { classes, title, subtitle, avatar, needsBorder }
 */
const LeftContent = ({ classes, title, subtitle, avatar, needsBorder }) => (
  <CardHeader
    title={title}
    className={classNames(classes.root, {
      [classes.leftBorder]: needsBorder
    })}
    subheader={subtitle}
    avatar={avatar}
    classes={{
      root: classes.root,
      title: classes.title,
      subheader: classes.subheader,
      avatar: classes.avatar,
      content: classes.content
    }}
  />
);

LeftContent.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the component.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root of the component.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the title Typography element.
     */
    title: PropTypes.string,
    /**
     * Styles applied to the subheader Typography element.
     */
    subheader: PropTypes.string,
    /**
     * Styles applied to the avatar element.
     */
    avatar: PropTypes.string,
    /**
     * Styles applied to the main content area
     */
    content: PropTypes.string
  }).isRequired,
  /**
   *  The renderable content inside the title slot of the left content.
   */
  title: PropTypes.node.isRequired,
  /**
   *  The renderable content inside the subtitle slot of the left content.
   */
  subtitle: PropTypes.node,
  /**
   *  The renderable content inside the icon slot of the left content.
   */
  avatar: PropTypes.node,
  /**
   * If the left part on this type of component requires a left border
   */
  needsBorder: PropTypes.bool,
};

LeftContent.defaultProps = {
  avatar: null,
  subtitle: undefined,
  needsBorder: false
};

export default LeftContent;

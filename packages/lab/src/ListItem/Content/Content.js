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
import CardContent from "@material-ui/core/CardContent";
import classNames from "classnames";

/**
 * The content container.
 *
 * @param {Object} { classes, innerListItemContent, needsBorder, ...other }
 */
const Content = ({ classes, innerListItemContent, needsBorder, ...other }) => (
  <CardContent
    className={classNames(classes.content, {
      [classes.leftBorder]: needsBorder
    })}
    classes={{
      root: classes.root
    }}
    {...other}
  >
    {innerListItemContent}
  </CardContent>
);

Content.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the component.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root component.
     */
    root: PropTypes.string,
    /**
     * Style applied to the component.
     */
    content: PropTypes.string,
    /**
     * Style applied to the left border of the component if needed.
     */
    leftBorder: PropTypes.string
  }).isRequired,
  /**
   *  The renderable content inside the body of the item.
   */
  innerListItemContent: PropTypes.node,
  /**
   * If the content requires a bottom border
   */
  needsBorder: PropTypes.bool
};

Content.defaultProps = {
  innerListItemContent: undefined,
  needsBorder: false
};

export default Content;

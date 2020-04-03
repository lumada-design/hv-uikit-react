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
import CardContent from "@material-ui/core/CardContent";
import uniqueId from "lodash/uniqueId";
import deprecatedPropType from "@material-ui/core/utils/deprecatedPropType";

const DEFAULT_ID = "hv-content";
/**
 * The content container.
 *
 * @param {Object} { classes, className, innerCardContent, ...other }
 */
const Content = ({
  id,
  classes,
  className,
  innerCardContent,
  needsBorder,
  onClick,
  onClickAction,
  children,
  ...others
}) => (
  <CardContent
    id={id || uniqueId(DEFAULT_ID)}
    className={classNames(classes.content, className)}
    onClick={onClick || onClickAction}
    {...others}
  >
    {children || innerCardContent}
  </CardContent>
);

Content.propTypes = {
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root component.
     */
    content: PropTypes.string,
    /**
     * Style applied to the bottom border of the component is needed.
     */
    bottomBorder: PropTypes.string
  }).isRequired,
  /**
   *  The renderable content inside the body of the card.
   */
  innerCardContent: deprecatedPropType(
    PropTypes.node,
    "pass children directly instead"
  ),
  /**
   * If the content requires a bottom border
   * @deprecated
   */
  // eslint-disable-next-line react/no-unused-prop-types
  needsBorder: deprecatedPropType(PropTypes.bool),
  /**
   *  The function that will be executed when this section is clicked.
   */
  onClickAction: deprecatedPropType(PropTypes.func, "use onClick instead"),
  /**
   *  The function that will be executed when this section is clicked.
   */
  onClick: PropTypes.func,
  children: PropTypes.node
};

Content.defaultProps = {
  className: "",
  id: undefined,
  innerCardContent: undefined,
  needsBorder: undefined,
  onClickAction: () => {},
  onClick: () => {},
  children: undefined
};

export default Content;

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
import classNames from "classnames";
import isString from "lodash/isString";
import PropTypes from "prop-types";
import HvTypography from "../Typography";

const renderNode = (className, node, variant) => (
  <div className={className}>
    {isString(node) ? (
      <HvTypography variant={variant}>{node}</HvTypography>
    ) : (
      node
    )}
  </div>
);

const HvEmptyState = ({
  classes,
  title = null,
  message = null,
  action = null,
  icon
}) => (
  <div className={classes.root}>
    <div
      className={classNames(classes.container, {
        [classes.containerMessageOnly]: message && !title && !action
      })}
    >
      <div className={classes.iconContainer}>{icon}</div>
      <div className={classes.textContainer}>
        {title && renderNode(classes.titleContainer, title, "sTitle")}
        {message && renderNode(classes.messageContainer, message, "normalText")}
        {action && renderNode(classes.actionContainer, action, "normalText")}
      </div>
    </div>
  </div>
);

HvEmptyState.propTypes = {
  /* eslint-disable react/require-default-props */
  /**
   * A Jss Object used to override or extend the styles applied to the empty state component.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the component container class.
     */
    container: PropTypes.string,
    /**
     * Styles applied to the component container class, when there is no title or action.
     */
    containerMessageOnly: PropTypes.string,
    /**
     * Styles applied to the icon container class.
     */
    iconContainer: PropTypes.string,
    /**
     * Styles applied to the text container class.
     */
    textContainer: PropTypes.string,
    /**
     * Styles applied to the title container class.
     */
    titleContainer: PropTypes.string,
    /**
     * Styles applied to the message container class.
     */
    messageContainer: PropTypes.string,
    /**
     * Styles applied to the action message container class.
     */
    actionContainer: PropTypes.string
  }).isRequired,
  /**
   * The title to be shown.
   */
  title: PropTypes.node,
  /**
   * The message to be shown.
   */
  message: PropTypes.node.isRequired,
  /**
   * The action message to be shown.
   */
  action: PropTypes.node,
  /**
   *  Icon to be presented.
   */
  icon: PropTypes.element.isRequired
};

export default HvEmptyState;

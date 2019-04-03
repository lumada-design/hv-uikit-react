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
 * Action container. The component receives (itemAction) an array of components to be render.
 * The recommended number of components is 3. Above that, the actions should be a dropdown component
 * with the remaining actions.
 *
 * @param classes
 * @param userExists
 * @param itemActions
 * @returns {*}
 * @constructor
 */
const Actions = ({ classes, userExists, itemActions }) => (
  <div
    className={classNames(classes.actionsContainer, {
      [classes.marginLeft]: !userExists
    })}
  >
    {itemActions.map((child, i) => {
      const key = `action_${i}`;
      return (
        <div className={classes.iconContainer} key={key}>
          {child}
        </div>
      );
    })}
  </div>
);
Actions.propTypes = {
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * Checks if the user container exist, to create a separation.
   */
  userExists: PropTypes.bool,
  /**
   * Array with the components to be render.
   */
  itemActions: PropTypes.arrayOf(PropTypes.element)
};

Actions.defaultProps = {
  itemActions: [],
  userExists: false
};

export default Actions;

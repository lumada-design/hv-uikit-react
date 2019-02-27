/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
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
   * A Jss Object used to override or extend the styles applied to the button.
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

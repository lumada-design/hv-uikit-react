/**
 * Copyright (c) 2019 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import React from "react";
import classNames from "classnames";

/**
 * Add the expander element to the first column. This way the expander element doesn't create
 * a single column for itself but is introduced along side the data in the first column.
 *
 * @param {Array} columns - The array that contains the columns in the tabble.
 * @param {JSX} subElementTemplate - the expander template provided by the user.
 * @param {Object} classes - the clases to be applied to the expander container.
 * @returns {JSX|Array} - The expander
 */
const expander = (subElementTemplate, classes) => {
  let newSubComponent;
  if (subElementTemplate) {
    newSubComponent = row => {
      const ele = subElementTemplate(row);
      return <div className={classes.subComponentContainer}>{ele}</div>;
    };
  }
  return newSubComponent;
};

export default expander

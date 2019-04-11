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

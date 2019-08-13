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

import clone from "lodash/cloneDeep";

/**
 * Set the property if it is null.
 * @param object
 * @param property
 * @param value
 */
const setterIfNil = (object, property, value) => {
  // eslint-disable-next-line no-param-reassign
  object[property] = object[property] || value;
};

/**
 * Auxiliary functions to set the layout in order to follow the DS guideline.
 *
 */

export const setLayout = (inputLayout, stack) => {
  const layout = inputLayout === undefined ? {} : clone(inputLayout);
  setterIfNil(layout, "bargap", 0.25);
  setterIfNil(layout, "bargroupgap", 0.25);
  if (stack) setterIfNil(layout, "barmode", "stack");

  return layout;
};

export const setData = (inputData, isHorizontal) => {
  const data = inputData;

  data.forEach(trace => {
    setterIfNil(trace, "type", "bar");
    setterIfNil(trace, "hoverinfo", "none");
    if (isHorizontal) setterIfNil(trace, "orientation", "h");
  });

  return data;
};

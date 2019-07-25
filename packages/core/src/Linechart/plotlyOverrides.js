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
 * Auxiliary functions to set the data in order to follow the DS guideline.
 *
 */
const propSetter = {
  setData: (data, type) => {
    data.forEach(trace => {
      setterIfNil(trace, "hoverinfo", "none");
      setterIfNil(trace, "mode", "lines");

      switch (type) {
        case "area":
          setterIfNil(trace, "fill", "tonexty");
          setterIfNil(trace, "type", "scatter");
          break;
        case "line":
          setterIfNil(trace, "type", "line");
          break;
        case "stack":
          setterIfNil(trace, "fill", "tonexty");
          setterIfNil(trace, "type", "scatter");
          setterIfNil(trace, "stackgroup", "one");
          break;
        default:
          setterIfNil(trace, "type", "line");
      }
    });

    return data;
  }
};

export default propSetter;

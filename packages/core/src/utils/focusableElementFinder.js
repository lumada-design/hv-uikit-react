/*
 * Copyright 2020 Hitachi Vantara Corporation
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
 * Auxiliary function to find adjacent nodes to focus.
 *
 * @param nodeId
 * @returns {{prevFocus: *, nextFocus: *}}
 */
const getPrevNextFocus = nodeId => {
  const nodes =
    (document &&
      document.querySelectorAll(
        'input, button, select, textarea, a[href], [tabindex]:not([tabindex="-1"]'
      )) ||
    [];

  const nbNodes = nodes.length;
  let index = 0;
  for (; index < nbNodes; index += 1) {
    if (nodes[index].id === nodeId) {
      break;
    }
  }
  return {
    nextFocus: nodes[index + 1 > nbNodes - 1 ? 0 : index + 1],
    prevFocus: nodes[index - 1 < 0 ? nbNodes - 1 : index - 1]
  };
};

/**
 * Get the first and last focusable element from a node.
 *
 * @param nodeId
 * @returns {{last: *, first: *}}
 */
const getFirstAndLastFocus = node => {
  const focusableList =
    (node.current &&
      node.current.querySelectorAll(
        'input, button, select, textarea, a[href], [tabindex]:not([tabindex="-1"]'
      )) ||
    [];

  return {
    first: focusableList[0] || null,
    last: focusableList[focusableList.length - 1] || null
  };
};

export { getPrevNextFocus as default, getFirstAndLastFocus };

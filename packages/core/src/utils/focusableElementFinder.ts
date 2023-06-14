const SELECTORS =
  'input, button, select, textarea, a[href], [tabindex]:not([tabindex="-1"])';

/**
 * Gets the list of focusable elements.
 * @param node
 * @returns {*|NodeListOf<HTMLElementTagNameMap[string]>|NodeListOf<*>|NodeListOf<SVGElementTagNameMap[string]>|*[]}
 */
const getFocusableList = (node) =>
  (node && node.querySelectorAll(SELECTORS)) || [];

/**
 * Auxiliary function to find adjacent nodes to focus.
 *
 * @param nodeId
 * @returns {{prevFocus: *, nextFocus: *}}
 */
const getPrevNextFocus = (nodeId) => {
  const nodes = getFocusableList(document);

  const nbNodes = nodes.length;
  let index = 0;
  for (; index < nbNodes; index += 1) {
    if (nodes[index].id === nodeId) {
      break;
    }
  }
  return {
    nextFocus: nodes[index + 1 > nbNodes - 1 ? 0 : index + 1],
    prevFocus: nodes[index - 1 < 0 ? nbNodes - 1 : index - 1],
  };
};

/**
 * Get the first and last focusable element from a node.
 *
 * @param nodeId
 * @returns {{last: *, first: *}}
 */
const getFirstAndLastFocus = (node) => {
  const focusableList = getFocusableList(node);

  return {
    first: focusableList[0] || null,
    last: focusableList[focusableList.length - 1] || null,
  };
};

export { getFocusableList, getFirstAndLastFocus, getPrevNextFocus };
export default getPrevNextFocus;

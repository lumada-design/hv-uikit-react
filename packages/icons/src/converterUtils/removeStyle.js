/**
 * Removes style tags from a node and its children
 * *Note* This mututates the passed in node
 * @param  node A node produced by jsdom
 * @return undefined
 */
module.exports = function removeStyle(node) {
  const elements = node.getElementsByTagName("*");
  Object.keys(elements).forEach((key) => {
    if (elements[key].removeAttribute) {
      elements[key].removeAttribute("style");
    }
  });
};

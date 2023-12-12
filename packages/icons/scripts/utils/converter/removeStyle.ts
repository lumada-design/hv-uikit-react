/**
 * Removes style tags from a node and its children
 * *Note* This mutates the passed in node
 */
export const removeStyle = (node: HTMLElement) => {
  const elements = node.getElementsByTagName("*");
  Object.keys(elements).forEach((key) => {
    if (elements[key].removeAttribute) {
      elements[key].removeAttribute("style");
    }
  });
};

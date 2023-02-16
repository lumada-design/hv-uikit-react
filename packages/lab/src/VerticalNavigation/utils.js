/**
 * Receives the navigation data and the id of the item from which we want to get the root parent.
 *
 * @param {NavigationItem[]} data - The navigation data structure.
 * @param {string} itemId - The item id.
 * @returns The item that is the root parent of the received item.
 */
const findRootParentById = (data, itemId) => {
  return data.reduce((parent, item) => {
    if (parent) {
      return parent;
    }

    if (item.id === itemId) {
      return item;
    }

    if (item.data) {
      const found = findRootParentById(item.data, itemId);
      if (found) {
        return item;
      }
    }
    return null;
  }, null);
};

/**
 * Returns the complete item object from the data structure using the item id.
 *
 * @param {NavigationItem[]} data - The navigation data structure.
 * @param {string} itemId - The item id.
 * @returns The complete item object matching the received id.
 */
const findItemById = (data, itemId) => {
  return data.find((item) => {
    if (item.id === itemId) {
      return true;
    }

    if (item.data && item.data.length > 0) {
      const foundItem = findItemById(item.data, itemId);
      if (foundItem) {
        return true;
      }
    }
    return false;
  });
};

/**
 * Returns all the items that have chilren associated.
 *
 * @param {NavigationItem[]} data - The navigation data structure.
 * @returns All the items that have chilren associated.
 */
const getAllParents = (items) => {
  const parents = items.filter((item) => item.data != null && item.data.length > 0);
  const childParents = parents.flatMap((item) => getAllParents(item.data));

  return [...parents, ...childParents];
};

export { findRootParentById, findItemById, getAllParents };

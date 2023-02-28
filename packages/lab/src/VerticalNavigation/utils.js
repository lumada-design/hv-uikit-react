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
 * Returns an array with all the parent item ids up until the target item is reached.
 *
 * @param {NavigationItem[]} data - The navigation data structure.
 * @param {string} itemId - The item id.
 * @returns An array with all the parent item ids
 */
const pathToItem = (data, itemId) => {
  const path = [];

  if (data != null && data.length > 0) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data.length; ++i) {
      const item = data[i];
      if (item.id === itemId) {
        path.push(item.id);
        break;
      }

      const subPaths = pathToItem(item.data, itemId);
      if (subPaths.length > 0) {
        path.push(item.id);
        path.push(...subPaths);
        break;
      }
    }
  }

  return path;
};

export { findRootParentById, findItemById, pathToItem };

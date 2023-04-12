import { NavigationData } from "../Navigation";

/**
 * Checks if there are any sub items in the NavigationItem data structure.
 *
 * @param data - The collection of navigation items.
 * @returns `true` if there is at least one sub item in the structure, `false` otherwise.
 */
const hasChildNavigationItems = (data: NavigationData[]) => {
  return data.some((item) => item.data && item.data.length > 0);
};

export { hasChildNavigationItems };

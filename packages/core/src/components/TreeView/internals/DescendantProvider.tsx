import * as React from "react";
import { unstable_useEnhancedEffect as useEnhancedEffect } from "@mui/material/utils";

/** Credit: https://github.com/reach/reach-ui/blob/86a046f54d53b6420e392b3fa56dd991d9d4e458/packages/descendants/README.md
 *  Modified slightly to suit our purposes.
 */

// To replace with .findIndex() once we stop IE11 support.
function findIndex<T>(array: T[], comp: (item: T) => boolean) {
  for (let i = 0; i < array.length; i += 1) {
    if (comp(array[i])) {
      return i;
    }
  }

  return -1;
}

function binaryFindElement(
  array: TreeItemDescendant[],
  element: HTMLLIElement
) {
  let start = 0;
  let end = array.length - 1;

  while (start <= end) {
    const middle = Math.floor((start + end) / 2);

    if (array[middle].element === element) {
      return middle;
    }

    if (
      // eslint-disable-next-line no-bitwise
      array[middle].element.compareDocumentPosition(element) &
      Node.DOCUMENT_POSITION_PRECEDING
    ) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
  }

  return start;
}

export interface TreeItemDescendant {
  element: HTMLLIElement;
  id: string;
}

interface DescendantContextValue {
  registerDescendant?: (params: TreeItemDescendant & { index: number }) => void;
  unregisterDescendant?: (params: HTMLLIElement) => void;
  descendants?: TreeItemDescendant[];
  parentId?: string | null;
}

const DescendantContext = React.createContext<DescendantContextValue>({});

if (process.env.NODE_ENV !== "production") {
  DescendantContext.displayName = "DescendantContext";
}

function usePrevious<T>(value: T) {
  const ref = React.useRef<T | null>(null);
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const noop = () => {};

/**
 * This hook registers our descendant by passing it into an array. We can then
 * search that array by to find its index when registering it in the component.
 * We use this for focus management, keyboard navigation, and typeahead
 * functionality for some components.
 *
 * The hook accepts the element node
 *
 * Our main goals with this are:
 *   1) maximum composability,
 *   2) minimal API friction
 *   3) SSR compatibility*
 *   4) concurrent safe
 *   5) index always up-to-date with the tree despite changes
 *   6) works with memoization of any component in the tree (hopefully)
 *
 * * As for SSR, the good news is that we don't actually need the index on the
 * server for most use-cases, as we are only using it to determine the order of
 * composed descendants for keyboard navigation.
 */
export function useDescendant(descendant: TreeItemDescendant) {
  const [, forceUpdate] = React.useState<{}>();
  const {
    registerDescendant = noop,
    unregisterDescendant = noop,
    descendants = [],
    parentId = null,
  } = React.useContext(DescendantContext);

  // This will initially return -1 because we haven't registered the descendant
  // on the first render. After we register, this will then return the correct
  // index on the following render, and we will re-register descendants
  // so that everything is up-to-date before the user interacts with a
  // collection.
  const index = findIndex(
    descendants,
    (item) => item.element === descendant.element
  );

  const previousDescendants = usePrevious(descendants);

  // We also need to re-register descendants any time ANY of the other
  // descendants have changed. My brain was melting when I wrote this and it
  // feels a little off, but checking in render and using the result in the
  // effect's dependency array works well enough.
  const someDescendantsHaveChanged = descendants.some(
    (newDescendant, position) => {
      return (
        previousDescendants &&
        previousDescendants[position] &&
        previousDescendants[position].element !== newDescendant.element
      );
    }
  );

  // Prevent any flashing
  useEnhancedEffect(() => {
    if (descendant.element) {
      registerDescendant({
        ...descendant,
        index,
      });
      return () => {
        unregisterDescendant(descendant.element!);
      };
    }
    forceUpdate({});

    return undefined;
  }, [
    registerDescendant,
    unregisterDescendant,
    index,
    someDescendantsHaveChanged,
    descendant,
  ]);

  return { parentId, index };
}

interface DescendantProviderProps {
  id?: string;
  children: React.ReactNode;
}

export const DescendantProvider = (props: DescendantProviderProps) => {
  const { children, id } = props;

  const [items, set] = React.useState<
    (TreeItemDescendant & { index: number })[]
  >([]);

  const registerDescendant = React.useCallback(
    ({ element, ...other }: TreeItemDescendant) => {
      set((oldItems) => {
        if (oldItems.length === 0) {
          // If there are no items, register at index 0 and bail.
          return [
            {
              ...other,
              element,
              index: 0,
            },
          ];
        }

        const index = binaryFindElement(oldItems, element);
        let newItems: typeof oldItems;

        if (oldItems[index] && oldItems[index].element === element) {
          // If the element is already registered, just use the same array
          newItems = oldItems;
        } else {
          // When registering a descendant, we need to make sure we insert in
          // into the array in the same order that it appears in the DOM. So as
          // new descendants are added or maybe some are removed, we always know
          // that the array is up-to-date and correct.
          //
          // So here we look at our registered descendants and see if the new
          // element we are adding appears earlier than an existing descendant's
          // DOM node via `node.compareDocumentPosition`. If it does, we insert
          // the new element at this index. Because `registerDescendant` will be
          // called in an effect every time the descendants state value changes,
          // we should be sure that this index is accurate when descendent
          // elements come or go from our component.

          const newItem = {
            ...other,
            element,
            index,
          };

          // If an index is not found we will push the element to the end.
          newItems = oldItems.slice();
          newItems.splice(index, 0, newItem);
        }
        newItems.forEach((item, position) => {
          item.index = position;
        });
        return newItems;
      });
    },
    []
  );

  const unregisterDescendant = React.useCallback((element: HTMLLIElement) => {
    set((oldItems) => oldItems.filter((item) => element !== item.element));
  }, []);

  const value = React.useMemo(
    () => ({
      descendants: items,
      registerDescendant,
      unregisterDescendant,
      parentId: id,
    }),
    [items, registerDescendant, unregisterDescendant, id]
  );

  return (
    <DescendantContext.Provider value={value}>
      {children}
    </DescendantContext.Provider>
  );
};

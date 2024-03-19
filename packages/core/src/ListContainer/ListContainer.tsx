import {
  useRef,
  useContext,
  useMemo,
  forwardRef,
  isValidElement,
  Children,
  cloneElement,
} from "react";

import { HvBaseProps } from "../types/generic";
import { useForkRef } from "../hooks/useForkRef";
import { useDefaultProps } from "../hooks/useDefaultProps";
import { ExtractNames } from "../utils/classes";

import { staticClasses, useClasses } from "./ListContainer.styles";
import HvListContext from "./ListContext";

export { staticClasses as listContainerClasses };

export type HvListContainerClasses = ExtractNames<typeof useClasses>;

export interface HvListContainerProps extends HvBaseProps<HTMLUListElement> {
  /**
   * If the list items should be focusable and react to mouse over events.
   * Defaults to true if the list is selectable, false otherwise.
   */
  interactive?: boolean;
  /** If `true` compact the vertical spacing between list items. */
  condensed?: boolean;
  /** If `true`, the list items are _visually_ selectable. To enable selection, use `HvSelectionList` */
  selectable?: boolean;
  /** If `true`, the list items' left and right padding is removed. */
  disableGutters?: boolean;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvListContainerClasses;
}

/**
 * A <b>list</b> is any enumeration of a set of items.
 * The simple list is for continuous <b>vertical indexes of text or icons+text</b>. The content of these lists must be simple: ideally simples fields.
 * This pattern is ideal for <b>selections</b>. It should be used inside a HvPanel.
 */
export const HvListContainer = forwardRef<
  HTMLUListElement,
  HvListContainerProps
>((props, ref) => {
  const {
    id,
    classes: classesProp,
    className,
    interactive = false,
    selectable,
    condensed,
    disableGutters,
    children: childrenProp,
    ...others
  } = useDefaultProps("HvListContainer", props);

  const { classes, cx } = useClasses(classesProp);

  const containerRef = useRef(null);

  const { topContainerRef, nesting = -1 } = useContext(HvListContext);

  const listContext = useMemo(
    () => ({
      topContainerRef: topContainerRef || containerRef,
      condensed,
      selectable,
      disableGutters,
      interactive,
      nesting: nesting + 1,
    }),
    [
      condensed,
      selectable,
      disableGutters,
      interactive,
      nesting,
      topContainerRef,
    ]
  );

  const children = useMemo(() => {
    if (!interactive) return childrenProp;

    const anySelected = Children.toArray(childrenProp).some(
      (child) =>
        isValidElement(child) && child.props.selected && !child.props.disabled
    );

    return Children.map(childrenProp, (child: any, i) => {
      const tabIndex =
        child.props.tabIndex ||
        (!anySelected && i === 0) ||
        (child.props.selected && !child.props.disabled)
          ? 0
          : -1;

      return cloneElement(child, {
        tabIndex,
        interactive,
      });
    });
  }, [childrenProp, interactive]);

  const handleRef = useForkRef(ref, containerRef);

  return (
    <HvListContext.Provider value={listContext}>
      <ul
        ref={handleRef}
        id={id}
        className={cx(classes.root, className)}
        {...others}
      >
        {children}
      </ul>
    </HvListContext.Provider>
  );
});

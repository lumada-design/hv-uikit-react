import React, { useRef, useContext, useMemo, forwardRef } from "react";

import { HvBaseProps } from "@core/types/generic";
import { useForkRef } from "@core/hooks/useForkRef";
import { useDefaultProps } from "@core/hooks/useDefaultProps";
import { ExtractNames } from "@core/utils/classes";

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
export const HvListContainer = forwardRef(
  (props: HvListContainerProps, externalRef) => {
    const {
      id,
      classes: classesProp,
      className,
      interactive = false,
      condensed,
      disableGutters,
      children,
      ...others
    } = useDefaultProps("HvListContainer", props);

    const { classes, cx } = useClasses(classesProp);

    const containerRef = useRef(null);

    const { topContainerRef, nesting = -1 } = useContext(HvListContext);

    const listContext = useMemo(
      () => ({
        topContainerRef: topContainerRef || containerRef,
        condensed,
        disableGutters,
        interactive,
        nesting: nesting + 1,
      }),
      [condensed, disableGutters, interactive, nesting, topContainerRef]
    );

    const renderChildren = () => {
      if (!interactive) {
        return children;
      }

      const anySelected = React.Children.toArray(children)
        .map((child: any) => child.props.selected && !child.props.disabled)
        .reduce((result, selected) => result || selected, false);

      return React.Children.map(children, (child: any, i) => {
        const tabIndex =
          child.props.tabIndex ||
          (!anySelected && i === 0) ||
          (child.props.selected && !child.props.disabled)
            ? 0
            : -1;

        return React.cloneElement(child, {
          tabIndex,
          interactive,
        });
      });
    };

    const handleRef = useForkRef(externalRef, containerRef);

    return (
      <HvListContext.Provider value={listContext}>
        <ul
          ref={handleRef}
          id={id}
          className={cx(classes.root, className)}
          {...others}
        >
          {renderChildren()}
        </ul>
      </HvListContext.Provider>
    );
  }
);

import { useMemo } from "react";

import { useDefaultProps } from "../../hooks/useDefaultProps";
import { HvBaseProps } from "../../types/generic";
import { useUniqueId } from "../../hooks/useUniqueId";
import { ExtractNames } from "../../utils/classes";
import { isKey } from "../../utils/keyboardUtils";
import { setId } from "../../utils/setId";

import {
  staticClasses,
  useClasses,
  calculateOffset,
} from "./ScrollToVertical.styles";
import { HvVerticalScrollListItem } from "./VerticalScrollListItem";
import { useScrollTo } from "../useScrollTo";
import { withTooltip } from "../withTooltip";
import {
  HvScrollToTooltipPositions,
  HvScrollToVerticalOption,
  HvScrollToVerticalPositions,
} from "../types";

export { staticClasses as scrollToVerticalClasses };

export type HvScrollToVerticalClasses = ExtractNames<typeof useClasses>;

export interface HvScrollToVerticalProps
  extends HvBaseProps<HTMLOListElement, "onChange" | "onClick"> {
  /** An Array of Objects with Label and Value. Label is the displayed Element and Value is the local navigation location applied */
  options: HvScrollToVerticalOption[];
  /** True if the href location link should be applied. It will create an a element around every list item */
  href?: boolean;
  /** Default selected index passed from the parent. */
  defaultSelectedIndex?: number;
  /**
   * The Id of the scrollable container containing displayed elements.
   *
   * Defaults to `window` if unspecified.
   */
  scrollElementId?: string;
  /**
   * Defines the offset from the top of each element for getting an optimal viewing region in the container.
   * This allows to exclude regions of the container that are obscured by other content (such as fixed-positioned toolbars or titles)
   * or to put more breathing room between the targeted element and the edges of the container.
   *
   * Each element can also have a specific offset via the options property.
   */
  offset?: number;
  /** Position of the Vertical scroll to. */
  position?: HvScrollToVerticalPositions;
  /** Position of tooltip identifying the current item. */
  tooltipPosition?: HvScrollToTooltipPositions;
  /** A function called each time the selected index changes. */
  onChange?: (
    event:
      | Event
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => void;
  /** A function called each time an user clicks on a tab element. */
  onClick?: (event: React.MouseEvent<HTMLDivElement>, index: number) => void;
  /** A function called each time an user press enter on a tab element. */
  onEnter?: (event: React.KeyboardEvent<HTMLDivElement>, index: number) => void;
  /** A Jss Object used to override or extend the styles applied. */
  classes?: HvScrollToVerticalClasses;
}

/**
 * The vertical scroll to element can be used to quickly navigate in a page.
 */
export const HvScrollToVertical = (props: HvScrollToVerticalProps) => {
  const {
    id,
    defaultSelectedIndex = 0,
    scrollElementId,
    href = true,
    onChange,
    onClick,
    onEnter,
    className,
    classes: classesProp,
    options,
    offset = 0,
    position = "relative",
    tooltipPosition = "left",
    style,
    ...others
  } = useDefaultProps("HvScrollToVertical", props);

  const { classes, cx } = useClasses(classesProp);

  const elementId = useUniqueId(id, "hvVerticalScrollto");

  const [selectedIndex, setScrollTo] = useScrollTo(
    defaultSelectedIndex,
    scrollElementId,
    href,
    offset,
    options,
    onChange
  );

  const handleSelection = (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>,
    value: string,
    index: number
  ) => {
    event.preventDefault();

    const wrappedOnChange = () => {
      onChange?.(event, index);
    };

    setScrollTo(event, value, index, wrappedOnChange);
  };

  const tooltipWrappers = useMemo(() => {
    return options.map((option) => {
      return withTooltip(option.label, "div", tooltipPosition, false);
    });
  }, [options, tooltipPosition]);

  const tabs = options.map((option, index) => {
    const selected = selectedIndex === index;
    const tooltipWrapper = tooltipWrappers[index];

    return (
      <HvVerticalScrollListItem
        id={setId(elementId, `item-${index}`)}
        onClick={(event) => {
          handleSelection(event, option.value, index);
          onClick?.(event, index);
        }}
        onKeyDown={(event) => {
          if (isKey(event, "Enter") === true) {
            handleSelection(event, option.value, index);
            onEnter?.(event, index);
          }
        }}
        tooltipWrapper={tooltipWrapper}
        selected={selected}
        key={option.key || option.label}
        aria-label={option.label}
      />
    );
  });

  const positionOffset = calculateOffset(options.length);

  return (
    <ol
      className={cx(
        classes.root,
        {
          [classes.positionFixed]: position === "fixed",
          [classes.positionAbsolute]: position === "absolute",
        },
        className
      )}
      style={{ top: `calc(50% - ${positionOffset}px)`, ...style }}
      id={elementId}
      {...others}
    >
      {tabs}
    </ol>
  );
};

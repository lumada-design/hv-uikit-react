import { useCallback, useMemo } from "react";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { theme } from "@hitachivantara/uikit-styles";
import { CurrentStep } from "@hitachivantara/uikit-react-icons";

import { useDefaultProps } from "../../hooks/useDefaultProps";
import { HvBaseProps } from "../../types/generic";
import { useUniqueId } from "../../hooks/useUniqueId";
import { useTheme } from "../../hooks/useTheme";
import { ExtractNames } from "../../utils/classes";
import { isKey } from "../../utils/keyboardUtils";
import { setId } from "../../utils/setId";

import { HvScrollToTooltipPositions } from "../types";
import { withTooltip } from "../withTooltip";
import { HvHorizontalScrollListItem } from "./HorizontalScrollListItem";
import { useScrollTo } from "../useScrollTo";
import { staticClasses, useClasses } from "./ScrollToHorizontal.styles";

export { staticClasses as scrollToHorizontalClasses };

export type HvScrollToHorizontalClasses = ExtractNames<typeof useClasses>;

export interface HvScrollToHorizontalOption {
  key?: string;
  label: string;
  value: string;
  offset?: number;
}

export type HvScrollToHorizontalPositions = "sticky" | "fixed" | "relative";

export interface HvScrollToHorizontalProps
  extends HvBaseProps<HTMLOListElement, "onChange" | "onClick"> {
  /** An Array of Objects with Label and Value. Label is the displayed Element and Value is the local navigation location applied */
  options: HvScrollToHorizontalOption[];
  /**
   * Should the active element be reflected in the URL.
   *
   * Defaults to `true`.
   *
   * @deprecated Use `navigationMode` instead.
   * */
  href?: boolean;
  /**
   * The navigation mode to be used when the user clicks on a tab element.
   * - `push` will add a new entry to the history stack.
   * - `replace` will replace the current entry on the history stack.
   * - `none` will not add any entry to the history stack.
   *
   * Defaults to `push`, unless the deprecated `href` prop is set to `false`, in which case it defaults to `none`.
   *
   * When set to `none`, then each element will render a button instead of a link.
   */
  navigationMode?: "push" | "replace" | "none";
  /**
   * When set to `true`, the generated links will be relative (e.g. `#section`).
   * Relative URLs take into account not only the current location, but also the base URL if it is set (i.e. a `<base>` tag).
   * This can lead to unexpected behavior.
   *
   * When set to `false`, the links will be generated from the current location's full URL (e.g. `http://example.com/hello/world?value=123#section`).
   *
   * Defaults to `false`.
   */
  relativeLinks?: boolean;
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
  /** Position of the Horizontal scroll to. */
  position?: HvScrollToHorizontalPositions;
  /** Position of tooltip identifying the current item. */
  tooltipPosition?: HvScrollToTooltipPositions;
  /** A function called each time the selected index changes. */
  onChange?: (
    event:
      | Event
      | React.MouseEvent<HTMLDivElement | HTMLAnchorElement>
      | React.KeyboardEvent<HTMLDivElement | HTMLAnchorElement>,
    index: number
  ) => void;
  /** A function called each time an user clicks on a tab element. */
  onClick?: (
    event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>,
    index: number
  ) => void;
  /** A function called each time an user press enter on a tab element. */
  onEnter?: (
    event: React.KeyboardEvent<HTMLDivElement | HTMLAnchorElement>,
    index: number
  ) => void;
  /** A Jss Object used to override or extend the styles applied. */
  classes?: HvScrollToHorizontalClasses;
}

/**
 * The horizontal scroll to element can be used to quickly navigate in a page.
 */
export const HvScrollToHorizontal = (props: HvScrollToHorizontalProps) => {
  const {
    id,
    defaultSelectedIndex = 0,
    scrollElementId,
    href = true,
    navigationMode = href ? "push" : "none",
    relativeLinks = false,
    onChange,
    onClick,
    onEnter,
    className,
    classes: classesProp,
    options,
    offset = 0,
    position = "relative",
    tooltipPosition = "top",
    ...others
  } = useDefaultProps("HvScrollToHorizontal", props);

  const { classes, css, cx } = useClasses(classesProp);
  const muiTheme = useMuiTheme();

  const downSm = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const upMd = useMediaQuery(muiTheme.breakpoints.up("md"));

  const { activeTheme } = useTheme();

  const elementId = useUniqueId(id, "hvHorizontalScrollto");

  const [selectedIndex, setScrollTo, elements] = useScrollTo(
    defaultSelectedIndex,
    scrollElementId,
    navigationMode,
    relativeLinks,
    offset,
    options,
    onChange
  );

  const handleSelection = (
    event:
      | React.MouseEvent<HTMLDivElement | HTMLAnchorElement>
      | React.KeyboardEvent<HTMLDivElement | HTMLAnchorElement>,
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
      return withTooltip(option.label, "div", tooltipPosition);
    });
  }, [options, tooltipPosition]);

  const NotSelected = useCallback(() => {
    return (
      <div className={classes.notSelectedRoot}>
        <div className={classes.notSelected} />
      </div>
    );
  }, [classes.notSelectedRoot, classes.notSelected]);

  const Selected = useCallback(() => {
    return (
      <CurrentStep
        height={activeTheme?.scrollTo.dotSelectedSize}
        width={activeTheme?.scrollTo.dotSelectedSize}
        className={classes.selected}
      />
    );
  }, [classes.selected, activeTheme?.scrollTo.dotSelectedSize]);

  const tabs = elements.map((option, index) => {
    const selected = selectedIndex === index;
    const tooltipWrapper = tooltipWrappers[index];

    return (
      <HvHorizontalScrollListItem
        id={setId(elementId, `item-${index}`)}
        onClick={(event) => {
          if (navigationMode !== "none") {
            event.preventDefault();
          }

          handleSelection(event, option.value, index);
          onClick?.(event, index);
        }}
        onKeyDown={(event) => {
          if (isKey(event, "Enter") === true) {
            if (navigationMode !== "none") {
              event.preventDefault();
            }

            handleSelection(event, option.value, index);
            onEnter?.(event, index);
          }
        }}
        link={navigationMode !== "none" ? option.link : undefined}
        tooltipWrapper={tooltipWrapper}
        selected={selected}
        key={option.key || option.label}
      >
        <p>{option.label}</p>
        {selected ? <Selected /> : <NotSelected />}
      </HvHorizontalScrollListItem>
    );
  });

  return (
    <ol
      className={cx(
        css({
          width:
            position === "fixed" && (upMd || downSm)
              ? `calc(100% - 2*${theme.spacing(upMd ? 4 : 2)})`
              : "100%",
          marginTop: 0,
          marginBottom: 0,
          marginRight:
            position === "fixed" && (upMd || downSm)
              ? theme.spacing(upMd ? 4 : 2)
              : 0,
          marginLeft:
            position === "fixed" && (upMd || downSm)
              ? theme.spacing(upMd ? 4 : 2)
              : 0,
        }),
        classes.root,
        {
          [classes.positionSticky]: position === "sticky",
          [classes.positionFixed]: position === "fixed",
        },
        className
      )}
      id={elementId}
      {...others}
    >
      {tabs}
    </ol>
  );
};

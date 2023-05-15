import { HvBaseProps } from "@core/types";
import scrollToHorizontalClasses, {
  HvScrollToHorizontalClasses,
} from "./scrollToHorizontalClasses";
import { ClassNames } from "@emotion/react";
import { clsx } from "clsx";
import { useTheme, useUniqueId } from "@core/hooks";
import { styles } from "./ScrollToHorizontal.styles";
import { useScrollTo } from "../useScrollTo";
import { HvHorizontalScrollListItem } from "./HorizontalScrollListItem";
import { isKeypress, keyboardCodes, setId } from "@core/utils";
import { useCallback, useMemo } from "react";
import { withTooltip } from "../withTooltip";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import { theme } from "@hitachivantara/uikit-styles";
import fade from "@core/utils/hexToRgbA";
import { HvScrollToTooltipPositions } from "../types";
import { CurrentStep } from "@hitachivantara/uikit-react-icons";
import { useMediaQuery } from "@mui/material";

const { Enter } = keyboardCodes;

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
  /** Position of the Horizontal scroll to. */
  position?: HvScrollToHorizontalPositions;
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
  classes?: HvScrollToHorizontalClasses;
}

/**
 * The horizontal scroll to element can be used to quickly navigate in a page.
 */
export const HvScrollToHorizontal = ({
  id,
  defaultSelectedIndex = 0,
  scrollElementId,
  href = true,
  onChange,
  onClick,
  onEnter,
  className,
  classes,
  options,
  offset = 0,
  position = "relative",
  tooltipPosition = "top",
  ...others
}: HvScrollToHorizontalProps) => {
  const muiTheme = useMuiTheme();

  const downSm = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const upMd = useMediaQuery(muiTheme.breakpoints.up("md"));

  const { activeTheme, selectedMode } = useTheme();

  const elementId = useUniqueId(id, "hvHorizontalScrollto");

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
      return withTooltip(option.label, "div", tooltipPosition);
    });
  }, [options, tooltipPosition]);

  const NotSelected = useCallback(() => {
    return (
      <ClassNames>
        {({ css }) => (
          <div
            className={clsx(
              classes?.notSelectedRoot,
              scrollToHorizontalClasses.notSelectedRoot,
              css(styles.notSelectedRoot)
            )}
          >
            <div
              className={clsx(
                classes?.notSelected,
                scrollToHorizontalClasses.notSelected,
                css(styles.notSelected)
              )}
            />
          </div>
        )}
      </ClassNames>
    );
  }, [classes?.notSelectedRoot, classes?.notSelected]);

  const Selected = useCallback(() => {
    return (
      <ClassNames>
        {({ css }) => (
          <CurrentStep
            height={activeTheme?.scrollTo.dotSelectedSize}
            width={activeTheme?.scrollTo.dotSelectedSize}
            className={clsx(
              classes?.selected,
              scrollToHorizontalClasses.selected,
              css(styles.selected)
            )}
          />
        )}
      </ClassNames>
    );
  }, [classes?.selected, activeTheme?.scrollTo.dotSelectedSize]);

  const tabs = options.map((option, index) => {
    const selected = selectedIndex === index;
    const tooltipWrapper = tooltipWrappers[index];

    return (
      <HvHorizontalScrollListItem
        id={setId(elementId, `item-${index}`)}
        onClick={(event) => {
          handleSelection(event, option.value, index);
          onClick?.(event, index);
        }}
        onKeyDown={(event) => {
          if (isKeypress(event, Enter) === true) {
            handleSelection(event, option.value, index);
            onEnter?.(event, index);
          }
        }}
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
    <ClassNames>
      {({ css }) => (
        <ol
          className={clsx(
            className,
            classes?.root,
            scrollToHorizontalClasses.root,
            css(styles.root),
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
              backgroundColor: fade(
                activeTheme?.colors.modes[selectedMode].atmo2,
                activeTheme?.scrollTo.backgroundColorOpacity
              ),
            }),
            position === "sticky" &&
              clsx(
                classes?.positionSticky,
                scrollToHorizontalClasses.positionSticky,
                css(styles.positionSticky)
              ),
            position === "fixed" &&
              clsx(
                classes?.positionFixed,
                scrollToHorizontalClasses.positionFixed,
                css(styles.positionFixed)
              )
          )}
          id={elementId}
          {...others}
        >
          {tabs}
        </ol>
      )}
    </ClassNames>
  );
};

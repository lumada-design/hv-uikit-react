import clsx from "clsx";
import { useMemo } from "react";
import { useResizeDetector } from "react-resize-detector";
import { HvBaseProps } from "../../types/index";
import { HvTooltip, HvTypography } from "components";
import { StyledDataContainer } from "./OverflowTooltip.styles";
import { overflowTooltipClasses, HvOverflowTooltipClasses } from ".";

export type HvOverflowTooltipProps = HvBaseProps & {
  /** The node that will be rendered inside the tooltip. */
  data: React.ReactNode;
  /** If true, the tooltip is shown. */
  open?: boolean;
  /** If `true` the overflow tooltip will always use the paragraph overflow style. */
  paragraphOverflow?: boolean;
  /** Tooltip placement. */
  placement?:
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top";
  /** Extra properties to add to the tooltip. */
  tooltipsProps?: object;
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: HvOverflowTooltipClasses;
};

const isParagraph = (children) => /\s/.test(children);

/**
 * This component generates a tooltip whenever the text is overflowed.
 */
export const HvOverflowTooltip = ({
  id,
  classes,
  className,
  data,
  open,
  paragraphOverflow,
  placement = "top-start",
  tooltipsProps,
}: HvOverflowTooltipProps) => {
  const { width = 0, ref } = useResizeDetector({
    refreshMode: "debounce",
    refreshOptions: {
      trailing: true,
    },
    handleHeight: false,
  });
  const scrollWidth = ref.current?.scrollWidth || 0;
  // The difference should be higher than a pixel to be considered as overflowing
  const isOverflowing = scrollWidth - width >= 1;

  const isParag = useMemo(
    () => paragraphOverflow && isParagraph(data?.toString()),
    [data, paragraphOverflow]
  );

  const content = useMemo(
    () => (
      <StyledDataContainer
        ref={ref}
        className={clsx(
          className,
          !isParag &&
            clsx(overflowTooltipClasses.tooltipAnchor, classes?.tooltipAnchor),
          isParag &&
            clsx(
              overflowTooltipClasses.tooltipAnchorParagraph,
              classes?.tooltipAnchorParagraph
            )
        )}
        $isParag={isParag}
      >
        {data}
      </StyledDataContainer>
    ),
    [
      className,
      classes?.tooltipAnchor,
      classes?.tooltipAnchorParagraph,
      data,
      isParag,
      ref,
    ]
  );

  return open || isOverflowing ? (
    <HvTooltip
      id={id}
      disableHoverListener={!isOverflowing}
      open={open}
      placement={placement}
      title={
        <HvTypography
          className={clsx(
            overflowTooltipClasses.tooltipData,
            classes?.tooltipData
          )}
          variant="body"
        >
          {data}
        </HvTypography>
      }
      {...tooltipsProps}
    >
      {content}
    </HvTooltip>
  ) : (
    content
  );
};

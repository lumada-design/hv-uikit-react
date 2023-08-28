import { useDefaultProps } from "@core/hooks/useDefaultProps";
import { useMemo } from "react";
import { useResizeDetector } from "react-resize-detector";
import { HvBaseProps } from "@core/types/generic";
import { HvTooltip, HvTooltipProps } from "@core/components/Tooltip";
import { HvTypography } from "@core/components/Typography";
import { ExtractNames } from "@core/utils/classes";
import { staticClasses, useClasses } from "./OverflowTooltip.styles";

export { staticClasses as overflowTooltipClasses };
export type HvOverflowTooltipClasses = ExtractNames<typeof useClasses>;

export interface HvOverflowTooltipProps extends HvBaseProps {
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
  tooltipsProps?: Partial<HvTooltipProps>;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvOverflowTooltipClasses;
}

const isParagraph = (children = "") => /\s/.test(children);

/**
 * This component generates a tooltip whenever the text is overflowed.
 */
export const HvOverflowTooltip = (props: HvOverflowTooltipProps) => {
  const {
    id,
    classes: classesProp,
    className,
    data,
    open,
    paragraphOverflow,
    placement = "top-start",
    tooltipsProps,
  } = useDefaultProps("HvOverflowTooltip", props);
  const { classes, cx } = useClasses(classesProp);

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
      <div
        ref={ref}
        className={cx(
          {
            [classes.tooltipAnchor]: !isParag,
            [classes.tooltipAnchorParagraph]: isParag,
          },
          className
        )}
      >
        {data}
      </div>
    ),
    [
      className,
      classes.tooltipAnchor,
      classes.tooltipAnchorParagraph,
      cx,
      data,
      isParag,
      ref,
    ]
  );

  return (
    <HvTooltip
      id={id}
      disableHoverListener={!isOverflowing}
      open={open}
      placement={placement}
      title={
        <HvTypography className={classes.tooltipData} variant="body">
          {data}
        </HvTypography>
      }
      // unset since `content` *is* the label
      aria-label={null as any}
      aria-labelledby={null as any}
      {...tooltipsProps}
    >
      {content}
    </HvTooltip>
  );
};

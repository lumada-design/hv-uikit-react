import React, { useMemo } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useResizeDetector } from "react-resize-detector";

import { withStyles, createStyles } from "@mui/styles";

import { HvTooltip, HvTypography } from "..";

const styles = createStyles({
  tooltipData: {},
  tooltipAnchor: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  tooltipAnchorParagraph: {
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
});

const isParagraph = (children) => /\s/.test(children);

/**
 * This component generates a tooltip whenever the text is overflowed.
 */
const HvOverflowTooltip = ({
  id,
  className,
  classes,
  data,
  open,
  paragraphOverflow,
  placement = "top-start",
  tooltipsProps,
}) => {
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
    () => paragraphOverflow && isParagraph(data.toString()),
    [data, paragraphOverflow]
  );

  const content = useMemo(
    () => (
      <div
        ref={ref}
        className={clsx(className, {
          [classes.tooltipAnchor]: !isParag,
          [classes.tooltipAnchorParagraph]: isParag,
        })}
      >
        {data}
      </div>
    ),
    [className, classes.tooltipAnchor, classes.tooltipAnchorParagraph, data, isParag, ref]
  );

  return open || isOverflowing ? (
    <HvTooltip
      id={id}
      disableHoverListener={!isOverflowing}
      open={open}
      placement={placement}
      title={
        <HvTypography className={classes.tooltipData} variant="normalText">
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

HvOverflowTooltip.propTypes = {
  /**
   * Id to be applied to the tooltip.
   */
  id: PropTypes.string,
  /**
   * The node that will be rendered inside the tooltip.
   */
  data: PropTypes.node,
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root of the component.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the data container in the tooltip.
     */
    tooltipData: PropTypes.string,
    /**
     * Styles applied to the anchor of the tooltip.
     */
    tooltipAnchor: PropTypes.string,
    /**
     * Styles applied to the anchor of the when it is a paragraph.
     */
    tooltipAnchorParagraph: PropTypes.string,
  }).isRequired,
  /**
   * If `true` the overflow tooltip will always use the paragraph overflow style.
   */
  paragraphOverflow: PropTypes.bool,
  /**
   * Tooltip placement.
   */
  placement: PropTypes.oneOf([
    "bottom-end",
    "bottom-start",
    "bottom",
    "left-end",
    "left-start",
    "left",
    "right-end",
    "right-start",
    "right",
    "top-end",
    "top-start",
    "top",
  ]),
  /**
   * If true, the tooltip is shown.
   */
  open: PropTypes.bool,
  /**
   * Extra properties to add to the tooltip.
   */
  tooltipsProps: PropTypes.instanceOf(Object),
};

export default withStyles(styles, {
  name: "HvOverflowTooltip",
})(React.memo(HvOverflowTooltip));

export { HvOverflowTooltip as RawOverflowTooltip };

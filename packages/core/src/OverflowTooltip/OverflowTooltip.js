import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useResizeDetector } from "react-resize-detector";

import { createStyles, withStyles } from "@material-ui/core";

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
const HvOverflowTooltip = ({ id, className, classes, data, paragraphOverflow, tooltipsProps }) => {
  const { width = 0, ref } = useResizeDetector({
    refreshMode: "debounce",
    refreshOptions: {
      trailing: true,
    },
    handleHeight: false,
  });

  const isOverflowing = ref.current?.scrollWidth > width;

  const isParag = paragraphOverflow && isParagraph(data.toString());
  return (
    <HvTooltip
      id={id}
      disableHoverListener={!isOverflowing}
      placement="top-start"
      title={
        <HvTypography className={classes.tooltipData} variant="normalText">
          {data}
        </HvTypography>
      }
      {...tooltipsProps}
    >
      <div
        ref={ref}
        className={clsx(className, {
          [classes.tooltipAnchor]: !isParag,
          [classes.tooltipAnchorParagraph]: isParag,
        })}
      >
        {data}
      </div>
    </HvTooltip>
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
   * Extra properties to add to the tooltip.
   */
  tooltipsProps: PropTypes.instanceOf(Object),
};

export default withStyles(styles, {
  name: "HvOverflowTooltip",
})(React.memo(HvOverflowTooltip));

export { HvOverflowTooltip as RawOverflowTooltip };

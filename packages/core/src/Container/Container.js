import React from "react";
import PropTypes from "prop-types";
import { withStyles, Container } from "@material-ui/core";
import { styles as containerStyles } from "@material-ui/core/Container/Container";

// inherit material ui styles so people can override them too
const styles = (theme) => ({
  ...containerStyles(theme),
  root: {
    paddingLeft: theme.hvSpacing(2),
    paddingRight: theme.hvSpacing(2),
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.hvSpacing(4),
      paddingRight: theme.hvSpacing(4),
    },
  },
});

/**
 * The Container is the element responsible for creating and adding margins to the page, and making them react to the current screen size. Default maxWidth is overridden to xl.
 */
const HvContainer = React.forwardRef(({ maxWidth = "xl", fixed, ...others }, ref) => {
  return <Container ref={ref} maxWidth={maxWidth} fixed={fixed} {...others} />;
});

/*
 * copied from Material-UI Container.js since we simply override the styles of the component
 * please make sure this is updated when we update our Material-UI dependency
 */
HvContainer.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the left and right padding is removed.
   */
  disableGutters: PropTypes.bool,
  /**
   * Set the max-width to match the min-width of the current breakpoint.
   * This is useful if you'd prefer to design for a fixed set of sizes
   * instead of trying to accommodate a fully fluid viewport.
   * It's fluid by default.
   */
  fixed: PropTypes.bool,
  /**
   * Determine the max-width of the container.
   * The container width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   */
  maxWidth: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", false]),
};

export default withStyles(styles, { name: "HvContainer" })(HvContainer);

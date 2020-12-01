import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Box, withStyles } from "@material-ui/core";
import styles from "./styles";

/**
 * A card is a container for a few short and related pieces of content. It roughly resembles a playing card in size and shape and is intended as a linked short representation of a conceptual unit. For that reason, this pattern must be used as an entry-point for further information.
 */
export const Card = (props) => {
  const {
    classes,
    className,
    children,
    icon,
    selectable = false,
    selected = false,
    semantic = "sema0",
    ...others
  } = props;

  return (
    <Box
      aria-selected={selectable ? selected : undefined}
      className={clsx(classes.root, className, {
        [classes.selectable]: selectable,
        [classes.selected]: selected,
      })}
      {...others}
    >
      <div className={classes.semanticContainer}>
        <div
          className={clsx(classes.semanticBar, {
            [classes[semantic]]: semantic,
          })}
        />
        <div className={classes.icon}>{icon}</div>
      </div>
      {children}
    </Box>
  );
};

Card.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root.
     */
    root: PropTypes.string,
    /**
     * Style applied to the card top semantic container.
     */
    semanticContainer: PropTypes.string,
    /**
     * Style applied to the icon.
     */
    icon: PropTypes.string,
    /**
     * Style applied to the container of the semantic bar on top.
     */
    semanticBar: PropTypes.string,
    /**
     * Style applied to the component when it is selectable.
     */
    selectable: PropTypes.string,
    /**
     * Style applied to the component when it is selected.
     */
    selected: PropTypes.string,
  }).isRequired,
  /**
   * The content inside the card.
   */
  children: PropTypes.node,
  /**
   *  The renderable content inside the icon slot of the header.
   */
  icon: PropTypes.node,
  /**
   *  The border color at the top of the card. Must be one of palette semantic colors. To set another color, the borderTop should be override.
   */
  semantic: PropTypes.oneOf([
    "sema0",
    "sema1",
    "sema2",
    "sema3",
    "sema4",
    "sema5",
    "sema6",
    "sema7",
    "sema8",
    "sema9",
    "sema10",
    "sema11",
    "sema12",
    "sema13",
    "sema14",
    "sema15",
    "sema16",
    "sema17",
    "sema18",
    "sema19",
  ]),
  /**
   * Whether the card is selectable.
   */
  selectable: PropTypes.bool,
  /**
   * Whether the card is currently selected.
   */
  selected: PropTypes.bool,
};

export default withStyles(styles, { name: "HvCard" })(Card);

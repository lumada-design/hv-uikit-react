import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { CardContent } from "@mui/material";
import { withStyles } from "@mui/styles";
import styles from "./styles";

/**
 * The content container for the card.
 */
export const Content = (props) => {
  const { id, classes, className, children, onClick, ...others } = props;
  return (
    <CardContent id={id} className={clsx(classes.content, className)} onClick={onClick} {...others}>
      {children}
    </CardContent>
  );
};

Content.propTypes = {
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root component.
     */
    content: PropTypes.string,
  }).isRequired,
  /**
   *  The renderable content inside the body of the card.
   */
  children: PropTypes.node,
  /**
   *  The function that will be executed when this section is clicked.
   */
  onClick: PropTypes.func,
};

export default withStyles(styles, { name: "HvCardContent" })(Content);

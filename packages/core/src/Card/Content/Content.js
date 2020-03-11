import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import uniqueId from "lodash/uniqueId";
import { CardContent, withStyles } from "@material-ui/core";
import styles from "./styles";

const DEFAULT_ID = "hv-content";
/**
 * The content container.
 *
 * @param {Object} { classes, className, innerCardContent, ...other }
 */
const Content = ({ id, classes, className, innerCardContent, onClickAction, ...others }) => (
  <CardContent
    id={id || uniqueId(DEFAULT_ID)}
    className={clsx(classes.content, className)}
    onClick={onClickAction}
    {...others}
  >
    {innerCardContent}
  </CardContent>
);

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
    /**
     * Style applied to the bottom border of the component is needed.
     */
    bottomBorder: PropTypes.string
  }).isRequired,
  /**
   *  The renderable content inside the body of the card.
   */
  innerCardContent: PropTypes.node,
  /**
   *  The function that will be executed when this section is clicked.
   */
  onClickAction: PropTypes.func
};

Content.defaultProps = {
  className: "",
  id: undefined,
  innerCardContent: undefined,
  onClickAction: () => {}
};

export default withStyles(styles, { name: "HvCardContent" })(Content);

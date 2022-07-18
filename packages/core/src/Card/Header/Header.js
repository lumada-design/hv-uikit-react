import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { CardHeader } from "@mui/material";
import { withStyles } from "@mui/styles";
import styles from "./styles";

/**
 * The header container for the card.
 */
export const Header = (props) => {
  const { classes, className, title, subheader, icon, onClick, ...others } = props;

  return (
    <CardHeader
      title={title}
      className={clsx(classes.root, className)}
      subheader={subheader}
      action={icon}
      classes={{
        title: icon ? classes.titleShort : classes.title,
        subheader: classes.subheader,
        action: classes.action,
        content: classes.content,
      }}
      onClick={onClick}
      {...others}
    />
  );
};

Header.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root of the component.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the title Typography element.
     */
    title: PropTypes.string,
    /**
     * Styles applied to the tittle Typography element when icon is present.
     */
    titleShort: PropTypes.string,
    /**
     * Styles applied to the subheader Typography element.
     */
    subheader: PropTypes.string,
    /**
     * Styles applied to the action element.
     */
    action: PropTypes.string,
    /**
     * Styles applied to the content wrapper element.
     */
    content: PropTypes.string,
  }).isRequired,
  /**
   *  The renderable content inside the title slot of the header.
   */
  title: PropTypes.node.isRequired,
  /**
   *  The renderable content inside the subheader slot of the header.
   */
  subheader: PropTypes.node,
  /**
   *  The renderable content inside the icon slot of the header.
   */
  icon: PropTypes.node,
  /**
   *  The function that will be executed when this section is clicked.
   */
  onClick: PropTypes.func,
};

export default withStyles(styles, { name: "HvCardHeader" })(Header);

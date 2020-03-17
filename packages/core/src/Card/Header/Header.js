import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import uniqueId from "lodash/uniqueId";
import { CardHeader, withStyles } from "@material-ui/core";
import styles from "./styles";

const DEFAULT_ID = "hv-header";

const Header = ({
  classes,
  className,
  headerTitle,
  subheader,
  icon,
  id,
  onClickAction,
  ...other
}) => (
  <CardHeader
    id={id || uniqueId(DEFAULT_ID)}
    title={headerTitle}
    className={clsx(classes.root, className)}
    subheader={subheader}
    action={icon}
    classes={{
      title: icon ? classes.titleShort : classes.title,
      subheader: classes.subheader,
      action: classes.action,
      content: classes.content
    }}
    onClick={onClickAction}
    {...other}
  />
);

Header.propTypes = {
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
     * Style applied to the root of the component.
     */
    root: PropTypes.string,
    /**
     * Style applied to the bottom border of the component is needed.
     */
    bottomBorder: PropTypes.string,
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
    content: PropTypes.string
  }).isRequired,
  /**
   *  The renderable content inside the title slot of the header.
   */
  headerTitle: PropTypes.node.isRequired,
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
  onClickAction: PropTypes.func
};

Header.defaultProps = {
  className: "",
  id: undefined,
  icon: null,
  subheader: undefined,
  onClickAction: () => {}
};

export default withStyles(styles, { name: "HvCardHeader" })(Header);

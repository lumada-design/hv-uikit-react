import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import VerticalContainer from "./VerticalContainer";
import { setId } from "../utils";
import styles from "./styles";

/**
 * It is recommended to use vertical navigation when your application requires global navigation that is displayed on the left.
 * While vertical navigation menus generally consume more space than their horizontal counterparts, they have become more popular as desktop monitors move to wide-screen formats.
 *
 * Our implementation of the vertical navigation is divided in:
 * <ul>
 * <li>Navigation</li>
 * <li>Actions</li>
 * <li>Action</li>
 * </ul>
 * To build the vertical navigation a composition of these elements should be used.
 *
 */
const VerticalNavigation = ({
  id,
  className,
  classes,
  isOpen: isOpenProp,
  toggleOpenCallback,
  isCollapsable = false,
  children,
  position = "static",
  closeOnExit = false,
  ...others
}) => {
  const isOpen = isOpenProp != null ? isOpenProp : !isCollapsable;

  return (
    <VerticalContainer
      id={setId(id, "container")}
      isOpen={isOpen}
      toggleOpenCallback={toggleOpenCallback}
      position={position}
      isAnchorBarVisible={isCollapsable}
      closeOnExit={closeOnExit}
      {...others}
    >
      <div
        id={id}
        className={clsx(className, classes.root, {
          [classes.noCollapsable]: !isCollapsable,
        })}
      >
        {children}
      </div>
    </VerticalContainer>
  );
};

VerticalNavigation.propTypes = {
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied to the component.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root of the component.
     */
    root: PropTypes.string,
    /**
     * Style applied to the root of the component when it not collapsable.
     */
    noCollapsable: PropTypes.string,
  }).isRequired,
  /**
   * Sets if the navigation should have a button to hide itself.
   */
  isCollapsable: PropTypes.bool,
  /**
   * The content inside the actions container.
   */
  children: PropTypes.node,
  /**
   * Is the navigation open.
   */
  isOpen: PropTypes.bool,
  /**
   * Callback when the navigation toggles between open and close.
   */
  toggleOpenCallback: PropTypes.func,
  /**
   * Position of the component.
   */
  position: PropTypes.oneOf(["static", "relative", "fixed", "absolute"]),
  /**
   * Defines if the navigation should close when losing focus / clicking outside.
   */
  closeOnExit: PropTypes.bool,
};

export default withStyles(styles, { name: "HvVerticalNavigation" })(VerticalNavigation);

import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import useUniqueId from "../useUniqueId";
import VerticalContainer from "./VerticalContainer";
import styles from "./styles";

const VerticalNavigation = props => {
  const {
    id,
    classes,
    isOpen: isOpenProp,
    toggleOpenCallback,
    isCollapsable = false,
    children,
    position = "static",
    closeOnExit = false
  } = props;

  const internalId = useUniqueId(id, "hv-verticalnavigation");

  const isOpen = isOpenProp != null ? isOpenProp : !isCollapsable;

  return (
    <VerticalContainer
      id={`${internalId}-container`}
      isOpen={isOpen}
      toggleOpenCallback={toggleOpenCallback}
      position={position}
      isAnchorBarVisible={isCollapsable}
      closeOnExit={closeOnExit}
    >
      <div
        id={internalId}
        className={clsx(classes.root, {
          [classes.noCollapsable]: !isCollapsable
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
    noCollapsable: PropTypes.string
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
  closeOnExit: PropTypes.bool
};

export default withStyles(styles, { name: "HvVerticalNavigation" })(VerticalNavigation);

import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { deprecatedPropType } from "@mui/material";
import { withStyles } from "@mui/styles";
import VerticalContainer from "./VerticalContainer";
import { setId } from "../utils";
import styles from "./styles";

/**
 * Navigation enables users to move through an app to complete tasks.
 *
 * It is recommended to use vertical navigation when your application requires global navigation that is displayed on the left.
 * While vertical navigation menus generally consume more space than their horizontal counterparts, they have become more popular as desktop monitors move to wide-screen formats.
 *
 * Even thou both the hierarchically organized data and the visual style ressemble a treeview-like structure, the [Treeview Design Pattern](https://w3c.github.io/aria-practices/#TreeView)
 * isn't necessarily the most appropriate.
 *
 * The tree role provides complex functionality that is not needed for typical site navigation, and changes the most common keyboard navigation using TAB.
 *
 * The [Disclosure Design Pattern](https://w3c.github.io/aria-practices/#disclosure) is more suited for typical site navigation, with expandable groups of links.
 * However it can be tedious to TAB through all navigation items to reach the actions panel.
 *
 * Both modes are available via the `mode` property and each app should choose the most appropriate.
 */
const VerticalNavigation = ({
  id,
  className,
  classes,

  children,

  // deprecated props
  isOpen: isOpenProp,
  toggleOpenCallback,
  isCollapsable: isCollapsableProp,
  position: positionProp,
  closeOnExit: closeOnExitProp,
  buttonAriaLabel,

  ...others
}) => {
  const deprecatedMode =
    isOpenProp != null ||
    toggleOpenCallback != null ||
    isCollapsableProp != null ||
    positionProp != null ||
    closeOnExitProp != null ||
    buttonAriaLabel != null;

  let isOpen;
  let isCollapsable;
  let position;
  let closeOnExit;
  if (deprecatedMode) {
    // restore the default values if needed
    closeOnExit = closeOnExitProp ?? false;
    position = positionProp ?? "static";
    isCollapsable = isCollapsableProp ?? false;
    isOpen = isOpenProp ?? !isCollapsable;
  }

  const content = (
    <div
      id={id}
      className={clsx(className, classes.root, {
        [classes.noCollapsable]: deprecatedMode && !isCollapsable,
        [classes.legacyMode]: deprecatedMode,
      })}
      {...others}
    >
      {children}
    </div>
  );

  if (deprecatedMode) {
    return (
      <VerticalContainer
        id={setId(id, "container")}
        isOpen={isOpen}
        toggleOpenCallback={toggleOpenCallback}
        position={position}
        isAnchorBarVisible={isCollapsable}
        closeOnExit={closeOnExit}
        buttonAriaLabel={buttonAriaLabel}
      >
        {content}
      </VerticalContainer>
    );
  }

  return content;
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
     *
     * @deprecated This logic should be external, i.e. using the HvVerticalNavigation inside a Drawer component.
     */
    noCollapsable: deprecatedPropType(PropTypes.string),
    /**
     * @ignore
     */
    legacyMode: PropTypes.string,
  }).isRequired,

  /**
   * The content inside the actions container.
   */
  children: PropTypes.node,

  /**
   * Sets if the navigation should have a button to hide itself.
   *
   * @deprecated This logic should be external, i.e. using the HvVerticalNavigation inside a Drawer component.
   */
  isCollapsable: deprecatedPropType(
    PropTypes.bool,
    "This logic should be external, i.e. using the HvVerticalNavigation inside a Drawer component."
  ),
  /**
   * Is the navigation open.
   *
   * @deprecated This logic should be external, i.e. using the HvVerticalNavigation inside a Drawer component.
   */
  isOpen: deprecatedPropType(
    PropTypes.bool,
    "This logic should be external, i.e. using the HvVerticalNavigation inside a Drawer component."
  ),
  /**
   * Callback when the navigation toggles between open and close.
   */
  toggleOpenCallback: PropTypes.func,
  /**
   * Position of the component.
   *
   * @deprecated This logic should be external, i.e. using the HvVerticalNavigation inside a Drawer component.
   */
  position: deprecatedPropType(
    PropTypes.oneOf(["static", "relative", "fixed", "absolute"]),
    "This logic should be external, i.e. using the HvVerticalNavigation inside a Drawer component."
  ),
  /**
   * Defines if the navigation should close when losing focus / clicking outside.
   *
   * @deprecated This logic should be external, i.e. using the HvVerticalNavigation inside a Drawer component.
   */
  closeOnExit: deprecatedPropType(
    PropTypes.bool,
    "This logic should be external, i.e. using the HvVerticalNavigation inside a Drawer component."
  ),
  /**
   * Aria-label for the button that opens the vertical navigation.
   *
   * @deprecated This logic should be external, i.e. using the HvVerticalNavigation inside a Drawer component.
   */
  buttonAriaLabel: deprecatedPropType(
    PropTypes.bool,
    "This logic should be external, i.e. using the HvVerticalNavigation inside a Drawer component."
  ),
};

export default withStyles(styles, { name: "HvVerticalNavigation" })(VerticalNavigation);

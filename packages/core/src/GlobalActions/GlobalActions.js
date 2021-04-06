import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Backwards } from "@hv/uikit-react-icons";
import { withStyles } from "@material-ui/core";
import isString from "lodash/isString";

import HvButton from "../Button";
import HvTypography from "../Typography";

import styles from "./styles";

/**
 * Global Actions are actions that affect the entire page they live in.
 * They should persist while scrolling down the screen.
 */
const HvGlobalActions = (props) => {
  const {
    className,
    classes,
    title,
    children,
    variant = "global",
    backButton,
    backButtonAction,
    backButtonAriaLabel = "Back",
    backwardsIcon,
    headingLevel,
    position = "sticky",
    ...others
  } = props;

  const BackButtonComp = () => (
    <HvButton aria-label={backButtonAriaLabel} icon onClick={backButtonAction}>
      {backwardsIcon || <Backwards />}
    </HvButton>
  );

  const headingLevelToApply = headingLevel || (variant === "global" ? 1 : 2);

  return (
    <div
      className={clsx(className, classes.root, {
        [classes.positionSticky]: position === "sticky",
        [classes.positionFixed]: position === "fixed",
        [classes.global]: variant === "global",
      })}
      {...others}
    >
      <div
        className={clsx(classes.wrapper, {
          [classes.globalWrapperComplement]: variant === "global",
          [classes.globalSectionArea]: variant === "section",
        })}
      >
        <div className={classes.name}>
          {variant === "global" && (
            <div className={classes.backButton}>{backButton || <BackButtonComp />}</div>
          )}

          {!isString(title) ? (
            title
          ) : (
            <HvTypography
              variant="sectionTitle"
              component={`h${headingLevelToApply}`}
              className={classes.name}
            >
              {title}
            </HvTypography>
          )}
        </div>
        <div className={classes.actions}>{children}</div>
      </div>
    </div>
  );
};

HvGlobalActions.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**

     * Styles applied to the component root class if component is sticky.
     */
    positionSticky: PropTypes.string,
    /**
     * Styles applied to the component root class if component is fixed.
     */
    positionFixed: PropTypes.string,
    /**
     * Styles applied to the component root when `variant="global"`.
     */
    global: PropTypes.string,
    /**
     * Styles applied to the component wrapper class.
     */
    wrapper: PropTypes.string,
    /**
     * Styles applied to the component wrapper class, to differentiate from a section area.
     */
    globalWrapperComplement: PropTypes.string,
    /**
     * Styles applied to the components globalSectionArea class.
     */
    globalSectionArea: PropTypes.string,
    /**
     * Styles applied to the component backButton class.
     */
    backButton: PropTypes.string,
    /**
     * Styles applied to the naming section.
     */
    name: PropTypes.string,
    /**
     * Styles applied to the actions container.
     */
    actions: PropTypes.string,
  }).isRequired,
  /**
   * Action Buttons passed into the Component.
   */
  children: PropTypes.node.isRequired,
  /**
   * Denotes if this is a global or section component.
   */
  variant: PropTypes.string,
  /**
   * Text to display in the component.
   */
  title: PropTypes.node,
  /**
   * Allows the user to pass in a fully customized button.
   */
  backButton: PropTypes.node,
  /**
   * Action to be executed by the Back button in the Global Actions.
   */
  backButtonAction: PropTypes.func,
  /**
   * Aria label to be applied to the back navigation button.
   */
  backButtonAriaLabel: PropTypes.string,
  /**
   * Custom item to be applied to Backwards button.
   */
  backwardsIcon: PropTypes.node,
  /**
   * Heading Level to apply to Title Area.
   */
  headingLevel: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  /**
   * Position of the Global Actions
   */
  position: PropTypes.oneOf(["sticky", "fixed"]),
};

export default withStyles(styles, { name: "HvGlobalActions" })(HvGlobalActions);

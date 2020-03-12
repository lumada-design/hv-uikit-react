import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import styles from "./styles";

const defaultVariantMapping = {
  "5xlTitle": "h1",
  "4xlTitle": "h1",
  "3xlTitle": "h1",
  xxlTitle: "h1",
  xlTitle: "h1",
  lTitle: "h2",
  mTitle: "h3",
  sTitle: "h4",
  xsTitle: "h5",
  xxsTitle: "h6",
  highlightText: "p",
  normalText: "p",
  selectedText: "p",
  disabledButtonText: "p",
  placeholderText: "p",
  inlineLink: "p",
  selectedNavText: "p",
  labelText: "p",
  infoText: "p",
  sLink: "p",
  sText: "p",
  vizText: "p"
};

const HvTypography = React.forwardRef(
  (
    {
      variant = "normalText",
      classes = {},
      paragraph = false,
      className = undefined,
      component = null,
      id = undefined,
      children = "",
      ...other
    },

    ref
  ) => {
    const Component = component || (paragraph ? "p" : defaultVariantMapping[variant]) || "span";

    return (
      <Component
        id={id}
        ref={ref}
        className={clsx(classes[variant], classes.baseFontFamily, classes.margin, className)}
        {...other}
      >
        {children}
      </Component>
    );
  }
);

HvTypography.propTypes = {
  /**
   * The text to be set.
   */
  children: PropTypes.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   * See CSS API tab for more details.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the 3xlTitle variant
     */
    "3xlTitle": PropTypes.string,
    /**
     * Styles applied to the 4xlTitle variant
     */
    "4xlTitle": PropTypes.string,
    /**
     * Styles applied to the 5xlTitle variant.
     */
    "5xlTitle": PropTypes.string,
    /**
     * Styles applied to the disabledButtonText variant
     */
    disabledButtonText: PropTypes.string,
    /**
     * Styles applied to the disabledText variant
     */
    disabledText: PropTypes.string,
    /**
     * Styles applied to the highlightText variant
     */
    highlightText: PropTypes.string,
    /**
     * Styles applied to the infoText variant
     */
    infoText: PropTypes.string,
    /**
     * Styles applied to the inlineLink variant
     */
    inlineLink: PropTypes.string,
    /**
     * Styles applied to the labelText variant
     */
    labelText: PropTypes.string,
    /**
     * Styles applied to the lTitle variant
     */
    lTitle: PropTypes.string,
    /**
     * Styles applied to the mTitle variant
     */
    mTitle: PropTypes.string,
    /**
     * Styles applied to the normalText variant
     */
    normalText: PropTypes.string,
    /**
     * Styles applied to the placeholderText variant
     */
    placeholderText: PropTypes.string,
    /**
     * Styles applied to the selectedNavText variant
     */
    selectedNavText: PropTypes.string,
    /**
     * Styles applied to the sLink variant
     */
    sLink: PropTypes.string,
    /**
     * Styles applied to the sText variant
     */
    sText: PropTypes.string,
    /**
     * Styles applied to the sTitle variant
     */
    sTitle: PropTypes.string,
    /**
     * Styles applied to the vizText variant
     */
    vizText: PropTypes.string,
    /**
     * Styles applied to the xlTitle variant
     */
    xlTitle: PropTypes.string,
    /**
     * Styles applied to the xsTitle variant
     */
    xsTitle: PropTypes.string,
    /**
     * Styles applied to the xxlTitle variant
     */
    xxlTitle: PropTypes.string
  }),
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   * By default, it maps the variant to a good default headline component.
   */
  component: PropTypes.elementType,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * If `true`, the text will have a bottom margin.
   */
  paragraph: PropTypes.bool,
  /**
   * The selected typography.
   */
  variant: PropTypes.oneOf([
    "3xlTitle",
    "4xlTitle",
    "5xlTitle",
    "disabledButtonText",
    "disabledText",
    "highlightText",
    "infoText",
    "inlineLink",
    "labelText",
    "lTitle",
    "mTitle",
    "normalText",
    "placeholderText",
    "selectedNavText",
    "selectedText",
    "sLink",
    "sText",
    "sTitle",
    "vizText",
    "xlTitle",
    "xsTitle",
    "xxlTitle",
    "xxsTitle"
  ])
};

export default withStyles(styles, { name: "HvTypography" })(HvTypography);

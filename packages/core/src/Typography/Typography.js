import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import styles from "./styles";

/**
 * Mapping of typography with HTML elements.
 * @type {{infoText: string, xxsTitle: string, disabledButtonText: string, xsTitle: string, labelText: string, "5xlTitle": string, sTitle: string, xlTitle: string, highlightText: string, inlineLink: string, lTitle: string, normalText: string, "4xlTitle": string, "3xlTitle": string, sLink: string, xxlTitle: string, mTitle: string, vizText: string}}
 */
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

/**
 * Typography element. It uses the define typography set in the theme, selected by the variant.
 *
 * @param theme
 * @param children
 * @param variant
 * @returns {*}
 * @constructor
 */
const Typography = React.forwardRef(
  (
    {
      variant,
      classes,
      paragraph,
      className,
      component,
      id,
      children,
      ...other
    },
    ref
  ) => {
    const Component =
      component || (paragraph ? "p" : defaultVariantMapping[variant]) || "span";

    return (
      <Component
        id={id}
        ref={ref}
        className={clsx(
          classes[variant],
          classes.baseFontFamily,
          classes.margin,
          className
        )}
        {...other}
      >
        {children}
      </Component>
    );
  }
);

Typography.propTypes = {
  /**
   * Styles applied to the Drawer Paper element.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * ClassName passed as prop.
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
   * The text to be set.
   */
  children: PropTypes.node,
  /**
   * The selected typography.
   */
  variant: PropTypes.oneOf([
    "5xlTitle",
    "4xlTitle",
    "3xlTitle",
    "xxlTitle",
    "xlTitle",
    "lTitle",
    "mTitle",
    "sTitle",
    "xsTitle",
    "xxsTitle",
    "highlightText",
    "normalText",
    "selectedText",
    "disabledButtonText",
    "placeholderText",
    "inlineLink",
    "selectedNavText",
    "labelText",
    "infoText",
    "sLink",
    "sText",
    "vizText"
  ])
};

Typography.defaultProps = {
  variant: "normalText",
  className: undefined,
  id: undefined,
  component: null,
  paragraph: false,
  children: ""
};

export default withStyles(styles, { name: "HvTypography" })(Typography);

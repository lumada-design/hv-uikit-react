import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@mui/styles";
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
  sectionTitle: "p",
  highlightText: "p",
  normalText: "p",
  placeholderText: "p",
  link: "p",
  disabledText: "p",
  selectedNavText: "p",
  vizText: "p",
  vizTextDisabled: "p",
  xsInlineLink: "p",
};

const HvTypography = React.forwardRef((props, ref) => {
  const {
    id,
    variant = "normalText",
    classes,
    paragraph = false,
    className,
    component,
    children,
    noWrap = false,
    ...others
  } = props;
  const Component = component || (paragraph ? "p" : defaultVariantMapping[variant]) || "span";

  return (
    <Component
      id={id}
      ref={ref}
      className={clsx(className, classes.root, classes[variant], {
        [classes.noWrap]: noWrap,
      })}
      {...others}
    >
      {children}
    </Component>
  );
});

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
     * Styles applied to the component root element
     */
    root: PropTypes.string,
    /**
     * Styles applied to the 5xlTitle variant
     */
    "5xlTitle": PropTypes.string,
    /**
     * Styles applied to the 4xlTitle variant
     */
    "4xlTitle": PropTypes.string,
    /**
     * Styles applied to the 3xlTitle variant.
     */
    "3xlTitle": PropTypes.string,
    /**
     * Styles applied to the xxlTitle variant
     */
    xxlTitle: PropTypes.string,
    /**
     * Styles applied to the xlTitle variant
     */
    xlTitle: PropTypes.string,
    /**
     * Styles applied to the lTitle variant
     */
    lTitle: PropTypes.string,
    /**
     * Styles applied to the mTitle variant
     */
    mTitle: PropTypes.string,
    /**
     * Styles applied to the sTitle variant
     */
    sTitle: PropTypes.string,
    /**
     * Styles applied to the xsTitle variant
     */
    xsTitle: PropTypes.string,
    /**
     * Styles applied to the xxsTitle variant
     */
    xxsTitle: PropTypes.string,
    /**
     * Styles applied to the highlightText variant
     */
    highlightText: PropTypes.string,
    /**
     * Styles applied to the normalText variant
     */
    normalText: PropTypes.string,
    /**
     * Styles applied to the placeholderText variant
     */
    placeholderText: PropTypes.string,
    /**
     * Styles applied to the link variant
     */
    link: PropTypes.string,
    /**
     * Styles applied to the disabledText variant
     */
    disabledText: PropTypes.string,
    /**
     * Styles applied to the selectedNavText variant
     */
    selectedNavText: PropTypes.string,
    /**
     * Styles applied to the vizText variant
     */
    vizText: PropTypes.string,
    /**
     * Styles applied to the vizTextDisabled variant
     */
    vizTextDisabled: PropTypes.string,
    /**
     * Styles applied to the xsInlineLink variant
     */
    xsInlineLink: PropTypes.string,
    /**
     * Styles applied to the root root element if noWrap is used
     */
    noWrap: PropTypes.string,
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
    "sectionTitle",
    "highlightText",
    "normalText",
    "placeholderText",
    "link",
    "disabledText",
    "selectedNavText",
    "vizText",
    "vizTextDisabled",
    "xsInlineLink",
  ]),
  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   */
  noWrap: PropTypes.bool,
};

export default withStyles(styles, { name: "HvTypography" })(HvTypography);

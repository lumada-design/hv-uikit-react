import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Avatar, withStyles, useTheme } from "@material-ui/core";

import { User } from "@hitachivantara/uikit-react-icons";

import { decreaseSize, useImageLoaded } from "../utils";

import styles from "./styles";

const getColor = (theme, color, defaultColor) => theme.palette[color] || color || defaultColor;

/**
 * Avatars can be used to represent a user or a brand.
 * They can show an image, an icon or the initial letters of a name, for example.
 */
const HvAvatar = (props) => {
  const {
    className,
    style,
    classes,
    children: childrenProp,
    component,
    size = "S",
    backgroundColor = "acce1",
    color = "atmo1",
    src,
    srcSet,
    sizes,
    alt,
    imgProps,
    ...others
  } = props;

  let children = null;

  // Use a hook instead of onError on the img element to support server-side rendering.
  const imageLoaded = useImageLoaded(src, srcSet);
  const hasImg = src || srcSet;
  const hasImgNotFailing = hasImg && imageLoaded !== "error";

  if (hasImgNotFailing) {
    children = (
      <img
        alt={alt}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        className={classes.img}
        {...imgProps}
      />
    );
  } else if (childrenProp != null) {
    children = childrenProp;
  } else if (hasImg && alt) {
    [children] = alt;
  } else {
    children = <User color={color} iconSize={decreaseSize(size)} className={classes.fallback} />;
  }

  const inlineStyle = {
    ...style,
  };

  if (component != null && typeof component !== "string") {
    // override border-radius with custom components
    inlineStyle.borderRadius = "50%";
  }

  const theme = useTheme();
  if (!hasImgNotFailing) {
    inlineStyle.backgroundColor = getColor(theme, backgroundColor, theme.hv.palette.accent.acce1);
    inlineStyle.color = getColor(theme, color, theme.hv.palette.atmosphere.atmo1);
  }

  return (
    <Avatar
      component={component}
      className={clsx(className, classes.root, classes[size])}
      style={inlineStyle}
      {...others}
    >
      {children}
    </Avatar>
  );
};

HvAvatar.propTypes = {
  /**
   * Identifier to be applied to the root element.
   */
  id: PropTypes.string,

  /**
   * Class names to be applied to the root element.
   */
  className: PropTypes.string,
  /**
   * Inline styles to be applied to the root element.
   */
  style: PropTypes.instanceOf(Object),
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root element.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the root element when size is S.
     */
    S: PropTypes.string,
    /**
     * Styles applied to the root element when size is M.
     */
    M: PropTypes.string,
    /**
     * Styles applied to the root element when size is L.
     */
    L: PropTypes.string,
    /**
     * Styles applied to the img element if either `src` or `srcSet` is defined.
     */
    img: PropTypes.string,
    /**
     * Styles applied to the fallback icon.
     */
    fallback: PropTypes.string,
  }).isRequired,

  /**
   * Used to render icon or text elements inside the Avatar if `src` is not set.
   * This can be an element, or just a string.
   */
  children: PropTypes.node,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,

  /**
   * Sets one of the standard sizes of the icons
   */
  size: PropTypes.oneOf(["S", "M", "L"]),

  /**
   * A String representing the background color of the avatar.
   * You can use either an HEX or color name from the palette.
   */
  backgroundColor: PropTypes.string,
  /**
   * A String representing the foreground color of the avatar's
   * letters or the generic User icon fallback.
   * You can use either an HEX or color name from the palette.
   */
  color: PropTypes.string,

  /**
   * The `src` attribute for the `img` element.
   */
  src: PropTypes.string,
  /**
   * The `srcSet` attribute for the `img` element.
   * Use this attribute for responsive image display.
   */
  srcSet: PropTypes.string,
  /**
   * The `sizes` attribute for the `img` element.
   */
  sizes: PropTypes.string,
  /**
   * Used in combination with `src` or `srcSet` to
   * provide an alt attribute for the rendered `img` element.
   */
  alt: PropTypes.string,
  /**
   * Attributes applied to the `img` element if the component is used to display an image.
   * It can be used to listen for the loading error event.
   */
  imgProps: PropTypes.instanceOf(Object),
};

export default withStyles(styles, { name: "HvAvatar" })(HvAvatar);

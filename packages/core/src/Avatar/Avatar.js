import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Avatar } from "@mui/material";
import { withStyles, useTheme } from "@mui/styles";
import { User } from "@hitachivantara/uikit-react-icons";

import { decreaseSize, useImageLoaded } from "../utils";
import styles from "./styles";

const getColor = (theme, color, defaultColor) => theme.palette[color] || color || defaultColor;

const normalizeSize = (size) => {
  if (size === "S" || size === "M" || size === "L") {
    // eslint-disable-next-line no-console
    console.warn(
      "`size` values S, M and L are deprecated. Please use XS, SM, MD, LG or XL instead"
    );
    switch (size) {
      case "S":
        return "SM";
      case "M":
        return "MD";
      case "L":
        // this is intentional. the old L corresponds to the new XL. should be
        // removed once the old nomenclature is removed.
        return "XL";
      default:
        break;
    }
  }
  return size;
};

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
    size = "SM",
    backgroundColor = "acce1",
    color = "atmo1",
    src,
    srcSet,
    sizes,
    alt,
    imgProps,
    status,
    badge,
    variant = "circular",
    containerProps,
    ...others
  } = props;

  // S, M and L are now deprecated, this intends to normalize the size to the new norm of XS, SM, MD, LG and XL
  const normalizedSize = normalizeSize(size);

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
    children = (
      <User color={color} iconSize={decreaseSize(normalizedSize)} className={classes.fallback} />
    );
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

  const statusInlineStyle = {};
  if (status) {
    // set the status border. we're using the boxShadow property to set the border
    // to be inside the container and not on its edge.
    const statusColor = getColor(theme, status, theme.hv.palette.semantic.sema1);
    statusInlineStyle.boxShadow = `inset 0px 0px 0px 2px ${statusColor}`;
  }

  const badgeColor = getColor(theme, badge, theme.hv.palette.semantic.sema1);

  /**
   * Note: on the next major release this should be updated. the `others` prop should be
   * used in the container instead of the `containerProps` and a new `avatarProps`
   * should be created to pass on any props down to the avatar component. This wasn't
   * done now in order to not break the current API. Also, consider using the `root` class
   * on the container element as it makes more semantic sense.
   */
  return (
    <div className={classes.container} {...containerProps}>
      <div
        className={clsx(classes.status, classes[variant], classes[normalizedSize])}
        style={statusInlineStyle}
      >
        {badge && <div className={classes.badge} style={{ backgroundColor: badgeColor }} />}
        <Avatar
          component={component}
          className={clsx(className, classes.root, classes.avatar, classes[normalizedSize])}
          style={inlineStyle}
          variant={variant}
          {...others}
        >
          {children}
        </Avatar>
      </div>
    </div>
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
     * Styles applied to the root element when size is XS.
     */
    XS: PropTypes.string,
    /**
     * Styles applied to the root element when size is SM.
     */
    SM: PropTypes.string,
    /**
     * Styles applied to the root element when size is MD.
     */
    MD: PropTypes.string,
    /**
     * Styles applied to the root element when size is LG.
     */
    LG: PropTypes.string,
    /**
     * Styles applied to the root element when size is XL.
     */
    XL: PropTypes.string,
    /**
     * Styles applied to the img element if either `src` or `srcSet` is defined.
     */
    img: PropTypes.string,
    /**
     * Styles applied to the fallback icon.
     */
    fallback: PropTypes.string,
    /**
     * Styles applied to the container element.
     */
    container: PropTypes.string,
    /**
     * Styles applied to the avatar element.
     */
    avatar: PropTypes.string,
    /**
     * Styles applied to the badge element.
     */
    badge: PropTypes.string,
    /**
     * Styles applied to the status element.
     */
    status: PropTypes.string,
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
  size: PropTypes.oneOf(["S", "M", "L", "XS", "SM", "MD", "LG", "XL"]),

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
  /**
   * A string representing the type of avatar to display, circular or square.
   */
  variant: PropTypes.oneOf(["circular", "square"]),
  /**
   * A string representing the color of the avatar border that represents its status.
   */
  status: PropTypes.string,
  /**
   * A string representing the color of the avatar badge.
   */
  badge: PropTypes.string,
  /**
   * Attributes applied to the container element.
   */
  containerProps: PropTypes.instanceOf(Object),
};

export default withStyles(styles, { name: "HvAvatar" })(HvAvatar);

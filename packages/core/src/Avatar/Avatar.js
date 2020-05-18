/*
 * Copyright 2020 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { Avatar } from "@material-ui/core";

import { User } from "@hv/uikit-react-icons/dist/Generic";

import { decreaseSize } from "../utils/sizes";
import useImageLoaded from "../utils/useImageLoaded";

const getColor = (theme, color, defaultColor) => {
  const flatColors = Object.assign({}, ...Object.values(theme.hv.palette));
  return flatColors[color] || color || defaultColor;
};

/**
 * Avatars can be used to represent a user or a brand.
 * They can show an image, an icon or the initial letters of a name, for example.
 */
const HvAvatar = forwardRef((props, ref) => {
  const {
    className,
    style,
    classes,
    theme,
    children: childrenProp,
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
    children = (
      <User
        color={[color]}
        iconSize={decreaseSize(size)}
        className={classes.fallback}
      />
    );
  }

  const inlineStyle = {
    ...style,
  };

  if (!hasImgNotFailing) {
    inlineStyle.backgroundColor = getColor(
      theme,
      backgroundColor,
      theme.hv.palette.accent.acce1
    );
    inlineStyle.color = getColor(
      theme,
      color,
      theme.hv.palette.atmosphere.atmo1
    );
  }

  return (
    <Avatar
      ref={ref}
      className={classNames(className, classes.root, classes[size])}
      style={inlineStyle}
      {...others}
    >
      {children}
    </Avatar>
  );
});

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
   * The theme passed by the provider.
   */
  theme: PropTypes.instanceOf(Object).isRequired,

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

HvAvatar.defaultProps = {
  id: undefined,
  className: null,
  style: null,
  children: null,
  component: "div",
  backgroundColor: "acce1",
  color: "atmo1",
  size: "S",
  src: null,
  srcSet: null,
  sizes: null,
  alt: null,
  imgProps: null,
};

export default HvAvatar;

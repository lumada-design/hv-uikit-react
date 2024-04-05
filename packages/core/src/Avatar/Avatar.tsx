import { forwardRef } from "react";
import MuiAvatar, { AvatarProps as MuiAvatarProps } from "@mui/material/Avatar";
import { User } from "@hitachivantara/uikit-react-icons";
import {
  getColor,
  HvColorAny,
  HvSize,
  theme,
} from "@hitachivantara/uikit-styles";

import { useAvatarGroupContext } from "../AvatarGroup/AvatarGroupContext";
import { useDefaultProps } from "../hooks/useDefaultProps";
import { useImageLoaded } from "../hooks/useImageLoaded";
import { HvBaseProps } from "../types/generic";
import { ExtractNames } from "../utils/classes";
import { decreaseSize } from "../utils/sizes";
import { staticClasses, useClasses } from "./Avatar.styles";

export { staticClasses as avatarClasses };

export type HvAvatarClasses = ExtractNames<typeof useClasses>;

export type HvAvatarVariant = "circular" | "square";

export interface HvAvatarProps extends HvBaseProps {
  /** The component used for the root node. Either a string to use a DOM element or a component. */
  component?: React.ElementType;
  /** Sets one of the standard sizes of the icons */
  size?: HvSize;
  /** A color representing the foreground color of the avatar's letters or the generic User icon fallback. */
  color?: HvColorAny;
  /** A String representing the background color of the avatar. */
  backgroundColor?: HvColorAny;
  /** The `src` attribute for the `img` element. */
  src?: string;
  /** The `srcSet` attribute for the `img` element. Use this attribute for responsive image display. */
  srcSet?: string;
  /** The `sizes` attribute for the `img` element. */
  sizes?: string;
  /** Used in combination with `src` or `srcSet` to provide an alt attribute for the rendered `img` element. */
  alt?: string;
  /**
   * Attributes applied to the `img` element if the component is used to display an image.
   * It can be used to listen for the loading error event.
   */
  imgProps?: React.HTMLAttributes<HTMLImageElement>;
  /** A string representing the type of avatar to display, circular or square. */
  variant?: HvAvatarVariant;
  /** A string representing the color of the avatar border that represents its status. */
  status?: string;
  /** A string representing the color of the avatar badge. */
  badge?: string;
  /** Attributes applied to the avatar element. */
  avatarProps?: MuiAvatarProps;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvAvatarClasses;
}

/**
 * Avatars can be used to represent a user or a brand.
 * They can show an image, an icon or the initial letters of a name, for example.
 */
export const HvAvatar = forwardRef<any, HvAvatarProps>((props, ref) => {
  const {
    className,
    style,
    classes: classesProp,
    children: childrenProp,
    component = "div",
    size: sizeProp,
    backgroundColor = "secondary",
    color = "atmo1",
    src,
    srcSet,
    sizes,
    alt,
    imgProps,
    status,
    badge,
    variant = "circular",
    avatarProps,
    ...others
  } = useDefaultProps("HvAvatar", props);
  const { classes, cx } = useClasses(classesProp);

  const avatarGroupContext = useAvatarGroupContext();

  const size = sizeProp || avatarGroupContext?.size || "sm";

  let children: React.ReactNode;

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
        color={color}
        iconSize={decreaseSize(size)}
        className={classes.fallback}
      />
    );
  }

  const inlineStyle: React.CSSProperties = {
    ...style,
  };

  if (component != null && typeof component !== "string") {
    // override border-radius with custom components
    inlineStyle.borderRadius = "50%";
  }

  if (!hasImgNotFailing) {
    inlineStyle.backgroundColor = getColor(
      backgroundColor,
      theme.colors.secondary,
    );
    inlineStyle.color = getColor(color, theme.colors.atmo1);
  }

  const statusInlineStyle: React.CSSProperties = {};
  if (status) {
    // set the status border. we're using the boxShadow property to set the border
    // to be inside the container and not on its edge.
    const statusColor = getColor(status, theme.colors.positive);
    statusInlineStyle.boxShadow = `inset 0px 0px 0px 2px ${statusColor}`;
  }

  const badgeColor = getColor(badge || "", theme.colors.positive);

  return (
    <div ref={ref} className={classes.container} {...others}>
      <div
        className={cx(classes.status, classes[variant], classes[size])}
        style={statusInlineStyle}
      >
        {badge && (
          <div
            className={classes.badge}
            style={{ backgroundColor: badgeColor }}
          />
        )}
        <MuiAvatar
          component={component}
          // Consider not using the root and className classes in this component
          className={cx(classes.root, classes.avatar, classes[size], className)}
          style={inlineStyle}
          variant={variant}
          size={size}
          {...avatarProps}
        >
          {children}
        </MuiAvatar>
      </div>
    </div>
  );
});

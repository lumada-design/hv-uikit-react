import { CSSProperties, HTMLAttributes } from "react";

import { User } from "@hitachivantara/uikit-react-icons";
import { theme } from "@hitachivantara/uikit-styles";

import MuiAvatar, { AvatarProps as MuiAvatarProps } from "@mui/material/Avatar";

import { HvBaseProps } from "@core/types/generic";
import { useImageLoaded } from "@core/hooks/useImageLoaded";
import { decreaseSize } from "@core/utils/sizes";
import { ExtractNames } from "@core/utils/classes";

import { staticClasses, useClasses } from "./Avatar.styles";

export { staticClasses as avatarClasses };

export type HvAvatarClasses = ExtractNames<typeof useClasses>;

export type HvAvatarVariant = "circular" | "square";

export type HvAvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface HvAvatarProps extends HvBaseProps {
  /** Inline styles to be applied to the root element. */
  style?: CSSProperties;
  /** The component used for the root node. Either a string to use a DOM element or a component. */
  component?: React.ElementType;
  /** Sets one of the standard sizes of the icons */
  size?: HvAvatarSize;
  /**
   * A string representing the foreground color of the avatar's
   * letters or the generic User icon fallback.
   * You can use either an HEX or color name from the palette.
   */
  color?: string;
  /** A String representing the background color of the avatar. You can use either an HEX or color name from the palette. */
  backgroundColor?: string;
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
  imgProps?: HTMLAttributes<HTMLImageElement>;
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
 * Get a color from the theme palette
 * @param {object} theme The theme object
 * @param {string} color A color to use if none is found on the theme palette
 * @param {string} defaultColor The fallback color to use
 */
const getColor = (color: string, defaultColor: string): string =>
  theme.colors[color] || color || defaultColor;

/**
 * Avatars can be used to represent a user or a brand.
 * They can show an image, an icon or the initial letters of a name, for example.
 */
export const HvAvatar = ({
  className,
  style,
  classes: classesProp,
  children: childrenProp,
  component = "div",
  size = "sm",
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
}: HvAvatarProps) => {
  const { classes, cx } = useClasses(classesProp);

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

  const inlineStyle: CSSProperties = {
    ...style,
  };

  if (component != null && typeof component !== "string") {
    // override border-radius with custom components
    inlineStyle.borderRadius = "50%";
  }

  if (!hasImgNotFailing) {
    inlineStyle.backgroundColor = getColor(
      backgroundColor,
      theme.colors.secondary
    );
    inlineStyle.color = getColor(color, theme.colors.atmo1);
  }

  const statusInlineStyle: CSSProperties = {};
  if (status) {
    // set the status border. we're using the boxShadow property to set the border
    // to be inside the container and not on its edge.
    const statusColor = getColor(status, theme.colors.positive);
    statusInlineStyle.boxShadow = `inset 0px 0px 0px 2px ${statusColor}`;
  }

  const badgeColor = getColor(badge || "", theme.colors.positive);

  return (
    <div className={classes.container} {...others}>
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
};

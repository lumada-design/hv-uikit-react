import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { HvSemanticColorKeys, HvAtmosphereColorKeys } from "..";

export type HvAvatarClassKey =
  | "root"
  | "XS"
  | "SM"
  | "MD"
  | "LG"
  | "XL"
  | "img"
  | "fallback"
  | "container"
  | "status"
  | "badge"
  | "avatar";

export interface HvAvatarProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvAvatarClassKey> {
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component?: React.ElementType;

  /**
   * Sets one of the standard sizes of the icons.
   */
  size?: "S" | "M" | "L" | "XS" | "SM" | "MD" | "LG" | "XL";

  /**
   * A String representing the background color of the avatar.
   * You can use either an HEX or color name from the palette.
   */
  backgroundColor?: string;
  /**
   * A String representing the foreground color of the avatar's
   * letters or the generic User icon fallback.
   * You can use either an HEX or color name from the palette.
   */
  color?: string;

  /**
   * The `src` attribute for the `img` element.
   */
  src?: string;
  /**
   * The `srcSet` attribute for the `img` element.
   * Use this attribute for responsive image display.
   */
  srcSet?: string;
  /**
   * The `sizes` attribute for the `img` element.
   */
  sizes?: string;
  /**
   * Used in combination with `src` or `srcSet` to
   * provide an alt attribute for the rendered `img` element.
   */
  alt?: string;
  /**
   * Attributes applied to the `img` element if the component is used to display an image.
   * It can be used to listen for the loading error event.
   */
  imgProps?: React.HTMLAttributes<HTMLImageElement>;
  /**
   * A string representing the type of avatar to display, circular or square.
   */
  variant: "circular" | "square";
  /**
   * A string representing the color of the avatar border that represents its status.
   */
  status?: "sema0" | HvSemanticColorKeys | HvAtmosphereColorKeys;
  /**
   * A string representing the color of the avatar badge.
   */
  badge?: "sema0" | HvSemanticColorKeys | HvAtmosphereColorKeys;
  /**
   * Attributes applied to the container element.
   */
  containerProps?: object;
}

export default function HvAvatar(props: HvAvatarProps): JSX.Element | null;

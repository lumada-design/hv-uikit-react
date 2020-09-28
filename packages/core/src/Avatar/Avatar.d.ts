import * as React from "react";
import { StandardProps } from "@material-ui/core";

export type HvAvatarClassKey = "root" | "S" | "M" | "L" | "img" | "fallback";

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
  size?: "S" | "M" | "L";

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
}

export default function HvAvatar(props: HvAvatarProps): JSX.Element | null;

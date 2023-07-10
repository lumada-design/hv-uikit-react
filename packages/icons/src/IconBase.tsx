import styled from "@emotion/styled";
import React, { HTMLAttributes, AllHTMLAttributes, useMemo } from "react";
import { theme } from "@hitachivantara/uikit-styles";

const getColor = (c: string): string => theme?.colors?.[c] || c;

const getDims = (size: number) => ({ width: size, height: size });

const sizeSelector = (iconSize?: IconSize, hasSpecialSize?: boolean) => {
  const calcSize = (size: number) => (hasSpecialSize ? size + 8 : size);

  switch (iconSize) {
    case "XS":
      return getDims(calcSize(12));
    // eslint-disable-next-line default-case-last
    default:
    case "S":
      return getDims(calcSize(16));
    case "M":
      return getDims(calcSize(32));
    case "L":
      return getDims(calcSize(96));
  }
};

export function useIconColor(
  color?: string | string[],
  semantic?: string,
  inverted = false,
  palette: string[] = []
) {
  return useMemo(() => {
    const colorArray =
      (typeof color === "string" && [getColor(color)]) ||
      (Array.isArray(color) && color.map?.(getColor)) ||
      palette;

    if (semantic) {
      colorArray[0] = theme.colors?.[semantic] || colorArray[0];
    }

    if (inverted && colorArray[1]) {
      // eslint-disable-next-line prefer-destructuring
      colorArray[1] = colorArray[0];
      colorArray[0] = "none";
    }

    return colorArray;
  }, [color, inverted, palette, semantic]);
}

export function useIconSize(
  iconSize?: IconSize,
  height?: number,
  width?: number,
  hasSpecialSize = false
) {
  return useMemo(() => {
    if (height && width) return { width, height };
    return sizeSelector(iconSize, hasSpecialSize);
  }, [hasSpecialSize, height, iconSize, width]);
}

export function useIcon(
  props: IconBaseProps,
  palette: string[] = [],
  hasSpecialSize = false
) {
  const { color, iconSize, width, height, semantic, inverted } = props;
  const colorArray = useIconColor(color, semantic, inverted, palette);
  const size = useIconSize(iconSize, height, width, hasSpecialSize);

  return { size, colorArray };
}

export type IconSize = "XS" | "S" | "M" | "L";

type HTMLDivProps = Pick<AllHTMLAttributes<HTMLDivElement>, "name"> &
  Pick<
    HTMLAttributes<HTMLDivElement>,
    Exclude<keyof HTMLAttributes<HTMLDivElement>, "color" | "height" | "width">
  >;

export interface IconBaseProps extends HTMLDivProps {
  /**
   * A String or Array of strings representing the colors to override in the icon.
   * Each element inside the array will override a different color.
   * You can use either an HEX or color name from the palette.
   */
  color?: string | string[];
  /** Sets one of the standard sizes of the icons */
  iconSize?: IconSize;
  /** A string that will override the viewbox of the svg */
  viewbox?: string;
  /** A string that will override the height of the svg */
  height?: number;
  /** A string that will override the width of the svg */
  width?: number;
  /** Sets one of the standard semantic palette colors of the icon */
  semantic?: string;
  /** Inverts the background-foreground on semantic icons */
  inverted?: boolean;
  /** Props passed down to the svg element. */
  svgProps?: React.SVGProps<SVGSVGElement>;
}

export const StyledIconBase = styled("div")(
  ({ iconSize }: { iconSize: IconSize }) => ({
    display: "flex",
    "& svg": {
      margin: "auto",
      color: "inherit",
    },
    ...(iconSize === "XS" && getDims(32)),
    ...(iconSize === "S" && getDims(32)),
    ...(iconSize === "M" && getDims(48)),
    ...(iconSize === "L" && getDims(112)),
  })
);

export const IconBase = ({
  children,
  color,
  iconSize = "S",
  ...others
}: IconBaseProps) => {
  return (
    <StyledIconBase iconSize={iconSize} {...others}>
      {children}
    </StyledIconBase>
  );
};

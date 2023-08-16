import styled from "@emotion/styled";
import React, { HTMLAttributes, useMemo } from "react";
import { theme } from "@hitachivantara/uikit-styles";

const largerIcons = [
  "Level0Good",
  "Level1",
  "Level2Average",
  "Level3Bad",
  "Level4",
  "Level5",
  "Canceled",
  "Running",
  "Pending",
];

const hasSpecialSize = (iconId: string) => largerIcons.includes(iconId);

const getColor = (c: string): string => theme?.colors?.[c] || c;

const getDims = (size: number) => ({ width: size, height: size });

const getMargin = (id: string, iconSize: IconSize) => {
  const padding = iconSize === "XS" ? 10 : 8;
  return hasSpecialSize(id) ? padding - 4 : padding;
};

const sizeSelector = (iconId: string, iconSize?: IconSize) => {
  const calcSize = (size: number) => (hasSpecialSize(iconId) ? size + 8 : size);

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

export function useIconColor(props: IconBaseProps, palette: string[] = []) {
  const { color, semantic, inverted = false } = props;
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
  iconId: string,
  iconSize?: IconSize,
  height?: string | number,
  width?: string | number
) {
  return useMemo(() => {
    if (height && width) return { width, height };
    return sizeSelector(iconId, iconSize);
  }, [iconId, height, iconSize, width]);
}

export type IconSize = "XS" | "S" | "M" | "L";

export interface IconBaseProps
  extends Omit<HTMLAttributes<HTMLOrSVGElement>, "color" | "height" | "width"> {
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
  height?: string | number;
  /** A string that will override the width of the svg */
  width?: string | number;
  /** Sets one of the standard semantic palette colors of the icon */
  semantic?: string;
  /** Inverts the background-foreground on semantic icons */
  inverted?: boolean;
  /** Props passed down to the svg element. */
  svgProps?: React.SVGProps<SVGSVGElement>;
}

const StyledSvg = styled("svg", {
  shouldForwardProp: (prop) => !prop.startsWith("$"),
})(({ $id, $iconSize }: { $id: string; $iconSize: IconSize }) => ({
  display: "flex",
  color: "inherit",
  margin: getMargin($id, $iconSize),
  ...($iconSize === "XS" && getDims(12)),
  ...($iconSize === "S" && getDims(16)),
  ...($iconSize === "M" && getDims(32)),
  ...($iconSize === "L" && getDims(96)),
}));

export const IconBase = ({
  id,
  children,
  height,
  width,
  iconSize = "S",
  // remove from others
  color,
  semantic,
  inverted,
  ...others
}: IconBaseProps & { id: string }) => {
  const size = useIconSize(id, iconSize, height, width);

  return (
    <StyledSvg
      $id={id}
      data-name={id}
      $iconSize={iconSize}
      focusable={false}
      {...size}
      {...others}
    >
      {children}
    </StyledSvg>
  );
};

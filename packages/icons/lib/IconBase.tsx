import React, { HTMLAttributes, AllHTMLAttributes, useMemo } from "react";
import styled from "@emotion/styled";
import { theme, getColor } from "@hitachivantara/uikit-styles";

import { isSemantic, isXS } from "./utils";

const getDims = (size: number) => ({ width: size, height: size });

export const getColorVars = (colorArray: string[]) => {
  return colorArray.reduce((acc, value, index) => {
    acc[`--color-${index}`] = value;
    return acc;
  }, {} as Record<string, string>);
};

export const getIconSize = (
  iconSize?: IconSize,
  hasSpecialSize?: boolean,
  width?: number,
  height?: number
) => {
  if (width && height) return { width, height };

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

export const getIconColors = (
  palette: string[] = [],
  color?: string | string[],
  semantic?: string,
  inverted = false
) => {
  const colorArray = palette;

  if (typeof color === "string") {
    colorArray[0] = getColor(color) as string;
  } else if (Array.isArray(color)) {
    colorArray.forEach((_, i) => {
      colorArray[i] = getColor(color[i]) as string;
    });
  }

  if (semantic) {
    colorArray[0] = theme.colors?.[semantic] || colorArray[0];
  }

  if (inverted && colorArray[1]) {
    // eslint-disable-next-line prefer-destructuring
    colorArray[1] = colorArray[0];
    colorArray[0] = "none";
  }

  return colorArray;
};

/** Splits icon `props` between those to be passed to container or svg */
export const splitIconProps = (iconName: string, props: IconBaseProps) => {
  const {
    role,
    title,
    iconSize: iconSizeProp,
    width,
    height,
    svgProps,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    ...rest
  } = props;
  const iconSize = iconSizeProp ?? (isXS(iconName) ? "XS" : "S");
  const size = getIconSize(iconSize, isSemantic(iconName), width, height);

  const newSvgProps: HTMLAttributes<SVGElement> = {
    focusable: false,
    // pass size props
    ...size,
    // pass a11y props
    title,
    role,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    // pass all other `svgProps`
    ...svgProps,
  };

  const newOtherProps: IconBaseProps = {
    iconSize,
    ...rest,
  };

  return [newSvgProps, newOtherProps] as const;
};

export function useIconColor(
  palette: string[] = [],
  color?: string | string[],
  semantic?: string,
  inverted = false
) {
  return useMemo(() => {
    return getIconColors(palette, color, semantic, inverted);
  }, [color, inverted, palette, semantic]);
}

export function useIconSize(
  iconSize?: IconSize,
  height?: number,
  width?: number,
  hasSpecialSize = false
) {
  return useMemo(() => {
    return getIconSize(iconSize, hasSpecialSize, width, height);
  }, [hasSpecialSize, height, iconSize, width]);
}

export function useIcon(
  props: IconBaseProps,
  palette: string[] = [],
  hasSpecialSize = false
) {
  const { color, iconSize, width, height, semantic, inverted } = props;
  const colorArray = useIconColor(palette, color, semantic, inverted);
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
  /**
   * Sets one of the standard semantic palette colors of the icon
   * @deprecated use the `color` prop instead
   */
  semantic?: string;
  /**
   * Inverts the background-foreground on semantic icons
   * @deprecated use the `color` prop instead
   */
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

export type IconType = React.FC<IconBaseProps>;

export const IconBase = ({
  children,
  palette,
  height,
  width,
  color,
  semantic,
  inverted = false,
  iconSize = "S",
  iconName,
  style,
  ...others
}: IconBaseProps & { palette: string[]; iconName: string }) => {
  const colorArray = getIconColors(palette, color, semantic, inverted);
  const colorVars = getColorVars(colorArray);

  return (
    <StyledIconBase
      data-name={iconName}
      iconSize={iconSize}
      style={{ ...colorVars, ...style }}
      {...others}
    >
      {children}
    </StyledIconBase>
  );
};

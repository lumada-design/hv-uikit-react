import React from "react";
import styled from "@emotion/styled";
import { getColor, HvColorAny, theme } from "@hitachivantara/uikit-styles";

import { isSemantic, isXS } from "./utils";

const getDims = (size: number) => ({ width: size, height: size });

export const getColorVars = (colorArray: string[]) => {
  return colorArray.reduce(
    (acc, value, index) => {
      acc[`--color-${index}`] = value;
      return acc;
    },
    {} as Record<string, string>,
  );
};

export const getIconSize = (
  iconSize?: IconSize,
  hasSpecialSize?: boolean,
  width?: number,
  height?: number,
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
  color?: HvColorAny | HvColorAny[],
  semantic?: string,
  inverted = false,
) => {
  const colorArray = palette;

  if (typeof color === "string") {
    colorArray[0] = getColor(color)!;
  } else if (Array.isArray(color)) {
    colorArray.forEach((_, i) => {
      colorArray[i] = getColor(color[i])!;
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

  const newSvgProps: React.HTMLAttributes<SVGElement> = {
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

export type IconSize = "XS" | "S" | "M" | "L";

export interface IconBaseProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  /**
   * A color or array of colors to override the default icon colors.
   * Accepts any valid CSS color or color from the UI Kit palette.
   * @example ["brand", "inherit"]
   */
  color?: HvColorAny | HvColorAny[];
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
  }),
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

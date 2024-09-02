import { forwardRef, memo } from "react";
import styled from "@emotion/styled";
import {
  getColor,
  HvColorAny,
  HvSize,
  theme,
} from "@hitachivantara/uikit-styles";

import { isSemantic, isXS } from "./utils";

const calcSize = (size: number, isLarger = false) =>
  isLarger ? size + 8 : size;

const getColorVars = (colorArray: string[]) => {
  return colorArray.reduce<Record<string, string>>((acc, value, index) => {
    acc[`--color-${index}`] = value;
    return acc;
  }, {});
};

/** sizes for the <svg> icon */
const getSvgSize = (size: IconBaseProps["size"] | IconSize) => {
  switch (size) {
    case "xs":
    case "XS":
      return 12;
    case "sm":
    case "S":
    case undefined:
      return 16;
    case "md":
    case "M":
      return 32;
    case "lg":
    case "L":
      return 96;
    case "xl":
      return 112;
    default:
      return size;
  }
};

const getSizeStyles = (
  iconName: string,
  size: IconBaseProps["size"] = isXS(iconName) ? "XS" : "S",
) => {
  const baseSize = getSvgSize(size);
  const fontSize = calcSize(baseSize, isSemantic(iconName));
  if (fontSize === 16) return; // use default values

  const containerSize = baseSize + 2 * (baseSize === 12 ? 10 : 8);

  return {
    fontSize,
    "--size": `${containerSize}px`,
  };
};

const getIconColors = (
  palette: string[] = [],
  color?: HvColorAny | HvColorAny[],
  semantic?: string,
  inverted = false,
) => {
  // Copy array to avoid mutating the palette
  const colorArray = [...palette];

  if (typeof color === "string") {
    colorArray[0] = color;
  } else if (Array.isArray(color)) {
    colorArray.forEach((_, i) => {
      colorArray[i] = color[i];
    });
  }

  // TODO: remove in v6
  if (semantic) {
    colorArray[0] =
      theme.colors?.[semantic as keyof typeof theme.colors] || colorArray[0];
  }

  // TODO: remove in v6
  if (inverted && colorArray[1]) {
    // eslint-disable-next-line prefer-destructuring
    colorArray[1] = colorArray[0];
    colorArray[0] = "none";
  }

  return colorArray.map((c) => getColor(c)!);
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
  /** The size of the SVG icon */
  size?: HvSize | IconSize | number;
  /** Sets one of the standard sizes of the icons @deprecated use `size` instead */
  iconSize?: IconSize;
  /**
   * A string that will override the viewbox of the svg
   * @deprecated DO NOT OVERRIDE viewbox - use the `size` instead
   */
  viewbox?: string;
  /**
   * A string that will override the height of the svg
   * @deprecated use `size` instead (or `svgProps.style.height`)
   */
  height?: number;
  /**
   * A string that will override the width of the svg
   * @deprecated use `size` instead (or `svgProps.style.height`)
   */
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

export const StyledIconBase = styled("div")({
  display: "flex",
  // TODO: inherit color in v6?
  // color: "inherit",
  // TODO: remove box in v6?
  fontSize: 16,
  // box has a minimum size of 32px (`xs` & `sm`)
  width: "var(--size, 32px)",
  height: "var(--size, 32px)",
  transition: "rotate 0.2s ease",
});

const StyledSvg = styled("svg")({
  margin: "auto",
  color: "inherit",
  fill: "currentcolor",
  width: "1em",
  height: "1em",
  fontSize: "inherit",
});

export type IconType = React.ForwardRefExoticComponent<IconBaseProps>;

const IconBaseInternal = (
  props: IconBaseProps & {
    palette?: string[];
    iconName: string;
    viewBox?: string;
  },
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    // internal props
    children,
    palette,
    iconName,
    viewBox,

    // deprecated props
    viewbox: viewBoxProp,
    height,
    width,
    semantic,
    inverted,

    // standard props
    title: titleProp,
    // keep aria-label for `HvTooltip`+icon compatibility
    "aria-label": ariaLabel,
    color,
    size,
    iconSize,
    style: styleProp,

    svgProps,
    ...others
  } = props;
  const colorArray = getIconColors(palette, color, semantic, inverted);
  const title = titleProp ?? ariaLabel;

  return (
    <StyledIconBase
      ref={ref}
      data-name={iconName}
      style={{
        ...getColorVars(colorArray),
        ...getSizeStyles(iconName, size ?? iconSize),
        ...styleProp,
      }}
      {...others}
    >
      <StyledSvg
        viewBox={viewBoxProp ?? viewBox}
        focusable={false}
        role={title ? "img" : "none"}
        // TODO: remove in v6
        style={width && height ? { width, height } : undefined}
        {...svgProps}
      >
        {title ? <title>{title}</title> : null}
        {children}
      </StyledSvg>
    </StyledIconBase>
  );
};

export const IconBase = memo(forwardRef(IconBaseInternal));

export const createHvIcon = (
  iconName: string,
  viewBox: string,
  palette: string[],
  children: React.ReactNode,
): IconType => {
  const IconComponent = (
    props: IconBaseProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    return (
      <IconBase
        ref={ref}
        iconName={iconName}
        viewBox={viewBox}
        palette={palette}
        {...props}
      >
        {children}
      </IconBase>
    );
  };
  IconComponent.displayName = `HvIcon${iconName}`;

  return memo(forwardRef(IconComponent));
};

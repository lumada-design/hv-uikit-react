import { forwardRef, memo } from "react";
import styled from "@emotion/styled";
import { getColor, HvColorAny, theme } from "@hitachivantara/uikit-styles";

import { isSemantic, isXS } from "./utils";

const calcSize = (size: number, isLarger = false) =>
  isLarger ? size + 8 : size;

export const getColorVars = (colorArray: string[]) => {
  return colorArray.reduce<Record<string, string>>((acc, value, index) => {
    acc[`--color-${index}`] = value;
    return acc;
  }, {});
};

/** sizes for the <svg> icon */
const svgSizeMap: Record<IconSize, number> = {
  XS: 12,
  S: 16,
  M: 32,
  L: 96,
};

const getSizeStyles = (iconSize: IconSize, iconName: string) => {
  const isLarger = isSemantic(iconName);
  if (iconSize === "S" && !isLarger) return; // use default values
  const baseSize = svgSizeMap[iconSize] || svgSizeMap.S;

  return {
    margin: (iconSize === "XS" ? 10 : 8) - (isLarger ? 4 : 0),
    fontSize: calcSize(baseSize, isLarger),
  };
};

export const getIconColors = (
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
  /** Sets one of the standard sizes of the icons */
  iconSize?: IconSize;
  /**
   * A string that will override the viewbox of the svg
   * @deprecated NOT RECOMMENDED TO OVERRIDE. use `svgProps.viewBox` instead
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

const StyledSvg = styled("svg")({
  margin: 8,
  color: "inherit",
  fill: "currentcolor",
  width: "1em",
  height: "1em",
  // TODO: inherit size in v6?
  fontSize: 16,
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
    iconSize: iconSizeProp,
    style: styleProp,

    svgProps,
    ...others
  } = props;
  const colorArray = getIconColors(palette, color, semantic, inverted);
  const iconSize = iconSizeProp ?? (isXS(iconName) ? "XS" : "S");
  const title = titleProp ?? ariaLabel;

  return (
    <StyledSvg
      // @ts-expect-error align types
      ref={ref}
      data-name={iconName}
      style={{
        ...getColorVars(colorArray),
        ...getSizeStyles(iconSize, iconName),
        ...((width || height) && { fontSize: width || height }),
        ...styleProp,
      }}
      viewBox={viewBoxProp ?? viewBox}
      focusable={false}
      role={title ? "img" : "none"}
      // TODO: deprecate width/height in favour of `size`
      {...svgProps}
      {...others}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </StyledSvg>
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

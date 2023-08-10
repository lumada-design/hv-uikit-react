import { theme } from "@hitachivantara/uikit-styles";
import {
  IconBase,
  IconBaseProps,
  getColorVars,
  getIconColors,
  getIconSize,
} from "./IconBase";
import { isSelector, isSemantic, isSort, isXS } from "./utils";

const getSecondaryColor = (iconName: string) => {
  if (isSelector(iconName)) return theme.colors.atmo1;
  if (isSort(iconName)) return theme.colors.atmo4;

  return theme.colors.atmo2;
};

export interface HvIconSpriteProps
  extends Omit<IconBaseProps, "viewbox" | "inverted" | "semantic"> {
  spriteUrl: string;
  iconName: string;
}

export const HvIconSprite = ({
  spriteUrl,
  iconName,
  color,
  iconSize: iconSizeProp,
  height,
  width,
  svgProps = {},
  ...others
}: HvIconSpriteProps) => {
  const iconSize = iconSizeProp ?? (isXS(iconName) ? "XS" : "S");

  // this color array is fragile... we know it currently covers all the existing icons
  const baseColors = [theme.colors.secondary, getSecondaryColor(iconName)];
  const colorArray = getIconColors(baseColors, color);

  const size = getIconSize(iconSize, isSemantic(iconName), width, height);

  const { style: svgStyle, ...otherSvgProps } = svgProps;

  const colorVars = getColorVars(colorArray);

  return (
    <IconBase iconSize={iconSize} {...others}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={size.height}
        width={size.width}
        focusable={false}
        style={{ ...colorVars, ...svgStyle }}
        {...otherSvgProps}
      >
        <use
          href={`${spriteUrl}#${iconName}`}
          height={size.height}
          width={size.width}
        />
      </svg>
    </IconBase>
  );
};

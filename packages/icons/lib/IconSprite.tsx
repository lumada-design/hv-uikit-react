import { theme } from "@hitachivantara/uikit-styles";

import { IconBase, IconBaseProps, getIconSize } from "./IconBase";
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

/** The HvIconSprite component is used to display SVG icons from a sprite sheet. */
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

  const size = getIconSize(iconSize, isSemantic(iconName), width, height);

  return (
    <IconBase
      iconName={iconName}
      iconSize={iconSize}
      color={color}
      palette={baseColors}
      {...others}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={size.height}
        width={size.width}
        focusable={false}
        {...svgProps}
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

import { type HvColor } from "@hitachivantara/uikit-styles";

import { getIconSize, IconBase, IconBaseProps } from "./IconBase";
import { isSelector, isSemantic, isSort, isXS } from "./utils";

const getSecondaryColor = (iconName: string): HvColor => {
  if (isSelector(iconName)) return "atmo1";
  if (isSort(iconName)) return "atmo4";

  return "atmo2";
};

export interface HvIconSpriteProps
  extends Omit<IconBaseProps, "viewbox" | "inverted" | "semantic"> {
  /**
   * The URL to the SVG icon sprite, served statically by the application.
   * @example "/public/icons.svg"
   * */
  spriteUrl: string;
  /** The icon `id` to use. Must be present within the sprite sheet. */
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
  ...others
}: HvIconSpriteProps) => {
  const iconSize = iconSizeProp ?? (isXS(iconName) ? "XS" : "S");

  // this color array is fragile... we know it currently covers all the existing icons
  const baseColors: HvColor[] = ["secondary", getSecondaryColor(iconName)];

  const size = getIconSize(iconSize, isSemantic(iconName), width, height);

  return (
    <IconBase
      iconName={iconName}
      iconSize={iconSize}
      color={color}
      palette={baseColors}
      height={size.height}
      width={size.width}
      {...others}
    >
      <use
        href={`${spriteUrl}#${iconName}`}
        height={size.height}
        width={size.width}
      />
    </IconBase>
  );
};

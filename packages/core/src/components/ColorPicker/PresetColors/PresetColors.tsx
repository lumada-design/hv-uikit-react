import { ClassNames } from "@emotion/react";
import { HvTypography } from "@core/components";
// @types/react-color seems to be broken
// @ts-ignore
import { Swatch } from "react-color/lib/components/common";
import { styles } from "./PresetColors.styles";
import colorPickerPresetColorsClasses, {
  HvColorPickerPresetColorsClasses,
} from "./presetColorsClasses";

interface PresetColorsProps {
  colors: string[];
  onClick: (color: { hex: string; source: string }) => void;
  title?: string;
  className?: string;
  classes?: HvColorPickerPresetColorsClasses;
}

export const PresetColors = ({
  onClick,
  colors,
  title,
  className,
  classes,
}: PresetColorsProps) => {
  const handleClick = (hex: string) => {
    onClick({
      hex,
      source: "hex",
    });
  };

  return (
    <ClassNames>
      {({ css, cx }) => (
        <div
          className={cx(
            colorPickerPresetColorsClasses.root,
            css(styles.root),
            className,
            classes?.root
          )}
        >
          {title && (
            <HvTypography
              className={cx(
                colorPickerPresetColorsClasses.title,
                css(styles.title),
                classes?.title
              )}
              variant="caption1"
            >
              {title}
            </HvTypography>
          )}
          <div
            className={cx(
              colorPickerPresetColorsClasses.colors,
              css(styles.colors),
              classes?.colors
            )}
          >
            {colors.map((color, index) => {
              return (
                <div
                  key={`recommended-color-${color}-${index}`}
                  className={cx(
                    colorPickerPresetColorsClasses.swatchWrap,
                    css(styles.swatchWrap),
                    classes?.swatchWrap
                  )}
                >
                  <Swatch
                    color={color}
                    onClick={handleClick}
                    focusStyle={{
                      boxShadow: `inset 0 0 0 1px rgba(0,0,0,.15), 0 0 4px ${color}`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </ClassNames>
  );
};

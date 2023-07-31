// @types/react-color seems to be broken
// @ts-ignore
import { Swatch } from "react-color/lib/components/common";

import { HvTypography } from "@core/components/Typography";
import { ExtractNames } from "@core/utils/classes";

import { staticClasses, useClasses } from "./PresetColors.styles";

export { staticClasses as colorPickerPresetColorsClasses };

export type HvColorPickerPresetColorsClasses = ExtractNames<typeof useClasses>;

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
  classes: classesProp,
}: PresetColorsProps) => {
  const { classes, cx } = useClasses(classesProp);

  const handleClick = (hex: string) => {
    onClick({
      hex,
      source: "hex",
    });
  };

  return (
    <div className={cx(classes.root, className)}>
      {title && (
        <HvTypography className={classes.title} variant="caption1">
          {title}
        </HvTypography>
      )}
      <div className={classes.colors}>
        {colors.map((color, index) => (
          <div
            key={`recommended-color-${color}-${index}`}
            className={classes.swatchWrap}
          >
            <Swatch
              color={color}
              onClick={handleClick}
              focusStyle={{
                boxShadow: `inset 0 0 0 1px rgba(0,0,0,.15), 0 0 4px ${color}`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

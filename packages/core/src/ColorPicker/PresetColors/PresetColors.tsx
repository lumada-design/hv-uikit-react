// @ts-ignore @types/react-color seems to be broken
import { Swatch } from "react-color/lib/components/common";
import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";
import { getColor, HvColorAny } from "@hitachivantara/uikit-styles";

import { HvTypography } from "../../Typography";
import { useClasses } from "./PresetColors.styles";

interface PresetColorsProps {
  colors: HvColorAny[];
  onClick: (color: { hex: string; source: string }) => void;
  title?: string;
  className?: string;
  classes?: ExtractNames<typeof useClasses>;
}

export const PresetColors = (props: PresetColorsProps) => {
  const {
    onClick,
    colors,
    title,
    className,
    classes: classesProp,
  } = useDefaultProps("HvColorPickerPresetColors", props);
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
              style={{ backgroundColor: getColor(color) }}
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

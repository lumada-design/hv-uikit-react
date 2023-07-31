import { useCallback } from "react";

import { Saturation, Hue } from "react-color/lib/components/common";
import {
  CustomPicker,
  CustomPickerInjectedProps,
  HSLColor,
  HSVColor,
  RGBColor,
} from "react-color";

import { HvTypography } from "@core/components/Typography";
import { useTheme } from "@core/hooks/useTheme";
import { ExtractNames } from "@core/utils/classes";

import { staticClasses, useClasses } from "./Picker.styles";
import { Fields } from "../Fields";

export { staticClasses as colorPickerPickerClasses };

export type HvColorPickerPickerClasses = ExtractNames<typeof useClasses>;

export const Picker = CustomPicker(
  ({
    onChange,
    rgb,
    hsl,
    hsv,
    hex,
    title,
    classes: classesProp,
  }: {
    classes?: HvColorPickerPickerClasses;
    title?: string;
  } & CustomPickerInjectedProps<
    | HSLColor
    | HSVColor
    | RGBColor
    | {
        source?: string;
        hex?: string;
      }
  >) => {
    const { activeTheme } = useTheme();
    const { classes } = useClasses(classesProp);

    const SaturationPointer = useCallback(
      () => <div className={classes?.saturationPointer} />,
      [classes?.saturationPointer]
    );

    const HueSlider = useCallback(
      () => <div className={classes?.hueSlider} />,
      [classes?.hueSlider]
    );

    return (
      <>
        {title && (
          <HvTypography className={classes.title} variant="caption1">
            {title}
          </HvTypography>
        )}
        <div className={classes.pickers}>
          <div className={classes.saturation}>
            <Saturation
              hsl={hsl}
              hsv={hsv}
              onChange={onChange}
              pointer={SaturationPointer}
            />
          </div>
          <div className={classes.hue}>
            <Hue
              direction={activeTheme?.colorPicker.hueDirection}
              hsl={hsl}
              onChange={onChange}
              pointer={HueSlider}
            />
          </div>
        </div>
        <Fields
          className={classes.fields}
          rgb={rgb}
          hex={hex}
          onChange={onChange}
        />
      </>
    );
  }
);

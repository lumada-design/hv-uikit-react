import { useCallback } from "react";
import {
  CustomPicker,
  CustomPickerInjectedProps,
  HSLColor,
  HSVColor,
  RGBColor,
} from "react-color";
import { Hue, Saturation } from "react-color/lib/components/common";
import { useTheme } from "@hitachivantara/uikit-react-shared";

import { useDefaultProps } from "../../hooks/useDefaultProps";
import { HvTypography } from "../../Typography";
import { ExtractNames } from "../../utils/classes";
import { Fields } from "../Fields";
import { staticClasses, useClasses } from "./Picker.styles";

export { staticClasses as colorPickerPickerClasses };

export type HvColorPickerPickerClasses = ExtractNames<typeof useClasses>;

interface PickerProps
  extends CustomPickerInjectedProps<
    | HSLColor
    | HSVColor
    | RGBColor
    | {
        source?: string;
        hex?: string;
      }
  > {
  classes?: HvColorPickerPickerClasses;
  title?: string;
}

const Component = (props: PickerProps) => {
  const {
    onChange,
    rgb,
    hsl,
    hsv,
    hex,
    title,
    classes: classesProp,
  } = useDefaultProps("HvColorPickerPicker", props);
  const { activeTheme } = useTheme();
  const { classes } = useClasses(classesProp);

  const SaturationPointer = useCallback(
    () => <div className={classes?.saturationPointer} />,
    [classes?.saturationPointer],
  );

  const HueSlider = useCallback(
    () => <div className={classes?.hueSlider} />,
    [classes?.hueSlider],
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
};

export const Picker = CustomPicker(Component);

import { ClassNames } from "@emotion/react";
import { useCallback } from "react";
import { Saturation, Hue } from "react-color/lib/components/common";
import {
  CustomPicker,
  CustomPickerInjectedProps,
  HSLColor,
  HSVColor,
  RGBColor,
} from "react-color";
import { styles } from "./Picker.styles";
import { Fields } from "../Fields";
import { HvTypography } from "@core/components";
import { useTheme } from "@core/hooks";
import colorPickerPickerClasses, {
  HvColorPickerPickerClasses,
} from "./pickerClasses";

export const Picker = ({
  onChange,
  rgb,
  hsl,
  hsv,
  hex,
  title,
  classes,
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

  const SaturationPointer = useCallback(
    () => (
      <ClassNames>
        {({ css, cx }) => (
          <div
            className={cx(
              colorPickerPickerClasses.saturationPointer,
              css(styles.saturationPointer),
              classes?.saturationPointer
            )}
          />
        )}
      </ClassNames>
    ),
    []
  );

  const HueSlider = useCallback(
    () => (
      <ClassNames>
        {({ css, cx }) => (
          <div
            className={cx(
              colorPickerPickerClasses.hueSlider,
              css(styles.hueSlider),
              classes?.hueSlider
            )}
          />
        )}
      </ClassNames>
    ),
    []
  );

  return (
    <ClassNames>
      {({ css, cx }) => (
        <>
          {title && (
            <HvTypography
              className={cx(
                colorPickerPickerClasses.title,
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
              colorPickerPickerClasses.pickers,
              css(styles.pickers),
              classes?.pickers
            )}
          >
            <div
              className={cx(
                colorPickerPickerClasses.saturation,
                css(styles.saturation),
                classes?.saturation
              )}
            >
              <Saturation
                hsl={hsl}
                hsv={hsv}
                onChange={onChange}
                pointer={SaturationPointer}
              />
            </div>
            <div
              className={cx(
                colorPickerPickerClasses.hue,
                css(styles.hue),
                classes?.hue
              )}
            >
              <Hue
                direction={activeTheme?.colorPicker.hueDirection}
                hsl={hsl}
                onChange={onChange}
                pointer={HueSlider}
              />
            </div>
          </div>
          <Fields
            className={cx(colorPickerPickerClasses.fields, classes?.fields)}
            rgb={rgb}
            hex={hex}
            onChange={onChange}
          />
        </>
      )}
    </ClassNames>
  );
};

export default CustomPicker(Picker);

/* eslint-disable no-param-reassign */

import clsx from "clsx";
import React, { useCallback } from "react";
import { Saturation, ColorWrap, Hue } from "react-color/lib/components/common";

import Fields from "../Fields";
import useStyles from "./styles";

// eslint-disable-next-line react/prop-types
const Picker = ({ onChange, rgb, hsl, hsv, hex }) => {
  const classes = useStyles();

  const SaturationPointer = useCallback(
    () => <div className={clsx(classes.saturationPointer)} />,
    [classes.saturationPointer]
  );
  const HueSlider = useCallback(
    () => <div className={clsx(classes.hueSlider)} />,
    [classes.hueSlider]
  );

  return (
    <>
      <div className={clsx(classes.pickers)}>
        <div className={clsx(classes.saturation)}>
          <Saturation hsl={hsl} hsv={hsv} onChange={onChange} pointer={SaturationPointer} />
        </div>
        <div className={clsx(classes.hue)}>
          <Hue direction="vertical" hsl={hsl} onChange={onChange} pointer={HueSlider} />
        </div>
      </div>
      <Fields rgb={rgb} hsl={hsl} hex={hex} onChange={onChange} />
    </>
  );
};

export default ColorWrap(Picker);

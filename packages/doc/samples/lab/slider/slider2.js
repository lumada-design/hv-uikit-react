import React from "react";
import HvSlider from "@hv/uikit-react-lab/dist/Slider";

const threeKnobProperties = [
  {
    color: "#72cccb",
    dragColor: "#96d9d8",
    trackColor: "#72cccb"
  },
  {
    color: "#f9dc37",
    dragColor: "#fbe56a",
    trackColor: "#f9dc37"
  },
  {
    color: "#ff9100",
    dragColor: "#ffa733",
    trackColor: "#ff9100"
  }
];

const threeKnobPropertiesDefaults = [10, 20, 30];

export default (
  <HvSlider
    markStep={10}
    knobProperties={threeKnobProperties}
    defaultValues={threeKnobPropertiesDefaults}
  />
);

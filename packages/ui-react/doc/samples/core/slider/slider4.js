import React from "react";
import HvSlider from "@hv-ui/react/core/Slider";

const scaledKnobProperties = [
  {
    color: "#72cccb",
    dragColor: "#96d9d8",
    defaultValue: 0.3
  },
  {
    color: "#72cccb",
    dragColor: "#96d9d8",
    defaultValue: 0.5
  }
];

const scaledKnobPropertiesDefaults = [0.3, 0.5];

export default (
  <HvSlider
    markStep={10}
    knobProperties={scaledKnobProperties}
    defaultValues={scaledKnobPropertiesDefaults}
    minPointValue={0.1}
    maxPointValue={0.7}
    divisionQuantity={30}
    noOverlap={false}
    markDigits={2}
  />
);

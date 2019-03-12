import React from "react";
import HvSlider from "@hv-ui/react/core/Slider";

const knobPropertiesDefaults = [10, 20, 30, 40, 100];

const knobProperties = [
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
  },
  {
    color: "#cc0000",
    dragColor: "#ff0000",
    trackColor: "#cc0000"
  },
  {
    color: "#cc0000",
    trackColor: "#cc0000",
    fixed: true,
    hidden: true
  }
];

const formatMark = mark => `${mark}%`;

export default (
    <HvSlider
      formatMark={formatMark}
      divisionQuantity={100}
      minPointValue={0}
      maxPointValue={100}
      markStep={10}
      defaultValues={knobPropertiesDefaults}
      knobProperties={knobProperties}
    />
);

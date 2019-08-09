import React, { useState, useEffect } from "react";
import HvSlider from "@hv/uikit-react-lab/dist/Slider";
import HvButton from "@hv/uikit-react-core/dist/Button";

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

const ExtendedHvSlider = ({ knobPropertiesDefault, knobProperties }) => {
  const [knobsValues, setKnobValues] = useState(knobPropertiesDefault);

  return (
    <>
      <HvButton onClick={() => setKnobValues(knobPropertiesDefault)}>
        Reset
      </HvButton>
      <HvSlider
        markStep={10}
        knobProperties={knobProperties}
        values={knobsValues}
        defaultValues={knobPropertiesDefault}
        onChange={({ knobsValues: values }) => {
          setKnobValues(values);
        }}
      />
    </>
  );
};

export default (
  <ExtendedHvSlider
    knobPropertiesDefault={threeKnobPropertiesDefaults}
    knobProperties={threeKnobProperties}
  />
);

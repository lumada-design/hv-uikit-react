import React from "react";
import { storiesOf } from "@storybook/react";
import { HvSlider, HvShowCase, HvShowCaseHeader } from "../src";

const knobProperties = [
  {
    color: "#72cccb",
    dragColor: "#96d9d8",
    defaultValue: 10
  },
  {
    color: "#f9dc37",
    dragColor: "#fbe56a",
    defaultValue: 20
  },
  {
    color: "#ff9100",
    dragColor: "#ffa733",
    defaultValue: 30
  },
  {
    color: "#cc0000",
    dragColor: "#ff0000",
    defaultValue: 40
  },
  {
    color: "#cc0000",
    defaultValue: 100,
    fixed: true,
    hidden: true
  }
];

const threeKnobProperties = [
  {
    color: "#72cccb",
    dragColor: "#96d9d8",
    defaultValue: 10
  },
  {
    color: "#f9dc37",
    dragColor: "#fbe56a",
    defaultValue: 20
  },
  {
    color: "#ff9100",
    dragColor: "#ffa733",
    defaultValue: 30
  }
];

const threeKnobFixedProperties = [
  {
    color: "yellow",
    dragColor: "black",
    defaultValue: 10
  },
  {
    color: "green",
    dragColor: "red",
    defaultValue: 50
  },
  {
    color: "purple",
    dragColor: "#orange",
    fixed: true,
    defaultValue: 80
  }
];

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

const formatMark = mark => `${mark}%`;

storiesOf("Slider", module).add("Multi-Slider", () => (
  <>
    <HvShowCaseHeader reviewed date="2019/Jan/18" />

    <HvShowCase
      title="Mark in tooltip"
      description="An invisible knob exist in the position 100, making impossible to choose that value (no overlapping)"
    >
      <HvSlider
        formatMark={formatMark}
        divisionQuantity={100}
        minPointValue={0}
        maxPointValue={100}
        markStep={10}
        knobProperties={knobProperties}
      />
    </HvShowCase>

    <HvShowCase
      title="Three knobs"
      description="Shows the possibility of manipulating N quantity of knobs and a range"
    >
      <HvSlider markStep={10} knobProperties={threeKnobProperties} />
    </HvShowCase>

    <HvShowCase
      title="Three knobs different color"
      description="Shows the possibility manipulating the color of the knobs"
    >
      <HvSlider markStep={10} knobProperties={threeKnobFixedProperties} />
    </HvShowCase>

    <HvShowCase
      title="Two knobs with overlapping and a fractionary scale"
      description=" Range from 0.10 to 0.70 with 30 points defined. Each point represents 0.02 units."
    >
      <HvSlider
        markStep={10}
        knobProperties={scaledKnobProperties}
        minPointValue={0.1}
        maxPointValue={0.7}
        divisionQuantity={30}
        noOverlap={false}
        markDigits={2}
      />
    </HvShowCase>
  </>
));

import React from "react";
import { storiesOf } from "@storybook/react";
import { HvSlider } from "../src";

const buttonStyles = {
  margin: "50px",
  width: "500px"
}

const knobProperties = [
  {
    color: "#72cccb",
    dragColor: "#96d9d8",
    defaultValue: 10,
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
]

const TwoKnobProperties = [
  {
    color: "#72cccb",
    dragColor: "#96d9d8",
    defaultValue: 10,
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
]

const threeKnobProperties = [
  {
    color: "yellow",
    dragColor: "black",
    defaultValue: 10,
  },
  {
    color: "green",
    dragColor: "red",
    defaultValue: 80
  },
  {
    color: "purple",
    dragColor: "#orange",
    fixed: true,
    defaultValue: 80
  }
]

const scaledKnobProperties = [
  {
    color: "#72cccb",
    dragColor: "#96d9d8",
    defaultValue: 0.3,
  },
  {
    color: "#72cccb",
    dragColor: "#96d9d8",
    defaultValue: 0.5
  }
]

const formatMark = (mark) => `${mark}%`

storiesOf("Slider", module).add("Multi-Slider", () => (
  <>
    <div style={buttonStyles}>
      <h3> Mark in tooltip</h3>
      <i>An invisible knob exists in the position 100, making impossible to choose that value (no overlapping)</i>
      <p />
      <HvSlider formatMark={formatMark} divisionQuantity={100} minPointValue={0} maxPointValue={100} markStep={10} knobProperties={knobProperties} />
    </div>

    <div style={buttonStyles}>
      <h3> Three knobs</h3>
      <p />
      <HvSlider markStep={10} knobProperties={TwoKnobProperties} />
    </div>

    <div style={buttonStyles}>
      <h3> Three knobs with the last one fixed</h3>
      <p />
      <HvSlider markStep={10} knobProperties={threeKnobProperties} />
    </div>

    <div style={buttonStyles}>
      <h3> Two knobs with overlapping</h3>
      <i> Range from 0.10 to 0.70 with 30 points defined. Each point represents 0.02 units.</i>
      <p />
      <HvSlider markStep={10} knobProperties={scaledKnobProperties} minPointValue={0.1} maxPointValue={0.7} divisionQuantity={30} noOverlap={false} markDigits={2} />
    </div>
  </>
));

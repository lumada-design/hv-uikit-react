import React from "react";
import { storiesOf } from "@storybook/react";
import { HvSlider, HvShowCase, HvShowCaseHeader } from "../src";

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

const knobPropertiesDefaults = [10, 20, 30, 40, 100];

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

const threeKnobFixedProperties = [
  {
    color: "yellow",
    dragColor: "black",
    trackColor: "red"
  },
  {
    color: "red",
    dragColor: "red",
    trackColor: "grey"
  },
  {
    color: "purple",
    dragColor: "#orange",
    trackColor: "yellow",
    fixed: true
  }
];

const threeKnobFixedPropertiesDefaults = [10, 50, 80];

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

const formatMark = mark => `${mark}%`;

class ExtendedHvSlider extends React.Component {
  state = {
    knobsValues: []
  };

  constructor(props) {
    super(props);

    this.state.knobsValues = threeKnobPropertiesDefaults;
  }

  render() {
    const { knobsValues } = this.state;

    return (
      <>
        <button
          onClick={() =>
            this.setState({ knobsValues: threeKnobPropertiesDefaults })
          }
        >
          Reset
        </button>
        <HvSlider
          markStep={10}
          knobProperties={threeKnobProperties}
          values={knobsValues}
          defaultValues={threeKnobPropertiesDefaults}
          onChange={({ knobsValues: values }) => {
            this.setState({ knobsValues: values });
          }}
        />
      </>
    );
  }
}

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
        defaultValues={knobPropertiesDefaults}
        knobProperties={knobProperties}
      />
    </HvShowCase>

    <HvShowCase
      title="Three knobs"
      description="Shows the possibility of manipulating N quantity of knobs and a range"
    >
      <HvSlider
        markStep={10}
        knobProperties={threeKnobProperties}
        defaultValues={threeKnobPropertiesDefaults}
      />
    </HvShowCase>

    <HvShowCase
      title="Three knobs different color and different tracks"
      description="Shows the possibility manipulating the color of the knobs"
    >
      <HvSlider
        markStep={10}
        knobProperties={threeKnobFixedProperties}
        defaultValues={threeKnobFixedPropertiesDefaults}
      />
    </HvShowCase>

    <HvShowCase
      title="Two knobs with overlapping and a fractionary scale"
      description=" Range from 0.10 to 0.70 with 30 points defined. Each point represents 0.02 units."
    >
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
    </HvShowCase>

    <HvShowCase
      title="Three knobs"
      description="Shows the possibility of manipulating N quantity of knobs and a range"
    >
      <ExtendedHvSlider />
    </HvShowCase>
  </>
));

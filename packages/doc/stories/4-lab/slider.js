import React from "react";
import { storiesOf } from "@storybook/react";
import HvSlider from "@hv/uikit-react-lab/dist/Slider";

storiesOf("Lab", module).add("Slider", () => <HvSlider />, {
  title: "Slider",
  description:
    "Sliders reflect a range of values along a bar, from which users may select a single value. They are ideal for adjusting settings such as volume, brightness, or applying image filters.",
  usage: "import HvSlider from '@hv/uikit-react-lab/dist/Slider'",
  examples: [
    {
      title: "1. Mark in tooltip",
      description:
        "An invisible knob exist in the position 100, making impossible to choose that value (no overlapping)",
      src: "lab/slider/slider1"
    },
    {
      title: "2. Three knobs",
      description: "Shows the possibility of manipulating N quantity of knobs and a range",
      src: "lab/slider/slider2"
    },
    {
      title: "3. Three knobs with different color and different tracks",
      description: "Shows the possibility manipulating the color of the knobs",
      src: "lab/slider/slider3"
    },
    {
      title: "4. Two knobs with overlapping and a fractional scale",
      description:
        " Range from 0.10 to 0.70 with 30 points defined. Each point represents 0.02 units.",
      src: "lab/slider/slider4"
    },
    {
      title: "5. Three knobs with different range",
      description: "Shows the possibility of manipulating N quantity of knobs and a range",
      src: "lab/slider/slider5"
    }
  ]
});

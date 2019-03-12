import React from "react";
import { storiesOf } from "@storybook/react";
import HvSlider from "@hv-ui/react/core/Slider";

storiesOf("Core", module).add("Slider", () => <HvSlider />, {
  title: "Slider",
  description:
    "Sliders reflect a range of values along a bar, from which users may select a single value. They are ideal for adjusting settings such as volume, brightness, or applying image filters.",
  designSystemLink: "https://10.76.48.133/hv-design-system/hv-design-system-specs/tree/master",
  usage: "import HvSlider from '@hv-ui/react/core/Slider'",
  examples: [
    {
      title: "Mark in tooltip",
      description:
        "An invisible knob exist in the position 100, making impossible to choose that value (no overlapping)",
      src: "core/slider/slider1"
    },
    {
      title: "Three knobs",
      description:
        "Shows the possibility of manipulating N quantity of knobs and a range",
      src: "core/slider/slider2"
    },
    {
      title: "Three knobs different color and different tracks",
      description: "Shows the possibility manipulating the color of the knobs",
      src: "core/slider/slider3"
    },
    {
      title: "Two knobs with overlapping and a fractionary scale",
      description:
        " Range from 0.10 to 0.70 with 30 points defined. Each point represents 0.02 units.",
      src: "core/slider/slider4"
    },
    {
      title: "Three knobs",
      description:
        "Shows the possibility of manipulating N quantity of knobs and a range",
      src: "core/slider/slider5"
    }
  ]
});

/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import { storiesOf } from "@storybook/react";
import HvSlider from "@hv/uikit-react-lab/dist/Slider";

storiesOf("Lab", module).add("Slider", () => <HvSlider />, {
  title: "Slider",
  description:
    "Sliders reflect a range of values along a bar, from which users may select a single value. They are ideal for adjusting settings such as volume, brightness, or applying image filters.",
  designSystemLink:
    "https://10.76.48.133/hv-design-system/hv-design-system-specs/tree/master",
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
      description:
        "Shows the possibility of manipulating N quantity of knobs and a range",
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
      description:
        "Shows the possibility of manipulating N quantity of knobs and a range",
      src: "lab/slider/slider5"
    }
  ]
});

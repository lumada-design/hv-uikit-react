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

import ToggleButton from "@hv/uikit-react-core/dist/ToggleButton";

storiesOf("Components/Selection mechanisms", module).add(
  "Toggle Button",
  () => <ToggleButton />,
  {
    title: "Toggle Button",
    description:
      "A toggle button allows the user to change a setting between two states. <br>It is possible to pass two icons to toggle or use a single animated SVG. " +
      "<br>For this case the SVG must have 3 classes declared:" +
      "<ul>" +
      "<li>default</li>" +
      "<li>selected</li>" +
      "<li>notSelected</li>" +
      "</ul>" +
      " The component toggles between each classe.",
    usage: "import Button from '@hv/uikit-react-core/dist/ToggleButton'",
    examples: [
      {
        title: "1. Normal case",
        src: "components/toggleButton/sample1.js"
      },
      {
        title: "2. Controlled case",
        src: "components/toggleButton/sample2.js"
      },
      {
        title: "3. Animated SVG",
        src: "components/toggleButton/sample3.js"
      }
    ]
  }
);

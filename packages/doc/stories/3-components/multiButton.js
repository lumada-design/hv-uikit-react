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
import MultiButton from "@hv/uikit-react-core/dist/MultiButton";

storiesOf("Components", module).add("MultiButton", () => <MultiButton />, {
  title: "MultiButton",
  description: "MultiButton component with the ability to allow for single selection toggling as well as multi selection",
  usage: "import MultiButton from '@hv/uikit-react-core/dist/MultiButton'",
  examples: [
    // Single Selection Samples

    {
      title: "Label only - Horizontal Layout",
      description: "Single Selection",
      src: "components/multiButton/labelOnlyHorizontalSingleSelection.js"
    },
    {
      title: "Label only - Vertical Layout",
      description: "Single Selection",
      src: "components/multiButton/labelOnlyVerticalSingleSelection.js"
    },
    {
      title: "Icon only - Horizontal Layout",
      description: "Single Selection",
      src: "components/multiButton/iconOnlyHorizontalSingleSelection.js"
    },
    {
      title: "Icon only - Vertical Layout",
      description: "Single Selection",
      src: "components/multiButton/iconOnlyVerticalSingleSelection.js"
    },
    {
      title: "Label with Icon Horizontal",
      description: "Single Selection",
      src: "components/multiButton/labelWithIconHorizontalSingleSelection.js"
    },
    {
      title: "Label with Icon Vertical",
      description: "Single Selection",
      src: "components/multiButton/labelWithIconVerticalSingleSelection.js"
    },
    // Multiple Selection Samples
    {
      title: "Label only - Horizontal Layout",
      description: "Multiple Selection",
      src: "components/multiButton/labelOnlyHorizontalMultipleSelection.js"
    },
    {
      title: "Label only - Vertical Layout",
      description: "Multiple Selection",
      src: "components/multiButton/labelOnlyVerticalMultipleSelection.js"
    },
    {
      title: "Icon only - Horizontal Layout",
      description: "Multiple Selection",
      src: "components/multiButton/iconOnlyHorizontalMultipleSelection.js"
    },
    {
      title: "Icon only - Vertical Layout",
      description: "Multiple Selection",
      src: "components/multiButton/iconOnlyVerticalMultipleSelection.js"
    },
    {
      title: "Label with Icon Horizontal",
      description: "Multiple Selection",
      src: "components/multiButton/labelWithIconHorizontalMultipleSelection.js"
    },
    {
      title: "Label with Icon Vertical",
      description: "Multiple Selection",
      src: "components/multiButton/labelWithIconVerticalMultipleSelection.js"
    },
    {
      title: "Preset selection",
      description: "Multibutton element set as enforced cannot be toggled - In this case map cannot be toggled on/off",
      src: "components/multiButton/fixedToggleHorizontalMultipleSelection.js"
    },
    {
      title: "Minimum Selection",
      description: "Specify a number of minimum elements that must be active - in this case minimum of 2",
      src: "components/multiButton/minimumSelectionHorizontalMultipleSelection.js"
    }
  ]
});

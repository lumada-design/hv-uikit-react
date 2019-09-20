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
  title: "Multibutton",
  description: "",
  usage: "import Multibutton from '@hv/uikit-react-core/dist/Multibutton'",
  examples: [
    // Single Selection Samples
    {
      title: "Label only - Horizontal Layout",
      description: "Single Selection",
      src: "components/multibutton/labelOnlyHorizontalSingleSelection.js"
    },
    {
      title: "Label only - Vertical Layout",
      description: "Single Selection",
      src: "components/multibutton/labelOnlyVerticalSingleSelection.js"
    },
    {
      title: "Icon only - Horizontal Layout",
      description: "Single Selection",
      src: "components/multibutton/iconOnlyHorizontalSingleSelection.js"
    },
    {
      title: "Icon only - Vertical Layout",
      description: "Single Selection",
      src: "components/multibutton/iconOnlyVerticalSingleSelection.js"
    },
    {
      title: "Label with Icon Horizontal",
      description: "Single Selection",
      src: "components/multibutton/labelWithIconHorizontalSingleSelection.js"
    },
    {
      title: "Label with Icon Vertical",
      description: "Single Selection",
      src: "components/multibutton/labelWithIconVerticalSingleSelection.js"
    },
    // Multiple Selection Samples
    {
      title: "Label only - Horizontal Layout",
      description: "Multiple Selection",
      src: "components/multibutton/labelOnlyHorizontalMultipleSelection.js"
    },
    {
      title: "Label only - Vertical Layout",
      description: "Multiple Selection",
      src: "components/multibutton/labelOnlyVerticalMultipleSelection.js"
    },
    {
      title: "Icon only - Horizontal Layout",
      description: "Multiple Selection",
      src: "components/multibutton/iconOnlyHorizontalMultipleSelection.js"
    },
    {
      title: "Icon only - Vertical Layout",
      description: "Multiple Selection",
      src: "components/multibutton/iconOnlyVerticalMultipleSelection.js"
    },
    {
      title: "Label with Icon Horizontal",
      description: "Multiple Selection",
      src: "components/multibutton/labelWithIconHorizontalMultipleSelection.js"
    },
    {
      title: "Label with Icon Vertical",
      description: "Multiple Selection",
      src: "components/multibutton/labelWithIconVerticalMultipleSelection.js"
    },
    {
      title: "Preset selection",
      description: "Multibutton element set as enforced cannot be toggled - In this case map cannot be toggled on/off",
      src: "components/multibutton/fixedToggleHorizontalMultipleSelection.js"
    },
    {
      title: "Minimum Selection",
      description: "Specify a number of minimum elements that must be active - in this case minimum of 2",
      src: "components/multibutton/minimumSelectionHorizontalMultipleSelection.js"
    }
  ]
});

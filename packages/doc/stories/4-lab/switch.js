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

import Switch from "@hv/uikit-react-lab/dist/Switch";

storiesOf("Lab/Selection mechanisms", module).add("Toogle Switch", () => <Switch />, {
  title: "Toogle Switch",
  description: "",
  usage: "import Switch from '@hv/uikit-react-lab/dist/Switch'",
  examples: [
    {
      title: "Example 1",
      description: "with Labels",
      src: "lab/switch/sample1.js"
    },
    {
      title: "Example 2",
      description: "without Labels",
      src: "lab/switch/sample2.js"
    },
    {
      title: "Example 3",
      description: "with Custom Labels",
      src: "lab/switch/sample3.js"
    },
    {
      title: "Example 4",
      description: "Disabled in Left Position",
      src: "lab/switch/sample4.js"
    },
    {
      title: "Example 5",
      description: "with Auxiliary Checkmark",
      src: "lab/switch/sample5.js"
    }
  ]
});

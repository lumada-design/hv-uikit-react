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

import Switch from "@hv/uikit-react-core/dist/Switch";

storiesOf("Components/Selection mechanisms", module).add(
  "Toggle Switch",
  () => <Switch />,
  {
    title: "Toggle Switch",
    description:
      "A toggle Switch allows the user to change a setting between two states. ",
    usage: "import Switch from '@hv/uikit-react-core/dist/Switch'",
    examples: [
      {
        title: "1. with Labels and onChange",
        src: "components/switch/sample1.js"
      },
      {
        title: "2. without Labels",
        src: "components/switch/sample2.js"
      },
      {
        title: "3. with Custom Labels",
        src: "components/switch/sample3.js"
      },
      {
        title: "4. Disabled in Left Position",
        src: "components/switch/sample4.js"
      }
    ]
  }
);

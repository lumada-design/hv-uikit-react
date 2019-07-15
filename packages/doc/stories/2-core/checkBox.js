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
import HvCheckBox from "@hv/uikit-react-core/dist/Selectors/CheckBox";

storiesOf("Core", module).add("CheckBox", () => <HvCheckBox />, {
  title: "Checkbox selector",
  description:
    "A checkbox selector used to present the user with a range of options, from which the user may select any number of options to complete their task.",
  usage: "import { HvCheckbox } from '@hv/uikit-react-core/dist/Selectors'",
  examples: [
    {
      title: "1. Enabled",
      src: "core/checkbox/checkboxSimple"
    },
    {
      title: "2. Disabled ",
      src: "core/checkbox/checkboxDisabled"
    },
    {
      title: "3. With label",
      src: "core/checkbox/checkboxLabel"
    },
    {
      title: "4. Disabled with label",
      src: "core/checkbox/checkboxLabelDisabled"
    },
    {
      title: "5. With click action",
      description: "Returns the value assigned on click",
      src: "core/checkbox/checkboxOnChange"
    },
    {
      title: "6. Disabled with no click action",
      description: "When disabled prevents click actions to be triggered",
      src: "core/checkbox/checkboxOnChangeDisabled"
    },
    {
      title: "7. With state management",
      description:
        "Demonstration of how to create a group of checkbox with state management",
      src: "core/checkbox/checkboxState"
    }
  ]
});

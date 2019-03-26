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
import HvCheckBox from "@hv-ui/react/core/Selectors/CheckBox";

storiesOf("Core", module).add("CheckBox", () => <HvCheckBox />, {
  title: "Checkbox selector",
  description:
    "A checkbox selector that allows selecting a value, it posses 3 states: empty, full or intermediate",
  designSystemLink: "https://10.76.48.133/hv-design-system/hv-design-system-specs/tree/master",
  usage: "import { HvCheckbox } from '@hv-ui/react/core/Selectors'",
  examples: [
    {
      title: "Simple checkbox",
      description: "Simple checkbox with no state management",
      src: "core/checkbox/checkboxSimple"
    },
    {
      title: "Disabled simple checkbox",
      description:
        "Simple checkbox with no state management but disable not allowing interactions",
      src: "core/checkbox/checkboxDisabled"
    },
    {
      title: "Checkbox with label",
      description: "Checkbox that has a label with no state management",
      src: "core/checkbox/checkboxLabel"
    },
    {
      title: "Disabled checkbox with label",
      description:
        "Checkbox that has a label with no state management but disable not allowing interactions",
      src: "core/checkbox/checkboxLabelDisabled"
    },
    {
      title: "Checkbox with click action",
      description:
        "Checkbox with click action and no state management, the onChange returns the value assigned",
      src: "core/checkbox/checkboxOnChange"
    },
    {
      title: "Disabled checkbox with click action",
      description:
        "Checkbox with click action and no state management but disable not allowing interactions",
      src: "core/checkbox/checkboxOnChangeDisabled"
    },
    {
      title: "Checkbox with state management",
      description:
        "Demostration of how to create a group of checkbox with state management",
      src: "core/checkbox/checkboxState"
    }
  ]
});

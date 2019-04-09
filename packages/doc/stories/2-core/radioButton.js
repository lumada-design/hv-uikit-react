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
import HvRadio from "@hv/uikit-react-core/dist/Selectors/RadioButton";

storiesOf("Core", module).add("RadioButton", () => <HvRadio />, {
  title: "Radio button selector",
  description:
    "A Radio button selector that allows selecting a value, with 3 possible states: empty, full or intermediate",
  usage: "import HvRadio from '@hv/uikit-react-core/dist/Selectors/RadioButton'",
  examples: [
    {
      title: "1. Simple",
      description: "Simple Radio button with no state management",
      src: "core/radioButton/radioButtonSimple"
    },
    {
      title: "2. Disabled ",
      description:
        "Simple Radio button with no state management but disable not allowing interactions",
      src: "core/radioButton/radioButtonDisabled"
    },
    {
      title: "2. With label",
      description: "Radio button that has a label with no state management",
      src: "core/radioButton/radioButtonLabel"
    },
    {
      title: "3. Disabled with label",
      description:
        "Radio button that has a label with no state management but disable not allowing interactions",
      src: "core/radioButton/radioButtonLabelDisabled"
    },
    {
      title: "4. With click action",
      description:
        "Radio button with click action and no state management the onChange returns the value assigned",
      src: "core/radioButton/radioButtonOnChange"
    },
    {
      title: "5. Disabled with click action",
      description:
        "Radio button with click action and no state management but disable not allowing interactions",
      src: "core/radioButton/radioButtonOnChangeDisabled"
    },
    {
      title: "6. With state management",
      description:
        "Demonstration of how to create a group of Radio button with state management",
      src: "core/radioButton/radioButtonState"
    }
  ]
});

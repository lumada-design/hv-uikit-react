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

storiesOf("Components/Selection mechanisms", module).add("Radio Button", () => <HvRadio />, {
  title: "Radio button selector",
  description:
    "A Radio button selector used to limit the user’s choice to just one option from the range provided.",
  usage:
    "import HvRadio from '@hv/uikit-react-core/dist/Selectors/RadioButton'",
  examples: [
    {
      title: "1. Enabled",
      src: "components/radioButton/radioButtonSimple"
    },
    {
      title: "2. Disabled ",
      src: "components/radioButton/radioButtonDisabled"
    },
    {
      title: "3. With label",
      src: "components/radioButton/radioButtonLabel"
    },
    {
      title: "4. Disabled with label",
      src: "components/radioButton/radioButtonLabelDisabled"
    },
    {
      title: "5. With click action",
      description: "Returns the value assigned on click",
      src: "components/radioButton/radioButtonOnChange"
    },
    {
      title: "6. Disabled with no click action",
      description: "When disabled prevents click actions to be triggered",
      src: "components/radioButton/radioButtonOnChangeDisabled"
    },
    {
      title: "7. With state management",
      description:
        "Demonstration of how to create a group of Radio button with state management",
      src: "components/radioButton/radioButtonState"
    }
  ]
});

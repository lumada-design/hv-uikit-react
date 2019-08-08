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
import HvDropdown from "@hv/uikit-react-core/dist/Dropdown";

storiesOf("Components", module).add("Dropdown", () => <HvDropdown />, {
  title: "Dropdown List",
  description:
    "A drop-down list (abbreviated drop-down; also known as a drop-down menu, drop menu, pull-down list, picklist) is a graphical control element, similar to a list box, that allows the user to choose one value from a list. ",
  usage: "import HvDropdown from '@hv/uikit-react-core/dist/Dropdown'",
  examples: [
    {
      title: "1. No data and no label",
      src: "components/dropdown/dropdown1"
    },
    {
      title: "2. Complete multi-selection dropdown",
      description: "Drop down with more than 10 elements",
      src: "components/dropdown/dropdown2"
    },
    {
      title: "3. Complete simple selection dropdown",
      description: "Drop down with more than 10 elements",
      src: "components/dropdown/dropdown3"
    },
    {
      title: "4. Incomplete multi-selection dropdown",
      description: "Drop down with less than 10 elements",
      src: "components/dropdown/dropdown4"
    },
    {
      title: "5. Multi-selection dropdown without search",
      description: "Supports equal labels and uses ids to manage selection",
      src: "components/dropdown/dropdown5"
    },
    {
      title: "6. Single selection dropdown with search",
      description: "Drop down with less than 10 elements",
      src: "components/dropdown/dropdown6"
    },
    {
      title: "7. Single selection dropdown",
      description: "Support ids to manage selection",
      src: "components/dropdown/dropdown7"
    },
    {
      title: "8. Single selection dropdown",
      description: "With no default selected",
      src: "components/dropdown/dropdown8"
    },
    {
      title: "9. Disabled multi-select dropdown",
      src: "components/dropdown/dropdown9"
    },
    {
      title: "10. Disabled dropdown",
      src: "components/dropdown/dropdown10"
    }
  ]
});

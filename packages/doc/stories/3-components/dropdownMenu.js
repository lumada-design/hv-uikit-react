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
import DropDownMenu from "@hv/uikit-react-core/dist/DropDownMenu";

storiesOf("Components", module).add("DropDownMenu", () => <DropDownMenu />, {
  title: "Dropdown Menu",
  description:
    "A drop-down menu, drop menu, pull-down list, picklist) is a graphical control element, similar to a list box, that allows the user to choose one value from a list. ",
  usage: "import DropDownMenu from '@hv/uikit-react-core/dist/DropDownMenu'",
  examples: [
    {
      title: "1. Left positioning",
      src: "components/dropdownMenu/dropdownMenu1"
    },
    {
      title: "2. Right positioning",
      src: "components/dropdownMenu/dropdownMenu2"
    },
    {
      title: "3. Right Positioning with Icons and Actions",
      src: "components/dropdownMenu/dropdownMenu3"
    }
  ]
});

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
import HvVerticalNavigation from "@hv/uikit-react-core/dist/VerticalNavigation";

storiesOf("Components/Navigation System", module).add(
  "Vertical Navigation",
  () => <HvVerticalNavigation />,
  {
    title: "Vertical Navigation",
    description:
      "Vertical navigation is a menu that displays the options to navigate through the app’s content. \n" +
      "In a vertical menu the items are links displayed as a table of contents for easy scanning with the \n" +
      "ability to scroll down the list.",
    usage:
      "import HvVerticalNavigation from '@hv/uikit-react-core/dist/VerticalNavigation'",
    examples: [
      {
        title: "1. Simple",
        src: "components/verticalNavigation/verticalNavigation1.js"
      },
      {
        title: "2. with sub-levels",
        src: "components/verticalNavigation/verticalNavigation2.js"
      },
      {
        title: "3. with search",
        src: "components/verticalNavigation/verticalNavigation3.js"
      },
      {
        title: "4. with actions",
        description: "Shown only in the first level.",
        src: "components/verticalNavigation/verticalNavigation4.js"
      },
      {
        title: "5. with scrolls",
        src: "components/verticalNavigation/verticalNavigation5.js"
      }
    ]
  }
);

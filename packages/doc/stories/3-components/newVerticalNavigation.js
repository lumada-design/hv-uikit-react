/*
 * Copyright 2020 Hitachi Vantara Corporation
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
import VerticalNavigation from "@hv/uikit-react-core/dist/NewVerticalNavigation";

storiesOf("Components/Navigation System/Vertical Navigation", module).add(
  "VerticalNavigation",
  () => <VerticalNavigation />,
  {
    title: "VerticalNavigation",
    description:
      "It is recommended to use vertical navigation when your application requires global navigation that is displayed on the left. While vertical navigation menus generally consume more space than their horizontal counterparts, they have become more popular as desktop monitors move to wide-screen formats.<br>" +
      "<br>Our implementation of the vertical navigation is divided in:" +
      "<ul>" +
      "<li>Navigation</li>" +
      "<li>Actions</li>" +
      "<li>Action</li>" +
      "</ul>" +
      "<br>To build the vertical navigation a composition of these elements should be used.",
    usage:
      "import HvVerticalNavigation from '@hv/uikit-react-core/dist/NewVerticalNavigation'",
    examples: [
      {
        title: "1. Vertical navigation system",
        src: "components/newVerticalNavigation/verticalNavigation1.js"
      },
      {
        title: "2. Vertical navigation system without actions",
        src: "components/newVerticalNavigation/verticalNavigation2.js"
      },
      {
        title: "3. Collapsable vertical navigation system",
        src: "components/newVerticalNavigation/verticalNavigation3.js"
      }
    ]
  }
);

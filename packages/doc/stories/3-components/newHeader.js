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
import HvHeader from "@hv/uikit-react-core/dist/NewHeader";

storiesOf("Components/Navigation System/Horizontal Navigation", module).add(
  "Header",
  () => <HvHeader />,
  {
    title: "Header",
    description:
      "The header should be informative and provide the most important information about the digital product so that users could scan it in split seconds. " +
      "Our implementation of the header is divided in: <br>" +
      "<ul>" +
      "<li>Brand</li>" +
      "<li>Navigation</li>" +
      "<li>Actions</li>" +
      "</ul><br>" +
      "To build the header a composition of these elements should be used.",
    usage: "import HvHeader from '@hv/uikit-react-core/dist/NewHeader'",
    examples: [
      {
        title: "Variant 1",
        src: "components/newHeader/header1",
        description: "Inside and below the Header usage and responsive behavior"
      }
    ]
  }
);

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
import HvPagination from "@hv/uikit-react-core/dist/Pagination";

storiesOf("Components", module).add("Pagination", () => <HvPagination />, {
  title: "Pagination",
  description:
    "A pagination component is used to help navigate large datasets, dividing them into groups of variable size.",
  usage: "import HvPagination from '@hv/uikit-react-core/dist/Pagination'",
  examples: [
    {
      title: "Example 1",
      description: "Default empty Pagination",
      src: "components/pagination/pagination1"
    },
    {
      title: "Example 2",
      description: "Controlled pagination with list of elements",
      src: "components/pagination/pagination2"
    },
    {
      title: "Example 3",
      description: "CardView controlled by Pagination",
      src: "components/pagination/pagination3"
    }
  ]
});

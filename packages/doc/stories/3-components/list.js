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
import List from "@hv/uikit-react-core/dist/List";

storiesOf("Components", module).add("List", () => <List />, {
  title: "List",
  description: "",
  usage: "import List from '@hv/uikit-react-core/dist/List'",
  examples: [
    {
      title: "1. Simple list not selectable",
      src: "components/list/simpleListNotSelectable.js"
    },
    {
      title: "2. Simple list condensed",
      src: "components/list/simpleListCondensed.js"
    },
    {
      title: "3. Simple list with nav icons",
      src: "components/list/simpleListWithNavIcons.js"
    },
    {
      title: "4. Single selection",
      src: "components/list/singleSelection.js"
    },
    {
      title: "5. Single selection with left icons and disabled item",
      src: "components/list/singleSelectionWithLeftIcons.js"
    },
    {
      title: "6 Multi selection",
      src: "components/list/multiSelection.js"
    },
    {
      title: "7. Single selection with selectors",
      src: "components/list/singleSelectionWithSelectors.js"
    },
    {
      title: "8. Multi selection with selectors",
      src: "components/list/multiSelectionWithSelectors.js"
    },
    {
      title: "9. Multi selection with selectors and select all",
      src: "components/list/multiSelectionWithSelectorsAndSelectAll.js"
    },
    {
      title: "10. Multi selection with selectors and disabled items",
      src: "components/list/multiSelectionWithSelectorsDisabledAndSelectAll.js"
    }
  ]
});

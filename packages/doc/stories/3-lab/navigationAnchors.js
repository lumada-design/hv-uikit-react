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
import HvNavigationAnchors from "@hv-ui/react/core/NavigationAnchors";

storiesOf("Lab", module).add("Navigation Anchors", () => <HvNavigationAnchors />, {
  title: "Navigation anchors",
  description:
    "A navigation component to help in changing views, still in development",
  usage: "import HvNavigationAnchors from '@hv-ui/react/core/NavigationAnchors'",
  examples: [
    {
      title: "Simple navigation anchors",
      description: "basic navigation anchors to provide a clickable area to change views",
      src: "lab/navigationAnchors/navigationAnchorsSimple.js"
    }
  ]
});

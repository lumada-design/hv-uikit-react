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
import HvSnackbar from "@hv/uikit-react-core/Snackbar";

storiesOf("Core", module).add("Snackbar", () => <HvSnackbar />, {
  title: "Snackbar",
  description:
    "Snackbars provide brief messages about app processes through a message",
  designSystemLink:
    "https://10.76.48.133/hv-design-system/hv-design-system-specs/tree/master",
  usage: "import HvSnackbar from '@hv/uikit-react-core/Snackbar'",
  examples: [
    {
      title: "1. Different variants",
      src: "core/snackbar/snackbar1"
    },
    {
      title: "2. With custom icon",
      src: "core/snackbar/snackbar2"
    },
    {
      title: "3. Without icon",
      src: "core/snackbar/snackbar3"
    },
    {
      title: "4. With actions",
      src: "core/snackbar/snackbar4"
    },
    {
      title: "5. Examples of snackbars",
      src: "core/snackbar/snackbar5"
    }
  ]
});

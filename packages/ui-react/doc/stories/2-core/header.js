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
import HvHeader from "@hv-ui/react/core/Header";

storiesOf("Core", module).add("Header", () => <HvHeader />, {
  title: "Header",
  description:
    "A banner displays an important, succinct message, and provides actions for users to address (or dismiss the banner). It requires a user action to be dismissed. Banners should be displayed at the top of the screen, below a top app bar.",
  designSystemLink: "https://10.76.48.133/hv-design-system/hv-design-system-specs/tree/master",
  usage: "import HvHeader from '@hv-ui/react/core/Header'",
  examples: [
    {
      title: "Variant 1",
      src: "core/header/header1"
    },
    {
      title: "Variant 2",
      src: "core/header/header2"
    },
    {
      title: "Variant 3",
      src: "core/header/header3"
    },
    {
      title: "Variant 4",
      src: "core/header/header4"
    },
    {
      title: "Variant 5",
      src: "core/header/header5"
    }
  ]
});

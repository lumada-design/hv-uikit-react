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
import HvHeader from "@hv/uikit-react-lab/dist/Header";

storiesOf("Lab", module).add("Header", () => <HvHeader />, {
  deprecated: true,
  title: "Header",
  componentToUse: "Header",
  description:
    "A banner displays an important, succinct message, and provides actions for users to address (or dismiss the banner). It requires a user action to be close. Banners should be display at the top of the screen, below a top app bar.",
  usage: "import HvHeader from '@hv/uikit-react-lab/dist/Header'",
  examples: [
    {
      title: "Variant 1",
      src: "lab/header/header1"
    }
  ]
});

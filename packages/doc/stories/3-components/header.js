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
import HvHeader from "@hv/uikit-react-core/dist/Header";

storiesOf("Components", module).add("Header", () => <HvHeader />, {
  title: "Header",
  description:
    "A banner displays an important, succinct message, and provides actions for users to address (or dismiss the banner). It requires a user action to be close. Banners should be display at the top of the screen, below a top app bar.",
  usage: "import HvHeader from '@hv/uikit-react-core/dist/Header'",
  examples: [
    {
      title: "Variant 1",
      src: "components/header/header1",
      description: "Inside and below the Header usage and responsive behavior"
    },
    {
      title: "Variant 2",
      src: "components/header/header2",
      description: "Inside the Header usage and responsive behavior"
    },
    {
      title: "Variant 3",
      src: "components/header/header3",
      description: "Inside the Header usage and responsive behavior"
    },
    {
      title: "Variant 4",
      src: "components/header/header4",
      description: "Header with no menu tabs"
    },
    {
      title: "Variant 5",
      src: "components/header/header5"
    },
    {
      title: "Variant 6",
      src: "components/header/header6"
    },
    {
      title: "Deprecated Example",
      src: "components/header/headerDeprecated",
      description: "Header with no menu tabs"
    }
  ]
});

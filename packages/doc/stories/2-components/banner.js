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
import HvBanner from "@hv/uikit-react-core/dist/Banner";

storiesOf("Components/Notifications", module).add("Banner", () => <HvBanner />, {
  title: "Banner",
  description:
    "A banner displays an important, succinct message. The banner provides actions for users to address (or dismiss the banner). It requires an user action to close. Banners should appear at the top of the screen, below a top app bar. ",
  usage: "import HvBanner from '@hv/uikit-react-core/dist/Banner'",
  examples: [
    {
      title: "1. Different variants",
      src: "components/banner/banner1"
    },
    {
      title: "2. Custom icon",
      src: "components/banner/banner2"
    },
    {
      title: "3. Without icon",
      src: "components/banner/banner3"
    },
    {
      title: "4. With actions",

      src: "components/banner/banner4"
    },
    {
      title: "5. With message action",
      src: "components/banner/banner5"
    },
    {
      title: "6. More examples",
      src: "components/banner/banner6"
    }
  ]
});

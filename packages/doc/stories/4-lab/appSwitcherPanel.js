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
import HvAppSwitcherPanel from "@hv/uikit-react-lab/dist/AppSwitcherPanel";

storiesOf("Lab", module).add("App Switcher Panel", () => <HvAppSwitcherPanel />, {
  title: "App Switcher Panel",
  componentToUse: "App Switcher Panel",
  description:
    "The app switcher allows the navigation between different applications.",
  usage:
    "import HvAppSwitcher from '@hv/uikit-react-lab/dist/HvAppSwitcherPanel'",
  examples: [
    {
      title: "1. Simple example",
      src: "lab/appSwitcherPanel/appSwitcherPanel1"
    },
    {
      title: "2. Simple example with footer",
      src: "lab/appSwitcherPanel/appSwitcherPanel2"
    },
    {
      title: "3. Simple example with a big list of applications",
      src: "lab/appSwitcherPanel/appSwitcherPanel3"
    },
    {
      title: "4. Example with a custom header",
      src: "lab/appSwitcherPanel/appSwitcherPanel4"
    },
    {
      title: "5. Example with the panel appearing on the right side",
      src: "lab/appSwitcherPanel/appSwitcherPanel5"
    },
    {
      title: "6. Using icon components mixed with url icons",
      src: "lab/appSwitcherPanel/appSwitcherPanel6"
    },
    {
      title: "7. Alerts on which menu was clicked",
      src: "lab/appSwitcherPanel/appSwitcherPanel7"
    }
  ]
});

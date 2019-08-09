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
import HvButton from "@hv/uikit-react-core/dist/Button";

storiesOf("Components", module).add("Button", () => <HvButton />, {
  title: "Button",
  description:
    "A button refers to a graphical control element that provides the user a simple way to trigger an event",
  usage: "import HvButton from '@hv/uikit-react-core/dist/Button'",
  examples: [
    {
      title: "1. Primary",
      description: "Primary button with click action",
      src: "components/button/buttonPrimaryPrimary"
    },
    {
      title: "2. Primary disabled",
      description: "Disabled button that doesn't allow any interation",
      src: "components/button/buttonPrimaryPrimaryDisabled"
    },
    {
      title: "3. Secondary",
      description: "Secondary button with click action",
      src: "components/button/buttonPrimarySecondary"
    },
    {
      title: "4. Secondary disabled",
      description: "Disabled button that doesn't allow any interation",
      src: "components/button/buttonPrimarySecondaryDisabled"
    },
    {
      title: "5. Ghost",
      description: "Ghost button with click action",
      src: "components/button/buttonPrimaryGhost"
    },
    {
      title: "6. Ghost disabled",
      description: "Disabled button that doesn't allow any interation",
      src: "components/button/buttonPrimaryGhostDisabled"
    },
    {
      title: "7. Ghost secondary",
      description: "Ghost button with click action",
      src: "components/button/buttonPrimaryGhostSecondary"
    },
    {
      title: "8. Ghost secondary disabled",
      description: "Disabled button that doesn't allow any interation",
      src: "components/button/buttonPrimaryGhostSecondaryDisabled"
    }
  ]
});

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
import HvButton from "@hv-ui/react/core/Button";

storiesOf("Core", module).add("Button", () => <HvButton />, {
  title: "Button",
  description: "Button with click actions",
  designSystemLink: "https://10.76.48.133/hv-design-system/hv-design-system-specs/tree/master",
  usage: "import HvButton from '@hv-ui/react/core/Button'",
  examples: [
    {
      title: "Primary button",
      description: "Primary button with click action",
      src: "core/button/buttonSimple"
    },
    {
        title: "Disabled button",
        description: "Disabled button that doesn't allow any interation",
        src: "core/button/buttonDisabled"
    },
    {
        title: "Secondary button",
        description: "Secondary button with click action",
        src: "core/button/buttonSecondary"
    },
    {
        title: "Link button",
        description: "Link button with click action",
        src: "core/button/buttonLink"
    }
  ]
});

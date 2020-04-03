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
import HvBadge from "@hv/uikit-react-core/dist/Badge";

storiesOf("Components", module).add("Badge", () => <HvBadge />, {
  title: "Badge",
  description: "A badge component to inform the user of unread notifications",
  usage: "import HvBadge from '@hv/uikit-react-core/dist/Badge'",
  examples: [
    {
      title: "1. Simple",
      description: "Basic badges show when there are unread notifications.",
      src: "components/badge/badgeSimple.js"
    },
    {
      title: "2. With Icon",
      description:
        "Badges show when there are unread notifications with an icon.",
      src: "components/badge/badgeWithIcon.js"
    },
    {
      title: "3. With Text",
      description: "Badges show when there are unread notifications with text.",
      src: "components/badge/badgeWithText.js"
    },
    {
      title: "4. With Button controller",
      description: "Badges update and grow according to their content.",
      src: "components/badge/badgeControlled.js"
    },
    {
      title: "5. With tabs",
      description: "Badges applied to Tabs component.",
      src: "components/badge/badgeWithTabs.js"
    }
  ]
});

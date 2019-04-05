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
import HvCard from "@hv/uikit-react-core/Card";

storiesOf("Core/card", module).add("Card", () => <HvCard />, {
  title: "Card",
  description:
    "Cards are surfaces that display content and actions on a single topic. They should be easy to scan for relevant and actionable information. Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy. The Card can be an component by itself or a composition of elements (header, content, media and footer) passed as children.",
  designSystemLink:
    "https://10.76.48.133/hv-design-system/hv-design-system-specs/tree/master",
  usage: "import {HvCard} from '@hv/uikit-react-core/Card'",
  examples: [
    {
      title: "1. Single action",
      description: "Card built using properties",
      src: "core/card/card1"
    },
    {
      title: "2. All elements",
      src: "core/card/card2"
    },
    {
      title: "3. Multiple actions",
      src: "core/card/card3"
    },
    {
      title: "4. No actions",
      src: "core/card/card4"
    },
    {
      title: "5. Only title",
      src: "core/card/card5"
    },
    {
      title: "6. Kpi",
      src: "core/card/card6"
    },
    {
      title: "7. Composition with component media and footer",
      description: "Card built using the composition of different elements",
      src: "core/card/card7"
    },
    {
      title: "8. Composition with component footer and header",
      src: "core/card/card8"
    }
  ]
});

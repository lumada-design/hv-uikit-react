/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import React from "react";
import { storiesOf } from "@storybook/react";
import HvCard from "@hv-ui/react/core/Card";

storiesOf("Core/card", module).add("Card", () => <HvCard />, {
  title: "Card",
  description:
    "Cards are surfaces that display content and actions on a single topic. They should be easy to scan for relevant and actionable information. Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy. The Card can be an component by itself or a composition of elements (header, content, media and footer) passed as children.",
  designSystemLink: "https://10.76.48.133/hv-design-system/hv-design-system-specs/tree/master",
  usage: "import {HvCard} from '@hv-ui/react/core/Card'",
  examples: [
    {
      title: "1. card single action",
      src: "core/card/card1"
    },
    {
      title: "2. card with all elements",
      src: "core/card/card2"
    },
    {
      title: "3. with multiple actions",
      src: "core/card/card3"
    },
    {
      title: "4. with no actions",
      src: "core/card/card4"
    },
    {
      title: "5. with only title",
      src: "core/card/card5"
    },
    {
      title: "6. with kpi",
      src: "core/card/card6"
    },
    {
      title: "7. card composition with component media and footer",
      src: "core/card/card7"
    },
    {
      title: "8.  card composition with component header, footer and content",
      src: "core/card/card8"
    }
  ]
});

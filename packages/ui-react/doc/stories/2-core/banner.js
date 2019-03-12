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
import HvBanner from "@hv-ui/react/core/Banner";

storiesOf("Core", module).add("Banner", () => <HvBanner />, {
  title: "Banner",
  description:
    "A banner displays an important, succinct message, and provides actions for users to address (or dismiss the banner). It requires a user action to be dismissed. Banners should be displayed at the top of the screen, below a top app bar.",
  designSystemLink: "https://10.76.48.133/hv-design-system/hv-design-system-specs/tree/master",
  usage: "import HvBanner from '@hv-ui/react/core/Banner'",
  examples: [
    {
      title: "1. with different variants",
      src: "core/banner/banner1"
    },
    {
      title: "2. with custom icon",
      src: "core/banner/banner2"
    },
    {
      title: "3. without icon",
      src: "core/banner/banner3"
    },
    {
      title: "4. with actions",
       src: "core/banner/banner4"
    },
    {
      title: "5. with message action",
      src: "core/banner/banner5"
    },
    {
      title: "6. More examples",
      src: "core/banner/banner6"
    }
  ]
});

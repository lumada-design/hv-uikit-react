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
import HvHeader from "@hv-ui/react/core/Header";

storiesOf("Core", module).add("Header", () => <HvHeader />, {
  title: "Header",
  description:
    "A banner displays an important, succinct message, and provides actions for users to address (or dismiss the banner). It requires a user action to be dismissed. Banners should be displayed at the top of the screen, below a top app bar.",
  designSystemLink: "https://10.76.48.133/hv-design-system/hv-design-system-specs/tree/master",
  usage: "import HvHeader from '@hv-ui/react/core/Header'",
  examples: [
    {
      title: "Variant 1",
      src: "core/header/header1"
    },
    {
      title: "Variant 2",
      src: "core/header/header2"
    },
    {
      title: "Variant 3",
      src: "core/header/header3"
    },
    {
      title: "Variant 4",
      src: "core/header/header4"
    },
    {
      title: "Variant 5",
      src: "core/header/header5"
    }
  ]
});

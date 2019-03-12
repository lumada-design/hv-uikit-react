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
import HvSnackbar from "@hv-ui/react/core/Snackbar";

storiesOf("Core", module).add("Snackbar", () => <HvSnackbar />, {
  title: "Snackbar",
  description:
    "Snackbars provide brief messages about app processes through a message - typically at the bottom of the screen",
  designSystemLink: "https://10.76.48.133/hv-design-system/hv-design-system-specs/tree/master",
  usage: "import HvSnackbar from '@hv-ui/react/core/Snackbar'",
  examples: [
    {
      title: "1. Snackbars with different variants",
      src: "core/snackbar/snackbar1"
    },
    {
      title: "2. Snackbar with custom icon",
      src: "core/snackbar/snackbar2"
    },
    {
      title: "3. Snackbar without icon",
      src: "core/snackbar/snackbar3"
    },
    {
      title: "4. Snackbar with actions",
      src: "core/snackbar/snackbar4"
    },
    {
      title: "5. Examples of snackbars",
      src: "core/snackbar/snackbar5"
    }
  ]
});

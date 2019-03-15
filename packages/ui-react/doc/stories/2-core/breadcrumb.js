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
import HvBreadcrumb from "@hv-ui/react/core/BreadCrumb";

storiesOf("Core", module).add("BreadCrumb", () => <HvBreadcrumb />, {
  title: "BreadCrumb",
  description:
    "A breadcrumb is a graphical control element frequently used as a navigational aid in user interfaces and on web pages. It allows users to keep track and maintain awareness of their locations within programs, documents, or websites. " +
    "The component allows to receive an url that is decompose in the breadcrumb or a list of object (label and path)",
  usage: "import HvBreadCrumb from '@hv-ui/react/core/BreadCrumb'",
  examples: [
    {
      title: "1. with all paths visible",
      src: "core/breadcrumb/breadcrumb1"
    },
    {
      title: "2. with 5 paths visible of 7",
      src: "core/breadcrumb/breadcrumb2"
    },
    {
      title: "3. with 2 paths visible of 8",
      src: "core/breadcrumb/breadcrumb3"
    },
    {
      title:
        "4. passing url 'https://hitachivantara.sharepoint.com/sites/DesignSystem/Pattern%20Library/Home.aspx' with all paths visible",
      src: "core/breadcrumb/breadcrumb4"
    },
    {
      title:
        "5. passing url 'https://hitachivantara.sharepoint.com/sites/DesignSystem/Pattern%20Library/Home.aspx' with 2 paths visible",
      src: "core/breadcrumb/breadcrumb5"
    }
  ]
});

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
import HvBreadcrumb from "@hv/uikit-react-core/BreadCrumb";

storiesOf("Core", module).add("BreadCrumb", () => <HvBreadcrumb />, {
  title: "BreadCrumb",
  description:
    "A breadcrumb is a graphical control element frequently used as a navigational aid in user interfaces and on web pages. It allows users to keep track and maintain awareness of their locations within programs, documents, or websites. " +
    "The component allows to receive an url that is decompose in the breadcrumb or a list of object (label and path)",
  usage: "import HvBreadCrumb from '@hv/uikit-react-core/BreadCrumb'",
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

import React from "react";
import { storiesOf } from "@storybook/react";
import HvBreadcrumb from "@hv/uikit-react-core/dist/BreadCrumb";

storiesOf("Components", module).add("BreadCrumb", () => <HvBreadcrumb />, {
  title: "BreadCrumb",
  description:
    "A breadcrumb is a graphical control element often used as a navigational aid in user interfaces and on web pages. It allows users to keep track and maintain awareness of their locations" +
    "The component allows to receive an url that is decompose in the breadcrumb or a list of object (label and path)",
  usage: "import HvBreadCrumb from '@hv/uikit-react-core/dist/BreadCrumb'",
  examples: [
    {
      title: "1. All paths visible",
      src: "components/breadcrumb/breadcrumb1"
    },
    {
      title: "2. 5 paths visible of 7",
      src: "components/breadcrumb/breadcrumb2"
    },
    {
      title: "3. 2 paths visible of 8",
      src: "components/breadcrumb/breadcrumb3"
    },
    {
      title:
        "4. Passing url 'https://hitachivantara.sharepoint.com/sites/DesignSystem/Pattern%20Library/Home.aspx' with all paths visible",
      src: "components/breadcrumb/breadcrumb4"
    },
    {
      title:
        "5. Passing url 'https://hitachivantara.sharepoint.com/sites/DesignSystem/Pattern%20Library/Home.aspx' with 2 paths visible",
      src: "components/breadcrumb/breadcrumb5"
    },
    {
      title: "6. All paths visible",
      description: "Passing an onClick function that will render divs for links.",
      src: "components/breadcrumb/breadcrumb6"
    }
  ]
});

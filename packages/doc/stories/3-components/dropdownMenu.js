import React from "react";
import { storiesOf } from "@storybook/react";
import DropDownMenu from "@hv/uikit-react-core/dist/DropDownMenu";

storiesOf("Components", module).add("DropDownMenu", () => <DropDownMenu />, {
  title: "Dropdown Menu",
  description:
    "A drop-down menu, drop menu, pull-down list, picklist) is a graphical control element, similar to a list box, that allows the user to choose one value from a list. <br/><br/>" +
    "If no icon is passed, the default moreVert is used. When using the default icon the disabled behaviour and look is applied automatically, otherwise it should be managed by the " +
    "developer",
  usage: "import DropDownMenu from '@hv/uikit-react-core/dist/DropDownMenu'",
  examples: [
    {
      title: "1. Left positioning",
      src: "components/dropdownMenu/dropdownMenu1"
    },
    {
      title: "2. Right positioning",
      src: "components/dropdownMenu/dropdownMenu2"
    },
    {
      title: "3. Right Positioning with Icons and Actions",
      src: "components/dropdownMenu/dropdownMenu3"
    },
    {
      title: "4. Disabled",
      src: "components/dropdownMenu/dropdownMenu4"
    }
  ]
});

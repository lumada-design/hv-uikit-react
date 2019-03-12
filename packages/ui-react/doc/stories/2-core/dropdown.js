import React from "react";
import { storiesOf } from "@storybook/react";
import HvDropdown from "@hv-ui/react/core/Dropdown";

storiesOf("Core", module).add("Dropdown", () => <HvDropdown />, {
  title: "Dropdown List",
  description:
    "A drop-down list (abbreviated drop-down; also known as a drop-down menu, drop menu, pull-down list, picklist) is a graphical control element, similar to a list box, that allows the user to choose one value from a list. ",
  designSystemLink: "https://10.76.48.133/hv-design-system/hv-design-system-specs/tree/master",
  usage: "import HvDropdown from '@hv-ui/react/core/Dropdown'",
  examples: [
    {
      title: "1. Dropdown with no data and no label",
      src: "core/dropdown/dropdown1"
    },
    {
      title: "2. Complete multi-selection dropdown",
      description: "Drop down with more than 10 elements",
      src: "core/dropdown/dropdown2"
    },
    {
      title: "3. Complete simple selection dropdown",
      description: "Drop down with more than 10 elements",
      src: "core/dropdown/dropdown3"
    },
    {
      title: "4. Incomplete multi-selection dropdown",
      description: "Drop down with less than 10 elements",
      src: "core/dropdown/dropdown4"
    },
    {
      title: "5. Multi-selection dropdown without search",
      description: "Drop down with less than 10 elements",
      src: "core/dropdown/dropdown5"
    },
    {
      title: "6. Single selection dropdown with search",
      description: "Drop down with less than 10 elements",
      src: "core/dropdown/dropdown6"
    },
    {
      title: "7. Incomplete simple selection dropdown",
      description: "Drop down with less than 10 elements",
      src: "core/dropdown/dropdown7"
    },
    {
      title: "8. Disabled dropdown",
      src: "core/dropdown/dropdown8"
    },
    {
      title: "9. Disabled dropdown",
      src: "core/dropdown/dropdown9"
    }
  ]
});

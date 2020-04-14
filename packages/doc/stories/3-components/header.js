import React from "react";
import { storiesOf } from "@storybook/react";
import HvHeader from "@hv/uikit-react-core/dist/Header";

storiesOf("Components/Navigation System/Horizontal Navigation", module).add(
  "Header",
  () => <HvHeader />,
  {
    title: "Header",
    description:
      "The header should be informative and provide the most important information about the digital product so that users could scan it in split seconds. " +
      "Our implementation of the header is divided in: <br>" +
      "<ul>" +
      "<li>Brand</li>" +
      "<li>Navigation</li>" +
      "<li>Actions</li>" +
      "</ul><br>" +
      "To build the header a composition of these elements should be used.",
    usage: "import HvHeader from '@hv/uikit-react-core/dist/Header'",
    examples: [
      {
        title: "Variant 1",
        src: "components/header/header1",
        description: "Inside and below the Header usage and responsive behavior"
      }
    ]
  }
);

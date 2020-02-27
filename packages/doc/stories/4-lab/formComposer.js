import React from "react";
import { storiesOf } from "@storybook/react";
import HvFormComposer from "@hv/uikit-react-lab/dist/FormComposer";

storiesOf("Lab", module).add("FormComposer", () => <HvFormComposer />, {
  title: "FormComposer",
  description:
    "A form composer component used to create a form dynamically, still in development",
  usage: "import HvFormComposer from '@hv/uikit-react-lab/dist/FormComposer'",
  examples: [
    {
      title: "1. Basic",
      description:
        "Basic example of the form composer - Using only the Input component from the UI-KIT",
      src: "lab/formComposer/formComposer1.js"
    },
    {
      title: "2. Composition",
      description: "Example of the form composer using multiple components",
      src: "lab/formComposer/formComposer2.js"
    }
  ]
});

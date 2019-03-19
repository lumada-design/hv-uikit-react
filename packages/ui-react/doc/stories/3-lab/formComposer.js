import React from "react";
import { storiesOf } from "@storybook/react";
import HvFormComposer from "@hv-ui/react/core/FormComposer";

storiesOf("Lab", module).add("FormComposer", () => <HvFormComposer />, {
  title: "FormComposer",
  description:
    "A form composer component used to create a form dynamically",
  usage: "import HvFormComposer from '@hv-ui/react/core/FormComposer'",
  examples: [
    {
      title: "Simple form composer",
      description: "Basic example of the form composer - Using only the Input component from the UI-KIT",
      src: "lab/formComposer/formComposer1.js"
    },
    {
      title: "Form composer",
      description: "Example of the form composer using multiple components",
      src: "lab/formComposer/formComposer2.js"
    }
  ]
});

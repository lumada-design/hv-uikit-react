import React from "react";
import { storiesOf } from "@storybook/react";
import HvFooter from "@hv/uikit-react-lab/dist/Footer";

storiesOf("Lab", module).add("Footer", () => <HvFooter />, {
  title: "Footer",
  description: "A footer component for identification, still in development",
  usage: "import HvFooter from '@hv/uikit-react-lab/dist/Footer'",
  examples: [
    {
      title: "Simple",
      description: "Basic gray footer to identify app",
      src: "lab/footer/footerSimple.js"
    }
  ]
});

import React from "react";
import { storiesOf } from "@storybook/react";
import HvFooter from "@hv-ui/react/core/Footer";

storiesOf("Lab", module).add("Footer", () => <HvFooter />, {
  title: "Footer",
  description:
    "A footer component for identification, still in development",
  usage: "import HvFooter from '@hv-ui/react/core/Footer'",
  examples: [
    {
      title: "Simple footer",
      description: "basic gray footer to identify app",
      src: "lab/footer/footerSimple.js"
    }
  ]
});

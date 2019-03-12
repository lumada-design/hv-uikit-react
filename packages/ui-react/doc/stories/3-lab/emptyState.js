import React from "react";
import { storiesOf } from "@storybook/react";
import HvEmptyState from "@hv-ui/react/core/EmptyState";

storiesOf("Lab", module).add("EmptyState", () => <HvEmptyState />, {
  title: "EmptyState",
  description:
    "A splash screen component for information, still in development",
  usage: "import HvEmptyState from '@hv-ui/react/core/EmptyState'",
  examples: [
    {
      title: "Simple empty state",
      description: "basic empty state to provide information",
      src: "lab/emptyState/emptyStateSimple.js"
    }
  ]
});

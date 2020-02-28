import React from "react";
import { storiesOf } from "@storybook/react";
import HvEmptyState from "@hv/uikit-react-core/dist/EmptyState";

storiesOf("Components", module).add("Empty State", () => <HvEmptyState />, {
  title: "Empty State",
  description: "A splash screen component for information",
  usage: "import HvEmptyState from '@hv/uikit-react-core/dist/EmptyState'",
  examples: [
    {
      title: "1. Simple",
      src: "components/emptyState/emptyStateSimple.js"
    },
    {
      title: "2. With Action",
      src: "components/emptyState/emptyStateFull.js"
    },
    {
      title: "3. Custom message",
      src: "components/emptyState/emptyStateCustom.js"
    },
    {
      title: "4. No Results",
      src: "components/emptyState/emptyStateMessageOnly.js"
    }
  ]
});

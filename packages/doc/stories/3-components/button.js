import React from "react";
import { storiesOf } from "@storybook/react";
import HvButton from "@hv/uikit-react-core/dist/Button";

storiesOf("Components", module).add("Button", () => <HvButton />, {
  title: "Button",
  description:
    "A button refers to a graphical control element that provides the user a simple way to trigger an event",
  usage: "import HvButton from '@hv/uikit-react-core/dist/Button'",
  examples: [
    {
      title: "1. Primary",
      description: "Primary button with click action",
      src: "components/button/buttonPrimaryPrimary"
    },
    {
      title: "2. Primary disabled",
      description: "Disabled button that doesn't allow any interaction",
      src: "components/button/buttonPrimaryPrimaryDisabled"
    },
    {
      title: "3. Secondary",
      description: "Secondary button with click action",
      src: "components/button/buttonPrimarySecondary"
    },
    {
      title: "4. Secondary disabled",
      description: "Disabled button that doesn't allow any interaction",
      src: "components/button/buttonPrimarySecondaryDisabled"
    },
    {
      title: "5. Ghost",
      description: "Ghost button with click action",
      src: "components/button/buttonPrimaryGhost"
    },
    {
      title: "6. Ghost disabled",
      description: "Disabled button that doesn't allow any interaction",
      src: "components/button/buttonPrimaryGhostDisabled"
    },
    {
      title: "7. Ghost secondary",
      description: "Ghost button with click action",
      src: "components/button/buttonPrimaryGhostSecondary"
    },
    {
      title: "8. Ghost secondary disabled",
      description: "Disabled button that doesn't allow any interaction",
      src: "components/button/buttonPrimaryGhostSecondaryDisabled"
    },
    {
      title: "9. Semantic",
      description: "Semantic button with click action",
      src: "components/button/buttonSemantic"
    },
    {
      title: "10. Semantic disabled",
      description: "Disabled button that doesn't allow any interaction",
      src: "components/button/buttonSemanticDisabled"
    },
    {
      title: "11. Buttons with icons",
      description: "Various Button configurations with icons and icons + text",
      src: "components/button/buttonIcon"
    }
  ]
});

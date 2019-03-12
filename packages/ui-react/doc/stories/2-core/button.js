import React from "react";
import { storiesOf } from "@storybook/react";
import HvButton from "@hv-ui/react/core/Button";

storiesOf("Core", module).add("Button", () => <HvButton />, {
  title: "Button",
  description: "Button with click actions",
  designSystemLink: "https://10.76.48.133/hv-design-system/hv-design-system-specs/tree/master",
  usage: "import HvButton from '@hv-ui/react/core/Button'",
  examples: [
    {
      title: "Primary button",
      description: "Primary button with click action",
      src: "core/button/buttonSimple"
    },
    {
        title: "Disabled button",
        description: "Disabled button that doesn't allow any interation",
        src: "core/button/buttonDisabled"
    },
    {
        title: "Secondary button",
        description: "Secondary button with click action",
        src: "core/button/buttonSecondary"
    },
    {
        title: "Link button",
        description: "Link button with click action",
        src: "core/button/buttonLink"
    }
  ]
});

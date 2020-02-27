import React from "react";
import { storiesOf } from "@storybook/react";
import HvBadge from "@hv/uikit-react-core/dist/Badge";

storiesOf("Components", module).add("Badge", () => <HvBadge />, {
  title: "Badge",
  description: "A badge component to inform the user of unread notifications",
  usage: "import HvBadge from '@hv/uikit-react-core/dist/Badge'",
  examples: [
    {
      title: "1. Simple",
      description: "Basic badges show when there are unread notifications.",
      src: "components/badge/badgeSimple.js"
    },
    {
      title: "2. With Icon",
      description:
        "Badges show when there are unread notifications with an icon.",
      src: "components/badge/badgeWithIcon.js"
    },
    {
      title: "3. With Text",
      description: "Badges show when there are unread notifications with text.",
      src: "components/badge/badgeWithText.js"
    },
    {
      title: "4. With Button controller",
      description: "Badges update and grow according to their content.",
      src: "components/badge/badgeControlled.js"
    }
  ]
});

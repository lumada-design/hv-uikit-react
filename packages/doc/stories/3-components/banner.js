import React from "react";
import { storiesOf } from "@storybook/react";
import HvBanner from "@hv/uikit-react-core/dist/Banner";

storiesOf("Components/Notifications", module).add("Banner", () => <HvBanner />, {
  title: "Banner",
  description:
    "A banner displays an important, succinct message. The banner provides actions for users to address (or dismiss the banner). It requires an user action to close. Banners should appear at the top of the screen, below a top app bar. ",
  usage: "import HvBanner from '@hv/uikit-react-core/dist/Banner'",
  examples: [
    {
      title: "1. Different variants",
      src: "components/banner/banner1"
    },
    {
      title: "2. With inline action",
      src: "components/banner/banner6"
    },
    {
      title: "3. With bottom right actions",
      src: "components/banner/banner4"
    },
    {
      title: "4. With custom icon",
      src: "components/banner/banner2"
    },
    {
      title: "5. More examples",
      src: "components/banner/banner7"
    }
  ]
});

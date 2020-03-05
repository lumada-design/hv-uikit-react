import React from "react";
import { storiesOf } from "@storybook/react";
import HvProvider from "@hv/uikit-react-core/dist/Provider";
import Theme from "../../samples/foundation/theme";

storiesOf("Foundation/Theming", module)
  .add("Intro", () => <Theme />)
  .add("Provider", () => <HvProvider />, {
    title: "Provider",
    description:
      "a wrapper of material ui provider used to inject theme objects to the components inside",
    usage: "import HvProvider from '@hv/uikit-react-core/dist/Provider'",
    examples: [
      {
        title: "1. HvProvider basic usage",
        src: "foundation/provider/simpleProvider"
      },
      {
        title: "2. HvProvider with wicked theme usage",
        src: "foundation/provider/wickedProvider"
      }
    ]
  });

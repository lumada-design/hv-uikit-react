import React from "react";
import { storiesOf } from "@storybook/react";
import HvCard from "@hv/uikit-react-core/dist/Card";

storiesOf("Components/Card", module).add("Card", () => <HvCard />, {
  title: "Card",
  description:
    "Cards are surfaces that display content and actions on a single topic. They should be easy to scan for relevant and actionable information. Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy. The Card can be an component by itself or a composition of elements (header, content, media and footer) passed as children.",
  usage: "import HvCard from '@hv/uikit-react-core/dist/Card'",
  examples: [
    {
      title: "1. Single action",
      description: "Card built using properties",
      src: "components/card/card1"
    },
    {
      title: "2. All elements",
      src: "components/card/card2"
    },
    {
      title: "3. Multiple actions",
      src: "components/card/card3"
    },
    {
      title: "4. No actions",
      src: "components/card/card4"
    },
    {
      title: "5. Only title",
      src: "components/card/card5"
    },
    {
      title: "6. Kpi",
      src: "components/card/card6"
    },
    {
      title: "7. Composition with component media and footer",
      description: "Card built using the composition of different elements",
      src: "components/card/card7"
    },
    {
      title: "8. Composition with component footer and header",
      src: "components/card/card8"
    },
    {
      title: "9. Automatic action creation from list",
      src: "components/card/card9",
      description:
        "Card actions can be created automatically if an array is provided. The actions will collapse into a DropDownMenu if the limit of visible actions is surpassed."
    },
    {
      title: "10. Whole card selectable with click action",
      src: "components/card/card10",
      description:
        "Showcasing the ability to select anywhere in the content and click action"
    },
    {
      title: "11. Selectable card without footer",
      src: "components/card/card11",
      description: "Showcasing the ability to select a card without foooter"
    },
    {
      title: "12. Whole card selectable with click action that does not select",
      src: "components/card/card12",
      description:
        "Showcasing the ability to have a click action without selecting"
    }
  ]
});

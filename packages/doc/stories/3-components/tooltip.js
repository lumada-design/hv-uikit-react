import React from "react";
import { storiesOf } from "@storybook/react";
import Tooltip from "@hv/uikit-react-core/dist/Tooltip";

storiesOf("Components", module).add("Tooltip", () => <Tooltip />, {
  title: "Tooltip",
  description: "",
  usage: "import Tooltip from '@hv/uikit-react-core/dist/Tooltip'",
  examples: [
    {
      title: "Single Line Tooltip",
      src: "components/tooltip/simpleTooltip.js"
    },
    {
      title: "Tooltip with Long Text",
      src: "components/tooltip/simpleTooltipLong.js"
    },
    {
      title: "Tooltip with Long Text - Open",
      src: "components/tooltip/simpleTooltipLongOpen.js"
    },
    {
      title: "Multiline Tooltip",
      src: "components/tooltip/multilineNoheaderTooltip.js"
    },
    {
      title: "Multiline Tooltip - Open",
      src: "components/tooltip/multilineNoheaderTooltipOpen.js"
    },
    {
      title: "Multiline Tooltip With Header",
      src: "components/tooltip/multilineWithHeaderTooltip.js"
    },
    {
      title: "Multiline Tooltip With Header - Open",
      src: "components/tooltip/multilineWithHeaderTooltipOpen.js"
    }
  ]
});

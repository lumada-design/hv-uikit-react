import React from "react";
import { storiesOf } from "@storybook/react";
import HvSnackbar from "@hv/uikit-react-core/dist/Snackbar";

storiesOf("Components/Notifications", module).add("Snackbar", () => <HvSnackbar />, {
  title: "Snackbar",
  description: "Snackbars provide brief messages about app processes through a message",
  usage: "import HvSnackbar from '@hv/uikit-react-core/dist/Snackbar'",
  examples: [
    {
      title: "1. Different variants",
      src: "components/snackbar/snackbar1"
    },
    {
      title: "2. With action",
      description:
        "It is possible to pass directly a component to the action or use a structure that will render a semantic button",
      src: "components/snackbar/snackbar4"
    },
    {
      title: "3. With custom icon",
      src: "components/snackbar/snackbar2"
    },
    {
      title: "4. With offset",
      src: "components/snackbar/snackbar5"
    },
    {
      title: "5. More examples",
      src: "components/snackbar/snackbar6"
    }
  ]
});

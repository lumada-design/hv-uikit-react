import React from "react";
import { storiesOf } from "@storybook/react";
import HvModalTitle from "@hv/uikit-react-core/dist/Modal/ModalTitle";

storiesOf("Components/Modal", module).add("Title", () => <HvModalTitle />, {
  title: "Modal Title",
  usage:
    "import HvModalTitle from '@hv/uikit-react-core/dist/Modal/ModalTitle'",
  description: "The container for the tile of the modal component"
});

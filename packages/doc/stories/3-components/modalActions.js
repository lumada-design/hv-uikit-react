import React from "react";
import { storiesOf } from "@storybook/react";
import HvModalActions from "@hv/uikit-react-core/dist/Modal/ModalActions";

storiesOf("Components/Modal", module).add("Actions", () => <HvModalActions />, {
  title: "Modal Actions",
  usage:
    "import HvModalActions from '@hv/uikit-react-core/dist/Modal/ModalActions'",
  description: "The container for the actions of the modal component"
});

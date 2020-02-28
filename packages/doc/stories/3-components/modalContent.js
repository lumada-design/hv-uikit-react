import React from "react";
import { storiesOf } from "@storybook/react";
import HvModalContent from "@hv/uikit-react-core/dist/Modal/ModalContent";

storiesOf("Components/Modal", module).add("Content", () => <HvModalContent />, {
  title: "Modal Content",
  usage:
    "import HvModalContent from '@hv/uikit-react-core/dist/Modal/ModalContent'",
  description: "The container for the content of the modal component"
});

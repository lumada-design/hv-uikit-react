import React from "react";
import { storiesOf } from "@storybook/react";
import HvModal from "@hv/uikit-react-core/dist/Modal";

storiesOf("Components/Modal", module).add("Modal", () => <HvModal />, {
  title: "Modal",
  description:
    "The modal component provides a solid foundation for creating dialogs, popovers, lightboxes, or whatever else. It is created by the composition of ModalTitle, ModalContent and ModalActions, passed as child elements.",
  usage: "import { HvModal } from '@hv/uikit-react-core/dist/Modal'",
  examples: [
    {
      title: "1. With text",
      description: "The modal allow the definition of variants, that alters the presented icon.",
      src: "components/modal/modal1"
    },
    {
      title: "2. With custom icon",
      description:
        "The standard icon can be replaced by a custom or just removed. The firstFocusable is set to the Switch Away button",
      src: "components/modal/modal2"
    },
    {
      title: "3. With custom content",
      description: "It is possible to insert any component in the modal",
      src: "components/modal/modal3"
    }
  ]
});

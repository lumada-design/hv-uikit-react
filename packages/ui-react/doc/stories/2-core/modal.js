/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import React from "react";
import { storiesOf } from "@storybook/react";
import { Modal } from "@hv-ui/react/core/Modal";

storiesOf("Core/modal", module).add("Modal", () => <Modal />, {
  title: "Modal",
  description:
    "The modal component provides a solid foundation for creating dialogs, popovers, lightboxes, or whatever else. It is created by the composition of ModalTitle, ModalContent and ModalActions, passed as child elements.",
  designSystemLink: "https://10.76.48.133/hv-design-system/hv-design-system-specs/tree/master",
  usage: "import { HvModal } from '@hv-ui/react/core/Modal'",
  examples: [
    {
      title: "with text",
      description:
        "The modal allow the definition of variants, that alters the presented icon.",
      src: "core/modal/modal1"
    },
    {
      title: "with custom icon",
      description:
        "The standard icon can be replaced by a custom or just removed.",
      src: "core/modal/modal2"
    },
    {
      title: "with custom content",
      description: "It is possible to insert any component in the modal",
      src: "core/modal/modal3"
    }
  ]
});

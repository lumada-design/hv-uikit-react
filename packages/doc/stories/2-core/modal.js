/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import { storiesOf } from "@storybook/react";
import { HvModal } from "@hv/uikit-react-core/Modal";

storiesOf("Core/modal", module).add("HvModal", () => <HvModal />, {
  title: "HvModal",
  description:
    "The modal component provides a solid foundation for creating dialogs, popovers, lightboxes, or whatever else. It is created by the composition of ModalTitle, ModalContent and ModalActions, passed as child elements.",
  designSystemLink: "https://10.76.48.133/hv-design-system/hv-design-system-specs/tree/master",
  usage: "import { HvModal } from '@hv/uikit-react-core/Modal'",
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

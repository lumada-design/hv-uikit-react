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
import HvTextArea from "@hv/uikit-react-core/dist/TextArea";

storiesOf("Components", module).add("Text Area", () => <HvTextArea />, {
  title: "Text area",
  description: "A text area component to receive large inputs",
  usage: "import HvTextArea from '@hv/uikit-react-core/dist/TextArea'",
  examples: [
    {
      title: "1. Simple",
      description: "Basic text area usage",
      src: "components/textArea/textAreaSimple.js"
    },
    {
      title: "2. Simple Resizable",
      description: "Basic text area usage",
      src: "components/textArea/textAreaSimpleResizable.js"
    },
    {
      title: "3. with limits",
      description:
        "Text area that limits the quantity of character that can be introduced in the text area",
      src: "components/textArea/textAreaLimit.js"
    },
    {
      title: "4. Disabled",
      description: "Text area disabled and do not allow any interaction",
      src: "components/textArea/textAreaDisabled.js"
    },
    {
      title: "5. Change input content with another component",
      description: "Change the input value from outside the Input component",
      src: "components/textArea/textAreaUncontrolledValue.js"
    },
    {
      title: "6. Change input content with another component and with limit",
      description: "Change the input value from outside the Input component",
      src: "components/textArea/textAreaUncontrolledValueLimit.js"
    }
  ]
});

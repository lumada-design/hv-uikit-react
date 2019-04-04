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
import HvTextArea from "@hv/uikit-react-core/TextArea";

storiesOf("Core", module).add("TextArea", () => <HvTextArea />, {
  title: "Text area",
  description:
    "A text area component to receive large inputs, still in development",
  usage: "import HvTextArea from '@hv/uikit-react-core/TextArea'",
  examples: [
    {
      title: "Simple text area",
      description: "basic text area usage",
      src: "core/textArea/textAreaSimple.js"
    },
    {
      title: "Text area with limits",
      description: "text area that limits the quantity of character that can be introduced in the text area",
      src: "core/textArea/textAreaLimit.js"
    },
    {
      title: "Disabled text area",
      description: "This text area is disabled and do not allow any interaction",
      src: "core/textArea/textAreaDisabled.js"
    }
  ]
});

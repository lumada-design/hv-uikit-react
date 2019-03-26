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
import HvFormComposer from "@hv-ui/react/core/FormComposer";

storiesOf("Lab", module).add("FormComposer", () => <HvFormComposer />, {
  title: "FormComposer",
  description:
    "A form composer component used to create a form dynamically",
  usage: "import HvFormComposer from '@hv-ui/react/core/FormComposer'",
  examples: [
    {
      title: "Simple form composer",
      description: "Basic example of the form composer - Using only the Input component from the UI-KIT",
      src: "lab/formComposer/formComposer1.js"
    },
    {
      title: "Form composer",
      description: "Example of the form composer using multiple components",
      src: "lab/formComposer/formComposer2.js"
    }
  ]
});

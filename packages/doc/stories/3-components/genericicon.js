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
import CheckboxCheck from '@hv/uikit-react-icons/dist/Generic/CheckboxCheck';

storiesOf("Components", module).add("Generic Icon", () => <CheckboxCheck />, {
  title: "Generic Icons",
  description: "Usage of The generic icons as any icon works the same the sample will be done using the CheckboxCheck icon",
  usage: "import CheckboxCheck from '@hv/uikit-react-icons/dist/Generic/CheckboxCheck'",
  examples: [
    {
      title: "Basic usage of the generic icon component",
      description: "Sample usage of generic icon",
      src: "components/genericIcon/sample.js"
    },
    {
      title: "Icons with custom colors",
      description: "Overriding Generic Icon colors",
      src: "components/genericIcon/colorOverride.js"
    },
    {
      title: "Icon with different standard size",
      description: "Overrides Generic Icon size using standard sizes",
      src: "components/genericIcon/standardSizes.js"
    },
    {
      title: "Icon with custom size",
      description: "Overrides Generic Icon size using non standard sizes",
      src: "components/genericIcon/nonStandardSizes.js"
    }
  ]
});

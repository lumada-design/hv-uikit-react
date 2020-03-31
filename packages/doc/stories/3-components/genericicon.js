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
import CheckboxCheck from "@hv/uikit-react-icons/dist/Generic/CheckboxCheck";

storiesOf("Components", module).add("Generic Icon", () => <CheckboxCheck />, {
  title: "Generic Icons",
  description:
    "Usage of Generic Icons that can be altered to standard or custom sizes and colors",
  usage:
    "import CheckboxCheck from '@hv/uikit-react-icons/dist/Generic/CheckboxCheck'",
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
      title: "Accessible Icon with decorative meaning",
      description: "Icon with decorative meaning using the hidden",
      src: "components/genericIcon/accessibilityDecorative.js"
    },
    {
      title: "Accessible Icon with semantic meaning",
      description:
        "Icon with semantic meaning using the title and role tags for accessibility",
      src: "components/genericIcon/accessibilitySemantic.js"
    },
    {
      title: "Icon with custom size",
      description: "Overrides Generic Icon size using non standard sizes",
      src: "components/genericIcon/nonStandardSizes.js"
    },
    {
      title: "Icon with color from semantic palette",
      description: "Overrides Generic Icon colors with semantic palette colors",
      src: "components/genericIcon/semanticColors.js"
    },
    {
      title: "Icon with inverted semantic colors",
      description: "Inverts Generic Icon colors",
      src: "components/genericIcon/semanticInverted.js"
    }
  ]
});

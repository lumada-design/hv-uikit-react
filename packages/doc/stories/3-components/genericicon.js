import React from "react";
import { storiesOf } from "@storybook/react";
import { CheckboxCheck } from "@hv/uikit-react-icons/dist";

storiesOf("Components", module).add("Generic Icon", () => <CheckboxCheck />, {
  title: "Generic Icons",
  description: "Usage of Generic Icons that can be altered to standard or custom sizes and colors",
  usage: "import { CheckboxCheck } from '@hv/uikit-react-icons/dist'",
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
      description: "Icon with semantic meaning using the title and role tags for accessibility",
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

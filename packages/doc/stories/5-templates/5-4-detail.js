import React from "react";
import { storiesOf } from "@storybook/react";
import DetailTemplate from "../../samples/templates/home/pages/detail";

storiesOf("Templates", module)
  .addParameters({
    options: {
      isToolshown: false,
      noAddon: true
    }
  })
  .add("Detail", () => <DetailTemplate />);

import React from "react";
import { storiesOf } from "@storybook/react";
import Colors from "../../samples/foundation/colors";

storiesOf("Foundation/Palettes", module)
  .add("Main", () => <Colors />)
  .add("Visualization", () => (
    <Colors palettePath="viz" deprecatedPath="viz" />
  ));

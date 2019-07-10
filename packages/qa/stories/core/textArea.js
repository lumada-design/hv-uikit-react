import React from "react";
import { storiesOf } from "@storybook/react";
import HvTextArea from "@hv/uikit-react-core/dist/TextArea";
import QaGrid from "../custom/qaGrid";

// sample scenarios labels
const lbsmin = {
  inputLabel: "TextAreaLabel",
  placeholder: "Enter value"
}

// sample scenarios
let samples = new Object();

samples["simple"] =
  <HvTextArea
    id="test" />

samples["limited"] =
  <HvTextArea
    rows={5}
    labels={lbsmin}
    maxCharQuantity={150} />

samples["disabled"] =
  <HvTextArea
    label="Text Area"
    rows={5}
    labels={lbsmin}
    maxCharQuantity={1500}
    disabled />

// create CoreTextArea for each sample
for (let [key, value] of Object.entries(samples)) {
  storiesOf("CoreTextArea", module).add(key, () => (<QaGrid>{value}</QaGrid>));
}

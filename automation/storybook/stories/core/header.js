import React from "react";
import { storiesOf } from "@storybook/react";
import NewHeader1 from "../../../../packages/doc/samples/components/header/header1";

// sample scenarios
const samples = {};
samples.two_levels = NewHeader1;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("Core_NewHeader", module).add(key, () => <>{samples[key]}</>)
);

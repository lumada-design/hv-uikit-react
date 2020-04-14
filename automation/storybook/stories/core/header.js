import { storiesOf } from "@storybook/react";
import TwoLevels from "../../../../packages/doc/samples/components/header/header1";

// sample scenarios
const samples = { TwoLevels };

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreHeader", module).add(key, () => samples[key])
);

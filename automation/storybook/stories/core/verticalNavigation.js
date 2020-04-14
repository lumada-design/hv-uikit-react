import { storiesOf } from "@storybook/react";
import Static from "../../../../packages/doc/samples/components/verticalNavigation/verticalNavigation1";
import Collapsable from "../../../../packages/doc/samples/components/verticalNavigation/verticalNavigation3";
import CloseOnExit from "../../../../packages/doc/samples/components/verticalNavigation/verticalnavigationcloseonexit";

// sample scenarios
const samples = { Static, Collapsable, CloseOnExit };

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreVerticalNavigation", module).add(key, () => samples[key])
);

import React from "react";
import { storiesOf } from "@storybook/react";
import Verticalnavigation1 from "../../../../packages/doc/samples/components/VerticalNavigation/verticalNavigation1";
import Verticalnavigation2 from "../../../../packages/doc/samples/components/VerticalNavigation/verticalNavigation3";
import verticalnavigationcloseOnExit from "../../../../packages/doc/samples/components/VerticalNavigation/verticalnavigationcloseonexit";

// sample scenarios
const samples = {};
samples.static = Verticalnavigation1;
samples.collapsable = Verticalnavigation2;
samples.closeOnExit = verticalnavigationcloseOnExit;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("Core_New_Vertical_navigation", module).add(key, () => samples[key])
);

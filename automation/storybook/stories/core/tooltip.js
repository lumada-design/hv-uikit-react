import React from "react";
import { storiesOf } from "@storybook/react";
import Grid from "@hv/uikit-react-core/dist/Grid";
import Tooltip1 from "../../../../packages/doc/samples/components/tooltip/simpleTooltip";
import Tooltip2 from "../../../../packages/doc/samples/components/tooltip/simpleTooltipLong";
import Tooltip3 from "../../../../packages/doc/samples/components/tooltip/simpleTooltipLongOpen";
import Tooltip4 from "../../../../packages/doc/samples/components/tooltip/multilineNoheaderTooltip";
import Tooltip5 from "../../../../packages/doc/samples/components/tooltip/multilineNoheaderTooltipOpen";
import Tooltip6 from "../../../../packages/doc/samples/components/tooltip/multilineWithHeaderTooltip";
import Tooltip7 from "../../../../packages/doc/samples/components/tooltip/multilineWithHeaderTooltipOpen";

// sample scenarios
const samples = {};

samples.tooltip1 = Tooltip1;
samples.tooltip2 = Tooltip2;
samples.tooltip3 = Tooltip3;
samples.tooltip4 = Tooltip4;
samples.tooltip5 = Tooltip5;
samples.tooltip6 = Tooltip6;
samples.tooltip7 = Tooltip7;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreTooltip", module).add(key, () => <>{samples[key]}</>)
);

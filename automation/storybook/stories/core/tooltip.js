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
  storiesOf("CoreTooltip", module).add(key, () => (
    <>
        {samples[key]}
    </>    
  ))
);
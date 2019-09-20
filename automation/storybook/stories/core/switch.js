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
import Switch1 from "../../../../packages/doc/samples/components/switch/sample1";
import Switch2 from "../../../../packages/doc/samples/components/switch/sample2";
import Switch3 from "../../../../packages/doc/samples/components/switch/sample3";
import Switch4 from "../../../../packages/doc/samples/components/switch/sample4";
import Switch5 from "../../../../packages/doc/samples/components/switch/sample5";

// sample scenarios
const samples = {};
samples.Switch1 = Switch1;
samples.Switch2 = Switch2;
samples.Switch3 = Switch3;
samples.Switch4 = Switch4;
samples.Switch5 = Switch5;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreSwitch", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

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
import VerticalNavigation1 from "../../../../packages/doc/samples/components/verticalNavigation/verticalNavigation1";
import VerticalNavigation2 from "../../../../packages/doc/samples/components/verticalNavigation/verticalNavigation2";
import VerticalNavigation3 from "../../../../packages/doc/samples/components/verticalNavigation/verticalNavigation3";
import VerticalNavigation4 from "../../../../packages/doc/samples/components/verticalNavigation/verticalNavigation4";
import VerticalNavigation5 from "../../../../packages/doc/samples/components/verticalNavigation/verticalNavigation5";

// sample scenarios
const samples = {};
samples.VerticalNavigation1 = VerticalNavigation1;
samples.VerticalNavigation2 = VerticalNavigation2;
samples.VerticalNavigation3 = VerticalNavigation3;
samples.VerticalNavigation4 = VerticalNavigation4;
samples.VerticalNavigation5 = VerticalNavigation5;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreVerticalNavigation", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

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
import Banner1 from "../../../../packages/doc/samples/components/banner/banner1";
import Banner2 from "../../../../packages/doc/samples/components/banner/banner2";
import Banner3 from "../../../../packages/doc/samples/components/banner/banner3";
import Banner4 from "../../../../packages/doc/samples/components/banner/banner4";
import Banner5 from "../../../../packages/doc/samples/components/banner/banner6";
import Banner6 from "../../../../packages/doc/samples/components/banner/banner7";

// sample scenarios
const samples = {};
samples.Banner1 = Banner1;
samples.Banner2 = Banner2;
samples.Banner3 = Banner3;
samples.Banner4 = Banner4;
samples.Banner5 = Banner5;
samples.Banner6 = Banner6;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreBanner", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

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
import Header1 from "../../../../packages/doc/samples/components/header/header1";
import Header2 from "../../../../packages/doc/samples/components/header/header2";
import Header3 from "../../../../packages/doc/samples/components/header/header3";
import Header4 from "../../../../packages/doc/samples/components/header/header4";
import Header5 from "../../../../packages/doc/samples/components/header/header5";

// sample scenarios
const samples = {};

samples.Header1 = Header1;
samples.Header2 = Header2;
samples.Header3 = Header3;
samples.Header3 = Header4;
samples.Header3 = Header5;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreHeader", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);
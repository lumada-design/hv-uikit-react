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
import Snackbar1 from "../../../../packages/doc/samples/components/snackbar/snackbar1";
import Snackbar2 from "../../../../packages/doc/samples/components/snackbar/snackbar2";
import Snackbar3 from "../../../../packages/doc/samples/components/snackbar/snackbar3";
import Snackbar4 from "../../../../packages/doc/samples/components/snackbar/snackbar4";
import Snackbar5 from "../../../../packages/doc/samples/components/snackbar/snackbar5";

// sample scenarios
const samples = {};
samples.Snackbar1 = Snackbar1;
samples.Snackbar2 = Snackbar2;
samples.Snackbar3 = Snackbar3;
samples.Snackbar4 = Snackbar4;
samples.Snackbar5 = Snackbar5;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreSnackbar", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

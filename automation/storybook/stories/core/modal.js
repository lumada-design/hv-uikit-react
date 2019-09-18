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
import Modal1 from "../../../../packages/doc/samples/components/modal/modal1";
import Modal2 from "../../../../packages/doc/samples/components/modal/modal2";
import Modal3 from "../../../../packages/doc/samples/components/modal/modal3";

// sample scenarios
const samples = {};

samples.modal1 = Modal1;
samples.modal2 = Modal2;
samples.modal3 = Modal3;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreModal", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);
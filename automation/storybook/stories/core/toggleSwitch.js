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
import Switch from "@hv/uikit-react-core/dist/Switch";
import Grid from "@hv/uikit-react-core/dist/Grid";

const samples = {};

const labels = {
  left: "Disconnect",
  right: "Connect"
};

// sample scenarios
samples.default = (
  <>
    <Switch id="default" aria-label="switch sample" />
  </>
);

samples.checkedFalse = (
  <>
    <Switch labels={labels} checked={false} id="checkedFalse" aria-label="switch sample"/>
  </>
);

samples.displayIconChecked = (
  <>
    <Switch id="displayIconChecked" displayIconChecked={true} aria-label="switch sample"/>
  </>
);

samples.customLabels = (
  <>
    <Switch labels={labels} id="customLabels" aria-label="switch sample"/>
  </>
);

samples.disabled = (
  <>
    <Switch id="disabled" disabled aria-label="switch sample"/>
  </>
);

// create page for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreToggleSwitch", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

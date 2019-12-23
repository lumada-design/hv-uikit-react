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
samples.smoke = (
  <>
<Grid container>
  <Grid item xl={2}>
    Default
  </Grid>
  <Grid item xl={2}>
    <Switch id="defaultLabels" />
  </Grid>
  <Grid item xl={2}>
    <Switch showLabels={false} id="noLabels" />
  </Grid>
  <Grid item xl={2}>
    <Switch labels={labels} id="customLabels" />
  </Grid>
  <Grid item xl={2}>
    <Switch displayIconChecked={true} showLabels={false} id="checkmark" />
  </Grid>
</Grid>

<Grid container>
  <Grid item xl={2}>
    Unchecked
  </Grid>
  <Grid item xl={2}>
    <Switch checked={false} id="defaultLabelsUnc" />
  </Grid>
  <Grid item xl={2}>
    <Switch checked={false} disabled={false} showLabels={false} id="noLabelsUnc" />
  </Grid>
  <Grid item xl={2}>
    <Switch checked={false} disabled={false} labels={labels} id="customLabelsUnc" />
  </Grid>
  <Grid item xl={2}>
    <Switch checked={false} disabled={false} showLabels={false} displayIconChecked id="checkmarkUnc" />
  </Grid>
</Grid>

<Grid container>
  <Grid item xl={2}>
    Disabled Checked
  </Grid>
  <Grid item xl={2}>
    <Switch checked disabled id="defaultLabelsDC" />
  </Grid>
  <Grid item xl={2}>
    <Switch checked disabled showLabels={false} id="noLabelsDC" />
  </Grid>
  <Grid item xl={2}>
    <Switch checked disabled labels={labels} id="customLabelsDC" />
  </Grid>
  <Grid item xl={2}>
    <Switch checked disabled showLabels={false} displayIconChecked id="checkmarkDC" />
  </Grid>
</Grid>

<Grid container>
  <Grid item xl={2}>
    Disabled
  </Grid>
  <Grid item xl={2}>
    <Switch checked={false} disabled id="defaultLabelsDis" />
  </Grid>
  <Grid item xl={2}>
    <Switch checked={false} disabled showLabels={false} id="noLabelsDis" />
  </Grid>
  <Grid item xl={2}>
    <Switch checked={false} disabled labels={labels} id="customLabelsDis" />
  </Grid>
  <Grid item xl={2}>
    <Switch checked={false} disabled showLabels={false} displayIconChecked id="checkmarkDis" />
  </Grid>
</Grid>
</>
);

samples.toggleOff = (
  <>
<Grid container>
  <Grid item xl={2}>
    <Switch id="defaultLabels" />
  </Grid>
</Grid>
</>
);

samples.toggleOn = (
  <>
<Grid container>
  <Grid item xl={2}>
    <Switch checked={false} disabled={false} labels={labels} id="customLabelsUnc" />
  </Grid>
</Grid>
</>
);

// create page for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreToggle", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

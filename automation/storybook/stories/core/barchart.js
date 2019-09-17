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
import GroupHorizontal from "../../../../packages/doc/samples/components/barchart/groupHorizontal";
import GroupVertical from "../../../../packages/doc/samples/components/barchart/groupVertical";
import SimpleHorizontal from "../../../../packages/doc/samples/components/barchart/simpleHorizontal";
import SimpleHorizontalWithUseSingle from "../../../../packages/doc/samples/components/barchart/simpleHorizontalWithUseSingle";
import SimpleVertical from "../../../../packages/doc/samples/components/barchart/simpleVertical";
import SimpleVerticalWithUseSingle from "../../../../packages/doc/samples/components/barchart/simpleVerticalWithUseSingle";
import StackHorizontal from "../../../../packages/doc/samples/components/barchart/stackHorizontal";
import StackVertical from "../../../../packages/doc/samples/components/barchart/stackVertical";

// sample scenarios
const samples = {};
samples.GroupHorizontal = GroupHorizontal;
samples.GroupVertical = GroupVertical;
samples.SimpleHorizontal = SimpleHorizontal;
samples.SimpleHorizontalWithUseSingle = SimpleHorizontalWithUseSingle;
samples.SimpleVertical = SimpleVertical;
samples.SimpleVerticalWithUseSingle = SimpleVerticalWithUseSingle;
samples.StackHorizontal = StackHorizontal;
samples.StackVertical = StackVertical;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreBarchart", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

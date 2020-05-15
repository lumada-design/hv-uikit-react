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
import Grid from "@hv/uikit-react-core/dist/Grid";
import { storiesOf } from "@storybook/react";
import User from "../../../../packages/doc/samples/components/userPreferences/userPreferences1";
import Integrated from "../../../../packages/doc/samples/components/userPreferences/userPreferences2";


// sample scenarios
const samples = {};
samples.User = User;
samples.Integrated = Integrated;


Object.keys(samples).forEach(key =>
  storiesOf("Core UserPreferences", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

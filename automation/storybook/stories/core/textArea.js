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
import HvTextArea from "@hv/uikit-react-core/dist/TextArea";
import Grid from "@hv/uikit-react-core/dist/Grid";
import TextAreaDisabled from "../../../../packages/doc/samples/components/textArea/textAreaDisabled";
import TextAreaLimit from "../../../../packages/doc/samples/components/textArea/textAreaLimit";
import TextAreaSimple from "../../../../packages/doc/samples/components/textArea/textAreaSimple";
import TextAreaUncontrolledValue from "../../../../packages/doc/samples/components/textArea/textAreaUncontrolledValue";
import TextAreaUncontrolledValueLimit from "../../../../packages/doc/samples/components/textArea/textAreaUncontrolledValueLimit";

// sample scenarios
const samples = {};

samples.TextAreaDisabled = TextAreaDisabled;
samples.TextAreaLimit = TextAreaLimit;
samples.TextAreaSimple = TextAreaSimple;
samples.TextAreaUncontrolledValue = TextAreaUncontrolledValue;
samples.TextAreaUncontrolledValueLimit = TextAreaUncontrolledValueLimit;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreTextArea", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);
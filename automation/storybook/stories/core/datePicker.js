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
import SimpleWithValueDatePicker from "../../../../packages/doc/samples/components/datePicker/datePickerWithValue";
import SimpleLocalizedDatePicker from "../../../../packages/doc/samples/components/datePicker/datePickerLocalized";
import SimpleWithActionsDatePicker from "../../../../packages/doc/samples/components/datePicker/datePickerWithActions";
import RangeWithValuesDatePicker from "../../../../packages/doc/samples/components/datePicker/datePickerRangeWithValues";
import DatePickerWithValueChange from "../../../../packages/doc/samples/components/datePicker/datePickerWithValueChange";

// sample scenarios
const samples = {};
samples.SimpleWithValueDatePicker = SimpleWithValueDatePicker;
samples.SimpleLocalizedDatePicker = SimpleLocalizedDatePicker;
samples.SimpleWithActionsDatePicker = SimpleWithActionsDatePicker;
samples.RangeWithValuesDatePicker = RangeWithValuesDatePicker;
samples.SimpleWithValueChange = DatePickerWithValueChange;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreDatePicker", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

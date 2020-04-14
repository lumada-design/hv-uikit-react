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

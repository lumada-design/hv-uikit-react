import React from "react";
import { storiesOf } from "@storybook/react";
import Grid from "@hv/uikit-react-core/dist/Grid";
import RadioButtonDisabled from "../../../../packages/doc/samples/components/radioButton/radioButtonDisabled";
import RadioButtonLabel from "../../../../packages/doc/samples/components/radioButton/radioButtonLabel";
import RadioButtonLabelDisabled from "../../../../packages/doc/samples/components/radioButton/radioButtonLabelDisabled";
import RadioButtonOnChange from "../../../../packages/doc/samples/components/radioButton/radioButtonOnChange";
import RadioButtonOnChangeDisabled from "../../../../packages/doc/samples/components/radioButton/radioButtonOnChangeDisabled";
import RadioButtonSimple from "../../../../packages/doc/samples/components/radioButton/radioButtonSimple";
import RadioButtonState from "../../../../packages/doc/samples/components/radioButton/radioButtonState";
import RadioButtonCheckedDisabled from "../../../../packages/doc/samples/components/radioButton/radioButtonCheckedDisabled";

// sample scenarios
const samples = {};
samples.RadioButtonDisabled = RadioButtonDisabled;
samples.RadioButtonLabel = RadioButtonLabel;
samples.RadioButtonLabelDisabled = RadioButtonLabelDisabled;
samples.RadioButtonOnChange = RadioButtonOnChange;
samples.RadioButtonOnChangeDisabled = RadioButtonOnChangeDisabled;
samples.RadioButtonSimple = RadioButtonSimple;
samples.RadioButtonState = RadioButtonState;
samples.RadioButtonCheckedDisabled = RadioButtonCheckedDisabled;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreRadioButton", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

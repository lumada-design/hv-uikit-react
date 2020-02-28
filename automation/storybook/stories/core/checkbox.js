import React from "react";
import { storiesOf } from "@storybook/react";
import Grid from "@hv/uikit-react-core/dist/Grid";
import CheckboxDisabled from "../../../../packages/doc/samples/components/checkbox/checkboxDisabled";
import CheckboxLabel from "../../../../packages/doc/samples/components/checkbox/checkboxLabel";
import CheckboxLabelDisabled from "../../../../packages/doc/samples/components/checkbox/checkboxLabelDisabled";
import CheckboxOnChange from "../../../../packages/doc/samples/components/checkbox/checkboxOnChange";
import CheckboxOnChangeDisabled from "../../../../packages/doc/samples/components/checkbox/checkboxOnChangeDisabled";
import CheckboxSimple from "../../../../packages/doc/samples/components/checkbox/checkboxSimple";
import CheckboxState from "../../../../packages/doc/samples/components/checkbox/checkboxState";

// sample scenarios
const samples = {};

samples.CheckboxDisabled = CheckboxDisabled;
samples.CheckboxLabel = CheckboxLabel;
samples.CheckboxLabelDisabled = CheckboxLabelDisabled;
samples.CheckboxOnChange = CheckboxOnChange;
samples.CheckboxOnChangeDisabled = CheckboxOnChangeDisabled;
samples.CheckboxSimple = CheckboxSimple;
samples.CheckboxState = CheckboxState;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreCheckbox", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

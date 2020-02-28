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

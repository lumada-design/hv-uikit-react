import React from "react";
import { storiesOf } from "@storybook/react";
import Grid from "@hv/uikit-react-core/dist/Grid";
import SimpleArea from "../../../../packages/doc/samples/components/linechart/simpleArea";

// sample scenarios
const samples = {};
samples.SimpleArea = SimpleArea;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreLineChart", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

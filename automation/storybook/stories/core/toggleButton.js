import React from "react";
import { storiesOf } from "@storybook/react";
import Grid from "@hv/uikit-react-core/dist/Grid";
import Sample1 from "../../../../packages/doc/samples/components/toggleButton/sample1";
import Sample2 from "../../../../packages/doc/samples/components/toggleButton/sample2";
import Sample3 from "../../../../packages/doc/samples/components/toggleButton/sample3";

// sample scenarios
const samples = {};
samples.Sample1 = Sample1;
samples.Sample2 = Sample2;
samples.Sample3 = Sample3;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreToggleButton", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

import React from "react";
import { storiesOf } from "@storybook/react";
import Grid from "@hv/uikit-react-core/dist/Grid";
import Snackbar1 from "../../../../packages/doc/samples/components/snackbar/snackbar1";
import Snackbar2 from "../../../../packages/doc/samples/components/snackbar/snackbar2";
import Snackbar3 from "../../../../packages/doc/samples/components/snackbar/snackbar3";
import Snackbar4 from "../../../../packages/doc/samples/components/snackbar/snackbar4";
import Snackbar5 from "../../../../packages/doc/samples/components/snackbar/snackbar5";
import Snackbar6 from "../../../../packages/doc/samples/components/snackbar/snackbar6";

// sample scenarios
const samples = {};
samples.Snackbar1 = Snackbar1;
samples.Snackbar2 = Snackbar2;
samples.Snackbar3 = Snackbar3;
samples.Snackbar4 = Snackbar4;
samples.Snackbar5 = Snackbar5;
samples.Snackbar6 = Snackbar6;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreSnackbar", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

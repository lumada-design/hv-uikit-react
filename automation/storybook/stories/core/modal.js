import React from "react";
import { storiesOf } from "@storybook/react";
import Grid from "@hv/uikit-react-core/dist/Grid";
import Modal1 from "../../../../packages/doc/samples/components/modal/modal1";
import Modal2 from "../../../../packages/doc/samples/components/modal/modal2";
import Modal3 from "../../../../packages/doc/samples/components/modal/modal3";

// sample scenarios
const samples = {};

samples.modal1 = Modal1;
samples.modal2 = Modal2;
samples.modal3 = Modal3;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreModal", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

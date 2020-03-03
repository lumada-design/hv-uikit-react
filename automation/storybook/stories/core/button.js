import React from "react";
import { storiesOf } from "@storybook/react";
import Grid from "@hv/uikit-react-core/dist/Grid";

import ButtonNegative from "../../../../packages/doc/samples/components/button/buttonNegative";
import ButtonSmoke from "../../../../packages/doc/samples/components/button/buttonSmoke";

const samples = {};
samples.negate = ButtonNegative;
samples.smoke = ButtonSmoke;

// create CoreButton for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreButton", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

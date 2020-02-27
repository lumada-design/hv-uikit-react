import React from "react";
import { storiesOf } from "@storybook/react";
import Grid from "@hv/uikit-react-core/dist/Grid";
import Simple from "../../../../packages/doc/samples/components/assetInventory/assetInventory1";

// sample scenarios
const samples = {};
samples.Simple = Simple;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreAssetInventory", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

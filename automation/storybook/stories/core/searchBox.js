import React from "react";
import { storiesOf } from "@storybook/react";
import Grid from "@hv/uikit-react-core/dist/Grid";
import disabledSearchbox from "../../../../packages/doc/samples/components/searchBox/disabledSearchbox";
import noSuggestionSearchbox from "../../../../packages/doc/samples/components/searchBox/noSuggestionSearchbox";
import simpleSearchbox from "../../../../packages/doc/samples/components/searchBox/simpleSearchbox";
import simpleSearchboxDropped from "../../../../packages/doc/samples/components/searchBox/simpleSearchboxDropped";

// sample scenarios
const samples = {};

samples.disabledSearchbox = disabledSearchbox;
samples.noSuggestionSearchbox = noSuggestionSearchbox;
samples.simpleSearchbox = simpleSearchbox;
samples.simpleSearchboxDropped = simpleSearchboxDropped;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreSearchBox", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

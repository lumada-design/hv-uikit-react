import React from "react";
import { storiesOf } from "@storybook/react";
import Grid from "@hv/uikit-react-core/dist/Grid";
import SimpleTabs from "../../../../packages/doc/samples/components/tabs/sample1";
import BiggerTabs from "../../../../packages/doc/samples/components/tabs/sample3";
import TabsWithContent from "../../../../packages/doc/samples/components/tabs/sample4";

// sample scenarios
const samples = {};
samples.SimpleTabs = SimpleTabs;
samples.BiggerTabs = BiggerTabs;
samples.TabsWithContent = TabsWithContent;

// create CoreTabs for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreTabs", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

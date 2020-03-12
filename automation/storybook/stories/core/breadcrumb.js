import React from "react";
import { storiesOf } from "@storybook/react";
import Grid from "@hv/uikit-react-core/dist/Grid";
import Breadcrumb1 from "../../../../packages/doc/samples/components/breadcrumb/breadcrumb1";
import Breadcrumb2 from "../../../../packages/doc/samples/components/breadcrumb/breadcrumb2";
import Breadcrumb3 from "../../../../packages/doc/samples/components/breadcrumb/breadcrumb3";
import Breadcrumb4 from "../../../../packages/doc/samples/components/breadcrumb/breadcrumb4";
import Breadcrumb5 from "../../../../packages/doc/samples/components/breadcrumb/breadcrumb5";
import Breadcrumb6 from "../../../../packages/doc/samples/components/breadcrumb/breadcrumb6";


// sample scenarios
const samples = {};
samples.Breadcrumb1 = Breadcrumb1;
samples.Breadcrumb2 = Breadcrumb2;
samples.Breadcrumb3 = Breadcrumb3;
samples.Breadcrumb4 = Breadcrumb4;
samples.Breadcrumb5 = Breadcrumb5;
samples.Breadcrumb6 = Breadcrumb6;
// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreBreadcrumb", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

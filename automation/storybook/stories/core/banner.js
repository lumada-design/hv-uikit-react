import React from "react";
import { storiesOf } from "@storybook/react";
import Grid from "@hv/uikit-react-core/dist/Grid";
import Banner1 from "../../../../packages/doc/samples/components/banner/banner1";
import Banner2 from "../../../../packages/doc/samples/components/banner/banner2";
import Banner3 from "../../../../packages/doc/samples/components/banner/banner3";
import Banner4 from "../../../../packages/doc/samples/components/banner/banner4";
import Banner5 from "../../../../packages/doc/samples/components/banner/banner5";
import Banner6 from "../../../../packages/doc/samples/components/banner/banner6";
import Banner7 from "../../../../packages/doc/samples/components/banner/banner7";
import Banner8 from "../../../../packages/doc/samples/components/banner/banner8";

// sample scenarios
const samples = {};
samples.Banner1 = Banner1;
samples.Banner2 = Banner2;
samples.Banner3 = Banner3;
samples.Banner4 = Banner4;
samples.Banner5 = Banner5;
samples.Banner6 = Banner6;
samples.Banner7 = Banner7;
samples.Banner8 = Banner8;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreBanner", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

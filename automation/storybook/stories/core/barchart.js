import React from "react";
import { storiesOf } from "@storybook/react";
import Grid from "@hv/uikit-react-core/dist/Grid";
import GroupHorizontal from "../../../../packages/doc/samples/components/barchart/groupHorizontal";
import GroupVertical from "../../../../packages/doc/samples/components/barchart/groupVertical";
import SimpleHorizontal from "../../../../packages/doc/samples/components/barchart/simpleHorizontal";
import SimpleHorizontalWithUseSingle from "../../../../packages/doc/samples/components/barchart/simpleHorizontalWithUseSingle";
import SimpleVertical from "../../../../packages/doc/samples/components/barchart/simpleVertical";
import SimpleVerticalWithUseSingle from "../../../../packages/doc/samples/components/barchart/simpleVerticalWithUseSingle";
import StackHorizontal from "../../../../packages/doc/samples/components/barchart/stackHorizontal";
import StackVertical from "../../../../packages/doc/samples/components/barchart/stackVertical";

// sample scenarios
const samples = {};
samples.GroupHorizontal = GroupHorizontal;
samples.GroupVertical = GroupVertical;
samples.SimpleHorizontal = SimpleHorizontal;
samples.SimpleHorizontalWithUseSingle = SimpleHorizontalWithUseSingle;
samples.SimpleVertical = SimpleVertical;
samples.SimpleVerticalWithUseSingle = SimpleVerticalWithUseSingle;
samples.StackHorizontal = StackHorizontal;
samples.StackVertical = StackVertical;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreBarchart", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

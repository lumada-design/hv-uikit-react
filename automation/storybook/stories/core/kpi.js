import React from "react";
import { storiesOf } from "@storybook/react";
import Grid from "@hv/uikit-react-core/dist/Grid";
import KpiAverage from "../../../../packages/doc/samples/components/kpi/kpiAverage";
import KpiIOPS from "../../../../packages/doc/samples/components/kpi/kpiIOPS";
import KpiNodes from "../../../../packages/doc/samples/components/kpi/kpiNodes";
import KpiSimple from "../../../../packages/doc/samples/components/kpi/kpiSimple";
import KpiStorageArray from "../../../../packages/doc/samples/components/kpi/kpiStorageArray";
import KpiThroughput from "../../../../packages/doc/samples/components/kpi/kpiThroughput";

// sample scenarios
const samples = {};
(samples.KpiAverage = KpiAverage),
  (samples.KpiIOPS = KpiIOPS),
  (samples.KpiNodes = KpiNodes),
  (samples.KpiSimple = KpiSimple),
  (samples.KpiStorageArray = KpiStorageArray),
  (samples.KpiThroughput = KpiThroughput),
  // create CoreTextArea for each sample
  Object.keys(samples).forEach(key =>
    storiesOf("CoreKpi", module).add(key, () => (
      <Grid container>
        <Grid item xl>
          {samples[key]}
        </Grid>
      </Grid>
    ))
  );

import React from "react";
import { storiesOf } from "@storybook/react";
import Switch from "@hv/uikit-react-core/dist/Switch";
import Grid from "@hv/uikit-react-core/dist/Grid";

const samples = {};

const labels = {
  left: "Disconnect",
  right: "Connect"
};

// sample scenarios
samples.default = (
  <>
    <Switch id="default" aria-label="switch sample" />
  </>
);

samples.checkedFalse = (
  <>
    <Switch
      labels={labels}
      checked={false}
      id="checkedFalse"
      aria-label="switch sample"
    />
  </>
);

samples.displayIconChecked = (
  <>
    <Switch
      id="displayIconChecked"
      displayIconChecked={true}
      aria-label="switch sample"
    />
  </>
);

samples.customLabels = (
  <>
    <Switch labels={labels} id="customLabels" aria-label="switch sample" />
  </>
);

samples.disabled = (
  <>
    <Switch id="disabled" disabled aria-label="switch sample" />
  </>
);

// create page for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreToggleSwitch", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

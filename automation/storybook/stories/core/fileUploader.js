import React from "react";
import { storiesOf } from "@storybook/react";
import Grid from "@hv/uikit-react-core/dist/Grid";
import dropzoneArea from "../../../../packages/doc/samples/components/fileuploader/automationSample";

// sample scenarios
const samples = {};

const sampleWrapper = {
  width: 500
};

samples.dropzoneArea = dropzoneArea;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreFileUploader", module).add(key, () => (
    <div style={sampleWrapper}>
      <Grid container>
        <Grid item xl>
          {samples[key]}
        </Grid>
      </Grid>
    </div>
  ))
);

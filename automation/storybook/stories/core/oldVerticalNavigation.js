import React from "react";
import { storiesOf } from "@storybook/react";
import Grid from "@hv/uikit-react-core/dist/Grid";
import VerticalNavigation1 from "../../../../packages/doc/samples/components/oldVerticalNavigation/verticalNavigation1";
import VerticalNavigation2 from "../../../../packages/doc/samples/components/oldVerticalNavigation/verticalNavigation2";
import VerticalNavigation3 from "../../../../packages/doc/samples/components/oldVerticalNavigation/verticalNavigation3";
import VerticalNavigation4 from "../../../../packages/doc/samples/components/oldVerticalNavigation/verticalNavigation4";
import VerticalNavigation5 from "../../../../packages/doc/samples/components/oldVerticalNavigation/verticalNavigation5";

// sample scenarios
const samples = {
  VerticalNavigation1,
  VerticalNavigation2,
  VerticalNavigation3,
  VerticalNavigation4,
  VerticalNavigation5
};

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreOldVerticalNavigation", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

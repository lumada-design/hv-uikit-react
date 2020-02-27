import React from "react";
import { storiesOf } from "@storybook/react";
import Grid from "@hv/uikit-react-core/dist/Grid";
import BadgeSimple from "../../../../packages/doc/samples/components/badge/badgeSimple";
import BadgeWithIcon from "../../../../packages/doc/samples/components/badge/badgeWithIcon";
import BadgeWithText from "../../../../packages/doc/samples/components/badge/badgeWithText";

// sample scenarios
const samples = {};
samples.BadgeSimple = BadgeSimple;
samples.BadgeWithIcon = BadgeWithIcon;
samples.BadgeWithText = BadgeWithText;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreBadge", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

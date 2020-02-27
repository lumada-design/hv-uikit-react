import React from "react";
import { storiesOf } from "@storybook/react";
import Grid from "@hv/uikit-react-core/dist/Grid";
import Selectable from "../../../../packages/doc/samples/components/card/card10";
import NoSelectable from "../../../../packages/doc/samples/components/card/card2";
import Card9 from "../../../../packages/doc/samples/components/card/card9";
import ActionsNoSelectable from "../custom/actionsNoSelectable";
import ActionsSelectable from "../custom/actionsSelectable";

// sample scenarios
const samples = {};
samples.Card9 = Card9;
samples.Selectable = Selectable;
samples.No_Selectable = NoSelectable;
samples.Actions_Selectable = ActionsSelectable;
samples.Actions_No_Selectable = ActionsNoSelectable;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreCard", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

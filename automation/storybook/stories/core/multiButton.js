import React from "react";
import { storiesOf } from "@storybook/react";
import Grid from "@hv/uikit-react-core/dist/Grid";
import FixedToggleHorizontalMultipleSelection from "../../../../packages/doc/samples/components/multiButton/horizontalSamples/fixedToggleHorizontalMultipleSelection";
import IconOnlyHorizontalMultipleSelection from "../../../../packages/doc/samples/components/multiButton/horizontalSamples/iconOnlyHorizontalMultipleSelection";
import IconOnlyHorizontalSingleSelection from "../../../../packages/doc/samples/components/multiButton/horizontalSamples/iconOnlyHorizontalSingleSelection";
import InputControlledValue from "../../../../packages/doc/samples/components/multiButton/horizontalSamples/inputControlledValue";
import LabelOnlyHorizontalMultipleSelection from "../../../../packages/doc/samples/components/multiButton/horizontalSamples/labelOnlyHorizontalMultipleSelection";
import LabelOnlyHorizontalSingleSelection from "../../../../packages/doc/samples/components/multiButton/horizontalSamples/labelOnlyHorizontalSingleSelection";
import LabelWithIconHorizontalMultipleSelection from "../../../../packages/doc/samples/components/multiButton/horizontalSamples/labelWithIconHorizontalMultipleSelection";
import LabelWithIconHorizontalSingleSelection from "../../../../packages/doc/samples/components/multiButton/horizontalSamples/labelWithIconHorizontalSingleSelection";
import MinimumSelectionHorizontalMultipleSelection from "../../../../packages/doc/samples/components/multiButton/horizontalSamples/minimumSelectionHorizontalMultipleSelection";
import MaximumSelectionHorizontalMultipleSelection from "../../../../packages/doc/samples/components/multiButton/horizontalSamples/maximumSelectionHorizontalMultipleSelection";

import IconOnlyVerticalMultipleSelection from "../../../../packages/doc/samples/components/multiButton/verticalSamples/iconOnlyVerticalMultipleSelection";
import IconOnlyVerticalSingleSelection from "../../../../packages/doc/samples/components/multiButton/verticalSamples/iconOnlyVerticalSingleSelection";
import LabelOnlyVerticalMultipleSelection from "../../../../packages/doc/samples/components/multiButton/verticalSamples/labelOnlyVerticalMultipleSelection";
import LabelOnlyVerticalSingleSelection from "../../../../packages/doc/samples/components/multiButton/verticalSamples/labelOnlyVerticalSingleSelection";
import LabelWithIconVerticalMultipleSelection from "../../../../packages/doc/samples/components/multiButton/verticalSamples/labelWithIconVerticalMultipleSelection";
import LabelWithIconVerticalSingleSelection from "../../../../packages/doc/samples/components/multiButton/verticalSamples/labelWithIconVerticalSingleSelection";

// sample scenarios
const samples = {};
samples.FixedToggleHorizontalMultipleSelection = FixedToggleHorizontalMultipleSelection;
samples.IconOnlyHorizontalMultipleSelection = IconOnlyHorizontalMultipleSelection;
samples.IconOnlyHorizontalSingleSelection = IconOnlyHorizontalSingleSelection;
samples.InputControlledValue = InputControlledValue;
samples.LabelOnlyHorizontalMultipleSelection = LabelOnlyHorizontalMultipleSelection;
samples.LabelOnlyHorizontalSingleSelection = LabelOnlyHorizontalSingleSelection;
samples.LabelWithIconHorizontalMultipleSelection = LabelWithIconHorizontalMultipleSelection;
samples.LabelWithIconHorizontalSingleSelection = LabelWithIconHorizontalSingleSelection;
samples.MinimumSelectionHorizontalMultipleSelection = MinimumSelectionHorizontalMultipleSelection;
samples.MaximumSelectionHorizontalMultipleSelection = MaximumSelectionHorizontalMultipleSelection;
samples.IconOnlyVerticalMultipleSelection = IconOnlyVerticalMultipleSelection;
samples.IconOnlyVerticalSingleSelection = IconOnlyVerticalSingleSelection;
samples.LabelOnlyVerticalMultipleSelection = LabelOnlyVerticalMultipleSelection;
samples.LabelOnlyVerticalSingleSelection = LabelOnlyVerticalSingleSelection;
samples.LabelWithIconVerticalMultipleSelection = LabelWithIconVerticalMultipleSelection;
samples.LabelWithIconVerticalSingleSelection = LabelWithIconVerticalSingleSelection;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreMultiButton", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

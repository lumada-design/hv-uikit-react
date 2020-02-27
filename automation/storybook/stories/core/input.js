import React from "react";
import { storiesOf } from "@storybook/react";
import Grid from "@hv/uikit-react-core/dist/Grid";
import InputCustomProps from "../../../../packages/doc/samples/components/input/inputCustomProps";
import InputCustomValidation from "../../../../packages/doc/samples/components/input/inputCustomValidation";
import InputDefaultValue from "../../../../packages/doc/samples/components/input/inputDefaultValue";
import InputEmail from "../../../../packages/doc/samples/components/input/inputEmail";
import InputEvents from "../../../../packages/doc/samples/components/input/inputEvents";
import InputInitialState from "../../../../packages/doc/samples/components/input/inputInitialState";
import InputLeftIcon from "../../../../packages/doc/samples/components/input/inputLeftIcon";
import InputMax from "../../../../packages/doc/samples/components/input/inputMax";
import InputMaxNumeric from "../../../../packages/doc/samples/components/input/inputMaxNumeric";
import InputNoValidation from "../../../../packages/doc/samples/components/input/inputNoValidation";
import InputPassword from "../../../../packages/doc/samples/components/input/inputPassword";
import InputRequiredMaxNumeric from "../../../../packages/doc/samples/components/input/inputRequiredMaxNumeric";
import InputSimple from "../../../../packages/doc/samples/components/input/inputSimple";
import InputSimpleDisable from "../../../../packages/doc/samples/components/input/inputSimpleDisable";
import InputSimpleWithIconInfo from "../../../../packages/doc/samples/components/input/inputSimpleWithIconInfo";
import InputSuggestions from "../../../../packages/doc/samples/components/input/inputSuggestions";
import InputUncontrolledValue from "../../../../packages/doc/samples/components/input/inputUncontrolledValue";
import InputControlled from "../../../../packages/doc/samples/components/input/inputControlled";

// sample scenarios
const samples = {
  InputCustomProps,
  InputCustomValidation,
  InputDefaultValue,
  InputEmail,
  InputEvents,
  InputInitialState,
  InputLeftIcon,
  InputMax,
  InputMaxNumeric,
  InputNoValidation,
  InputPassword,
  InputRequiredMaxNumeric,
  InputSimple,
  InputSimpleDisable,
  InputSimpleWithIconInfo,
  InputSuggestions,
  InputUncontrolledValue,
  InputControlled
};

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreInput", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

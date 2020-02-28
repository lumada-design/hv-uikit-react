import React from "react";
import { storiesOf } from "@storybook/react";
import Grid from "@hv/uikit-react-core/dist/Grid";
import Login1 from "../../../../packages/doc/samples/components/login/login1";
import Login2 from "../../../../packages/doc/samples/components/login/login2";
import Login3 from "../../../../packages/doc/samples/components/login/login3";
import Login4 from "../../../../packages/doc/samples/components/login/login4";
import Login5 from "../../../../packages/doc/samples/components/login/login5";
import Login6 from "../../../../packages/doc/samples/components/login/login6";

// sample scenarios
const samples = {};

samples.login1 = Login1;
samples.login2 = Login2;
samples.login3 = Login3;
samples.login4 = Login4;
samples.login5 = Login5;
samples.login6 = Login6;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreLogin", module).add(key, () => <>{samples[key]}</>)
);

/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import { storiesOf } from "@storybook/react";
import Grid from "@hv/uikit-react-core/dist/Grid";
import Login1 from "../../../../packages/doc/samples/components/login/login1";
import Login2 from "../../../../packages/doc/samples/components/login/login2";
import Login3 from "../../../../packages/doc/samples/components/login/login3";
import Login4 from "../../../../packages/doc/samples/components/login/login4";
import Login5 from "../../../../packages/doc/samples/components/login/login5";

// sample scenarios
const samples = {};

samples.login1 = Login1;
samples.login2 = Login2;
samples.login3 = Login3;
samples.login4 = Login4;
samples.login5 = Login5;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreLogin", module).add(key, () => (
    <>
        {samples[key]}
    </>    
  ))
);
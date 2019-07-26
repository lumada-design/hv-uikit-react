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
import HvTextArea from "@hv/uikit-react-core/dist/TextArea";
import QaGrid from "../custom/qaGrid";

// sample scenarios labels
const lbsmin = {
  inputLabel: "TextAreaLabel",
  placeholder: "Enter value"
};

// sample scenarios
const samples = {};

samples.simple = <HvTextArea id="test" />;

samples.limited = <HvTextArea rows={5} labels={lbsmin} maxCharQuantity={150} />;

samples.disabled = (
  <HvTextArea
    label="Text Area"
    rows={5}
    labels={lbsmin}
    maxCharQuantity={1500}
    disabled
  />
);

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreTextArea", module).add(key, () => (
    <QaGrid>{samples[key]}</QaGrid>
  ))
);

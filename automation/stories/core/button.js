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
import HvButton from "@hv/uikit-react-core/dist/Button";
import CautionL from "@hv/uikit-react-icons/dist/Caution.L";
import CautionM from "@hv/uikit-react-icons/dist/Caution.M";
import CautionS from "@hv/uikit-react-icons/dist/Caution.S";
import QaGrid from "../custom/qaGrid";

const samples = {};
const myAlert = msg => alert(msg); /* eslint-disable-line no-alert */

// sample scenarios
samples["aspect primary choice"] = (
  <>
    <HvButton>default primary</HvButton>
    <HvButton colorType="secondary">secondary</HvButton>
    <HvButton colorType="link">link</HvButton>
    <HvButton disabled>disabled primary</HvButton>
    <HvButton disabled colorType="secondary">
      disabled secondary
    </HvButton>
    <HvButton disabled colorType="link">
      disabled link
    </HvButton>
  </>
);

samples["aspect hitachi red"] = (
  <>
    <HvButton>default primary</HvButton>
    <HvButton colorType="secondary">secondary</HvButton>
    <HvButton colorType="link">link</HvButton>
    <HvButton disabled>disabled primary</HvButton>
    <HvButton disabled colorType="secondary">
      disabled secondary
    </HvButton>
    <HvButton disabled colorType="link">
      disabled link
    </HvButton>
  </>
);

samples.functionality = (
  <>
    <HvButton onClick={() => myAlert("enable")}>enable</HvButton>
    <HvButton disabled onClick={() => myAlert("incorrect")}>
      disabled
    </HvButton>
  </>
);

samples["properties default"] = <HvButton>default values</HvButton>;

samples["properties all"] = (
  <HvButton
    className="all"
    id="all"
    type="button"
    colortype="primary"
    disabled
    classes=""
    onclick={() => myAlert("incorrect")}
  >
    all properties
  </HvButton>
);

samples["properties type"] = (
  <>
    <HvButton type="button">button</HvButton>
    <HvButton type="submit">submit</HvButton>
    <HvButton type="reset">reset</HvButton>
  </>
);

samples["properties children icon"] = (
  <>
    <HvButton onClick={() => myAlert("Large")}>
      <CautionL />
      large
    </HvButton>
    <HvButton onClick={() => myAlert("Medium")}>
      <CautionM />
      medium
    </HvButton>
    <HvButton onClick={() => myAlert("Small")}>
      <CautionS />
      small
    </HvButton>
  </>
);

samples.accessibility = <HvButton />;

samples.responsiveness = <HvButton />;

samples["negative required"] = <HvButton />;

samples["negative children"] = (
  <HvButton onClick={() => myAlert("Parental Button")}>
    <HvButton onClick={() => myAlert("Children Button")} colorType="secondary">
      button inside into other button
    </HvButton>
  </HvButton>
);

samples["negative colorType"] = (
  <HvButton colorType="negative">negative colortype</HvButton>
);

samples["negative type"] = <HvButton type="negative">negative type</HvButton>;

// create CoreButton for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreButton", module).add(key, () => (
    <QaGrid>{samples[key]}</QaGrid>
  ))
);

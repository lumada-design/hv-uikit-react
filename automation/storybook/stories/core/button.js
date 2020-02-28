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
import Grid from "@hv/uikit-react-core/dist/Grid";
import Caution from "@hv/uikit-react-icons/dist/Generic/Caution";

const samples = {};
const myAlert = msg => alert(msg); /* eslint-disable-line no-alert */

const CautionS = <Caution boxStyles={{ width: 32, height: 30 }} />;

// sample scenarios
samples.smoke = (
  <>
    <Grid container>
      <Grid item xl={2}>
        Enable
      </Grid>
      <Grid item xl={2}>
        <HvButton
          id="default"
          startIcon={CautionS}
          onClick={() => myAlert("default")}
        >
          default
        </HvButton>
      </Grid>
      <Grid item xl={2}>
        <HvButton
          id="secondary"
          category="secondary"
          startIcon={CautionS}
          onClick={() => myAlert("secondary")}
        >
          secondary
        </HvButton>
      </Grid>
      <Grid item xl={2}>
        <HvButton
          id="ghost"
          category="ghost"
          startIcon={CautionS}
          onClick={() => myAlert("ghost")}
        >
          ghost
        </HvButton>
      </Grid>
      <Grid item xl={2}>
        <HvButton
          id="ghostSecondary"
          category="ghostSecondary"
          startIcon={CautionS}
          onClick={() => myAlert("ghostSecondary")}
        >
          ghostSecondary
        </HvButton>
      </Grid>
      <Grid item xl={2}>
        <HvButton
          id="semantic"
          category="semantic"
          startIcon={CautionS}
          onClick={() => myAlert("semantic")}
        >
          semantic
        </HvButton>
      </Grid>
    </Grid>
    <Grid container>
      <Grid item xl={2}>
        Disable
      </Grid>
      <Grid item xl={2}>
        <HvButton
          id="disabledPrimary"
          disabled
          startIcon={CautionS}
          onClick={() => myAlert("disabled primary")}
        >
          disabled primary
        </HvButton>
      </Grid>
      <Grid item xl={2}>
        <HvButton
          id="disabledSecondary"
          disabled
          category="secondary"
          startIcon={CautionS}
          onClick={() => myAlert("disabled secondary")}
        >
          disabled secondary
        </HvButton>
      </Grid>
      <Grid item xl={2}>
        <HvButton
          id="disabledGhost"
          disabled
          category="ghost"
          startIcon={CautionS}
          onClick={() => myAlert("disabled ghost")}
        >
          disabled ghost
        </HvButton>
      </Grid>
      <Grid item xl={2}>
        <HvButton
          id="disabledGhostSecondary"
          disabled
          category="ghostSecondary"
          startIcon={CautionS}
          onClick={() => myAlert("disabled ghostSecondary")}
        >
          disabled ghostSecondary
        </HvButton>
      </Grid>
      <Grid item xl={2}>
        <HvButton
          id="disabledSemantic"
          disabled
          category="semantic"
          startIcon={CautionS}
          onClick={() => myAlert("semantic")}
        >
          disabled semantic
        </HvButton>
      </Grid>
    </Grid>

    <Grid container>
      <Grid item xl={2}>
        all properties
      </Grid>
      <Grid item xl>
        <HvButton
          className="all"
          id="allProperties"
          disabled
          classes=""
          startIcon={CautionS}
          onClick={() => myAlert("incorrect")}
        >
          all properties
        </HvButton>
      </Grid>
    </Grid>
  </>
);

samples.negative = (
  <>
    <Grid container>
      <Grid item xl={2}>
        icon
      </Grid>
      <Grid item xl={2}>
        <HvButton startIcon={CautionS} />
      </Grid>
      <Grid item xl={2}>
        <HvButton category="secondary">
          <Caution />
          between
          <Caution />
        </HvButton>
      </Grid>
      <Grid item xl={2}>
        <HvButton category="ghost">
          <Caution />
          <Caution />
          <Caution />
        </HvButton>
      </Grid>
    </Grid>
    <Grid container>
      <Grid item xl={2}>
        null / empty
      </Grid>
      <Grid item xl={2}>
        <HvButton onClick={() => myAlert("primary (default)")} />
      </Grid>
      <Grid item xl={2}>
        <HvButton category="secondary" onClick={() => myAlert("secondary")} />
      </Grid>
      <Grid item xl={2}>
        <HvButton category="ghost" onClick={() => myAlert("ghost")} />
      </Grid>
      <Grid item xl={2}>
        <HvButton
          category="ghostSecondary"
          onClick={() => myAlert("ghostSecondary")}
        />
      </Grid>
    </Grid>
  </>
);

// create CoreButton for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreButton", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

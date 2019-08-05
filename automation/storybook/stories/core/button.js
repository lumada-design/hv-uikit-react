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
import CautionS from "@hv/uikit-react-icons/dist/Caution.S";

const samples = {};
const myAlert = msg => alert(msg); /* eslint-disable-line no-alert */

// sample scenarios
samples.positive = (
  <>
    <Grid container>
      <Grid item xl={2}>
        {" "}
        Enable{" "}
      </Grid>
      <Grid item xl={2}>
        <HvButton id="default" onClick={() => myAlert("default")}>
          <CautionS />
          default
        </HvButton>
      </Grid>
      <Grid item xl={2}>
        <HvButton
          id="secondary"
          category="secondary"
          onClick={() => myAlert("secondary")}
        >
          <CautionS />
          secondary
        </HvButton>
      </Grid>
      <Grid item xl={2}>
        <HvButton id="ghost" category="ghost" onClick={() => myAlert("ghost")}>
          <CautionS />
          ghost
        </HvButton>
      </Grid>
      <Grid item xl={2}>
        <HvButton
          id="ghostSecondary"
          category="ghostSecondary"
          onClick={() => myAlert("ghostSecondary")}
        >
          <CautionS />
          ghostSecondary
        </HvButton>
      </Grid>
    </Grid>
    <Grid container>
      <Grid item xl={2}>
        {" "}
        Disable{" "}
      </Grid>
      <Grid item xl={2}>
        <HvButton
          id="disabledPrimary"
          disabled
          onClick={() => myAlert("disabled primary")}
        >
          <CautionS />
          disabled primary
        </HvButton>
      </Grid>
      <Grid item xl={2}>
        <HvButton
          id="disabledSecondary"
          disabled
          category="secondary"
          onClick={() => myAlert("disabled secondary")}
        >
          <CautionS />
          disabled secondary
        </HvButton>
      </Grid>
      <Grid item xl={2}>
        <HvButton
          id="disabledGhost"
          disabled
          category="ghost"
          onClick={() => myAlert("disabled ghost")}
        >
          <CautionS />
          disabled ghost
        </HvButton>
      </Grid>
      <Grid item xl={2}>
        <HvButton
          id="disabledGhostSecondary"
          disabled
          category="ghostSecondary"
          onClick={() => myAlert("disabled ghostSecondary")}
        >
          <CautionS />
          disabled ghostSecondary
        </HvButton>
      </Grid>
    </Grid>

    <Grid container>
      <Grid item xl={2}>
        {" "}
        all properties{" "}
      </Grid>
      <Grid item xl>
        <HvButton
          className="all"
          id="allProperties"
          disabled
          classes=""
          onclick={() => myAlert("incorrect")}
        >
          <CautionS />
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
        {" "}
        icon{" "}
      </Grid>
      <Grid item xl={2}>
        <HvButton>
          <CautionS />
        </HvButton>
      </Grid>
      <Grid item xl={2}>
        <HvButton category="secondary">
          <CautionS />
          between
          <CautionS />
        </HvButton>
      </Grid>
      <Grid item xl={2}>
        <HvButton category="ghost">
          <CautionS />
          <CautionS />
          <CautionS />
        </HvButton>
      </Grid>
    </Grid>
    <Grid container>
      <Grid item xl={2}>
        {" "}
        null / empty{" "}
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

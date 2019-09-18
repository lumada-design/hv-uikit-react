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
import MultiSelection from "../../../../packages/doc/samples/components/list/multiSelection";
import MultiSelectionWithSelectors from "../../../../packages/doc/samples/components/list/multiSelectionWithSelectors";
import MultiSelectionWithSelectorsAndSelectAll from "../../../../packages/doc/samples/components/list/multiSelectionWithSelectorsAndSelectAll";
import SimpleListCondensed from "../../../../packages/doc/samples/components/list/simpleListCondensed";
import SimpleListNotSelectable from "../../../../packages/doc/samples/components/list/simpleListNotSelectable";
import SimpleListWithNavIcons from "../../../../packages/doc/samples/components/list/simpleListWithNavIcons";
import SingleSelection from "../../../../packages/doc/samples/components/list/singleSelection";
import SingleSelectionWithLeftIcons from "../../../../packages/doc/samples/components/list/singleSelectionWithLeftIcons";
import SingleSelectionWithSelectors from "../../../../packages/doc/samples/components/list/singleSelectionWithSelectors";

// sample scenarios
const samples = {};

samples.MultiSelection = MultiSelection;
samples.MultiSelectionWithSelectors = MultiSelectionWithSelectors;
samples.MultiSelectionWithSelectorsAndSelectAll = MultiSelectionWithSelectorsAndSelectAll;
samples.SimpleListCondensed = SimpleListCondensed;
samples.SimpleListNotSelectable = SimpleListNotSelectable;
samples.SimpleListWithNavIcons = SimpleListWithNavIcons;
samples.SingleSelection = SingleSelection;
samples.SingleSelectionWithLeftIcons = SingleSelectionWithLeftIcons;
samples.SingleSelectionWithSelectors = SingleSelectionWithSelectors;


// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreList", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);
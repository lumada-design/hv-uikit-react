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
import TableCheckbox from "../../../../packages/doc/samples/components/table/tableCheckbox";
import TableEmpty from "../../../../packages/doc/samples/components/table/tableEmpty";
import TableExpander from "../../../../packages/doc/samples/components/table/tableExpander";
import TableNulls from "../../../../packages/doc/samples/components/table/tableNulls";
import TableScrollingExpander from "../../../../packages/doc/samples/components/table/tableScrollingExpander";
import TableSecondary from "../../../../packages/doc/samples/components/table/tableSecondary";
import TableSimple from "../../../../packages/doc/samples/components/table/tableSimple";
import TableTypical from "../../../../packages/doc/samples/components/table/tableTypical";

// sample scenarios
const samples = {};
samples.TableCheckbox = TableCheckbox;
samples.TableEmpty = TableEmpty;
samples.TableExpander = TableExpander;
samples.TableNulls = TableNulls;
samples.TableScrollingExpander = TableScrollingExpander;
samples.TableSecondary = TableSecondary;
samples.TableSimple = TableSimple;
samples.TableTypical = TableTypical;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreTable", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

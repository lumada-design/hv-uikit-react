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
import Card1 from "../../../../packages/doc/samples/components/card/card1";
import Card2 from "../../../../packages/doc/samples/components/card/card2";
import Card3 from "../../../../packages/doc/samples/components/card/card3";
import Card4 from "../../../../packages/doc/samples/components/card/card4";
import Card5 from "../../../../packages/doc/samples/components/card/card5";
import Card6 from "../../../../packages/doc/samples/components/card/card6";
import Card7 from "../../../../packages/doc/samples/components/card/card7";
import Card8 from "../../../../packages/doc/samples/components/card/card8";

// sample scenarios
const samples = {};
samples.Card1 = Card1;
samples.Card2 = Card2;
samples.Card3 = Card3;
samples.Card4 = Card4;
samples.Card5 = Card5;
samples.Card6 = Card6;
samples.Card7 = Card7;
samples.Card8 = Card8;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CoreCard", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

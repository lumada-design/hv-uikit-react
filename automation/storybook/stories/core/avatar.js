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

import AssortedAvatars from "../../../../packages/doc/samples/components/avatar/main";
import ImageAvatars from "../../../../packages/doc/samples/components/avatar/imageAvatars";
import LetterAvatars from "../../../../packages/doc/samples/components/avatar/letterAvatars";
import IconsAvatars from "../../../../packages/doc/samples/components/avatar/iconAvatars";
import Fallbacks from "../../../../packages/doc/samples/components/avatar/fallbacks";
import Buttons from "../../../../packages/doc/samples/components/avatar/buttons";
import Sizes from "../../../../packages/doc/samples/components/avatar/sizes";

// sample scenarios
const samples = {};
samples.AssortedAvatars = AssortedAvatars;
samples.ImageAvatars = ImageAvatars;
samples.LetterAvatars = LetterAvatars;
samples.IconsAvatars = IconsAvatars;
samples.Fallbacks = Fallbacks;
samples.Buttons = Buttons;
samples.Sizes = Sizes;

Object.keys(samples).forEach((key) =>
  storiesOf("CoreAvatar", module).add(key, () => (
    <Grid container>
      <Grid item xl>
        {samples[key]}
      </Grid>
    </Grid>
  ))
);

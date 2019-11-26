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

import { storiesOf } from "@storybook/react";
import Pagination1 from "../../../../packages/doc/samples/components/pagination/pagination1";
import Pagination2 from "../../../../packages/doc/samples/components/pagination/pagination2";
import Pagination3 from "../../../../packages/doc/samples/components/pagination/pagination3";

// sample scenarios
const samples = {};

samples.Pagination1 = Pagination1;
samples.Pagination2 = Pagination2;
samples.Pagination3 = Pagination3;

// create CoreTextArea for each sample
Object.keys(samples).forEach(key =>
  storiesOf("CorePagination", module).add(key, () => samples[key])
);

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

import {
  quarter,
  trace5,
  trace4,
  trace3,
  trace2,
  trace1
} from "../data/barChartData";

const t1 = {
  x: quarter,
  y: trace1,
  name: "Sales Target"
};

const t2 = {
  x: quarter,
  y: trace2,
  name: "Sales per Rep"
};

const t3 = {
  x: quarter,
  y: trace3,
  name: "Monthly Sales"
};

const t4 = {
  x: quarter,
  y: trace4,
  name: "Target"
};

const t5 = {
  x: quarter,
  y: trace5,
  name: "Cash"
};

const data = [t1, t2, t3, t4, t5];

export default data;

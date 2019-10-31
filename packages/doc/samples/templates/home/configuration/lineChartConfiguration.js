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

import { months, trace3, trace2, trace1 } from "../data/lineChartData";

const t1 = {
  x: months,
  y: trace1,
  name: "Target"
};

const t2 = {
  x: months,
  y: trace2,
  name: "Cash"
};

const t3 = {
  x: months,
  y: trace3,
  name: "Monthly Sales"
};

const data = [t1, t2, t3];

export default data;

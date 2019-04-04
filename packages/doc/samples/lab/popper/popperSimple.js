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
import Button from "@hv/uikit-react-core/Button";
import withPopper from "@hv/uikit-react-lab/Popper/withPopper";

const btn = props => (
  <Button variant="contained" {...props}>
    popper
  </Button>
);

const Result = withPopper(btn, {
  "Asset ID": 2678213,
  Location: "MKT08-Space Mountain",
  "Asset Type": "BS - Brake System"
});

export default <Result />;

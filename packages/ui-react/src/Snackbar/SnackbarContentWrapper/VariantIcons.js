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
  Level0Success16Color,
  Level3Alert16,
  Level416Color,
  Level5Unsuccess16Color
} from "@hv-ui/icons";
import React from "react";

const variantIcon = Object.freeze({
  success: <Level0Success16Color />,
  warning: <Level416Color />,
  error: <Level5Unsuccess16Color />,
  info: <Level3Alert16 />
});

export default variantIcon;

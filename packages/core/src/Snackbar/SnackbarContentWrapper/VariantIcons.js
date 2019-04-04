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

import Level0 from "@hv/uikit-react-icons/Level0.sema1.S";
import Level4 from "@hv/uikit-react-icons/Level4.sema5.S";
import Level5 from "@hv/uikit-react-icons/Level5.sema6.S";
import Level3 from "@hv/uikit-react-icons/Level3.sema4.S";
import React from "react";

const variantIcon = Object.freeze({
  success: <Level0 />,
  warning: <Level4 />,
  error: <Level5 />,
  info: <Level3 />
});

export default variantIcon;

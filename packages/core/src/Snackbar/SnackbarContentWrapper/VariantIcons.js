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
import Success from "@hv/uikit-react-icons/dist/Generic/Success";
import Error from "@hv/uikit-react-icons/dist/Generic/Fail";

const variantIcon = variant => {
  switch (variant) {
    case "success":
      return <Success iconSize="S" semantic="sema1" />;
    case "error":
      return <Error iconSize="S" semantic="sema4" />;
    default:
      return null;
  }
};

export default variantIcon;

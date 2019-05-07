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
import HvInput from "@hv/uikit-react-core/dist/Input";

const labels = {
  placeholder: "Must have at least 6 character",
  infoText: "Enter your password",
  inputLabel: "password",
  warningText: "wrong password",
  maxCharQuantityWarningText: "Your password has more than 12 characters",
  minCharQuantityWarningText: "Your password has less than 6 characters",
  requiredWarningText: "Your password is required"
};

export default (
  <HvInput
    labels={labels}
    validation={value => value === "password"}
    password
    isRequired
    maxCharQuantity={12}
    minCharQuantity={6}
  />
);

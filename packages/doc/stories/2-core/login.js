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
import HvLogin from "@hv/uikit-react-core/dist/Login";


storiesOf("Core", module).add("Login", () => <HvLogin />, {
  title: "Login",
  description:
    "Login form with the capability for recovery of lost credentials.",
  designSystemLink: "https://10.76.48.133/hv-design-system/hv-design-system-specs/tree/master",
  usage: "import { HvLogin } from '@hv/uikit-react-core/dist/Login'",
  examples: [
    {
      title: "Login with successful requests",
      src: "core/login/login1"
    },
    {
      title: "Login with successful requests",
      src: "core/login/login2"
    },
    {
      title: "Login without Forgot Your Credentials and Remember me",
      src: "core/login/login3"
    }
  ]
});
